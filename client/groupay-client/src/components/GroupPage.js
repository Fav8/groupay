import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import apiServices from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import {
  Form,
  Button,
  Card,
  Navbar,
  Container,
  ListGroup,
} from "react-bootstrap";
import logo from "../img/token_4.png";

import CreateExpense from "./CreateExpense";

export default function GroupPage() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [totals, setTotals] = useState({});
  const [owes, setOwes] = useState([]);
  const [groupWithUsers, setgroupWithUsers] = useState({});
  const { currentUser, token, logout } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const group = state.group;
  const params = useParams();
  async function handleLogOut() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  function splitPayments(payments) {
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);

    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;

    const sortedPeople = people.sort(
      (personA, personB) => payments[personA] - payments[personB]
    );
    const sortedValuesPaid = sortedPeople.map(
      (person) => payments[person] - mean
    );

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    let owesArr = [];
    while (i < j) {
      debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;

      owesArr.push(
        `${sortedPeople[i]} owes ${sortedPeople[j]} €${debt.toFixed(2)}`
      );

      if (sortedValuesPaid[i] === 0) {
        i++;
      }

      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
    setOwes(owesArr);
  }

  useEffect(() => {
    try {
      apiServices
        .getExpenses(token, currentUser.uid, group._id)
        .then((newExpenses) => {
          setExpenses([...newExpenses]);
        });
      apiServices
        .getGroup(token, currentUser, group.password)
        .then((newGroup) => setgroupWithUsers(newGroup));
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (expenses.length > 0 && groupWithUsers.users.length > 0) {
      let newTotal = 0;
      let othersExpenses = 0;
      let newTotals = {};
      for (let expense of expenses) {
        newTotal += expense.value;
        if (newTotals[expense.payerName])
          newTotals[expense.payerName] += expense.value;
        else newTotals[expense.payerName] = expense.value;
        if (expense.payer !== currentUser.uid) {
          othersExpenses += expense.value;
        }
      }
      setTotals(newTotals);
      setTotal(newTotal);
      splitPayments(newTotals);
    }
  }, [expenses, groupWithUsers]);

  function copyToClipBoard(){
    navigator.clipboard.writeText(group.password)
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="Yo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Groupay
          </Navbar.Brand>
          <h1 className="text-white">{params.groupName}</h1>
          <Button className="m-3" onClick={handleLogOut}>
            Log Out
          </Button>
        </Container>
      </Navbar>
      <div className="d-flex">
        <Container className="m-5" style={{ maxWidth: "18rem" }}>
          <CreateExpense
            group={group}
            setExpenses={setExpenses}
          ></CreateExpense>
        </Container>
        <Container
          className="m-5 border p-0 shadow"
          style={{
            Width: "100%",
            minWidth: "35rem",
            maxHeight: "550px",
            overflow: "scroll s",
          }}
        >
          {
            <h2 className="text-white bg-dark p-3 mb-0">
              Total Spent: €{total.toFixed(2)}
            </h2>
          }
          <ListGroup className="shadow-sm">
            {expenses.length > 0 &&
              expenses.map((expense, i) => (
                <ListGroup.Item
                  key={i}
                  className="m-0 d-flex justify-content-between align-items-center"
                >
                  <div className="p-2">
                    <h3>{expense.tag[0]} {expense.title}</h3>
                    <p className="mb-0 text-muted">
                      Paid by: {expense.payerName}
                    </p>
                  </div>
                  <h3 className="border rounded p-3 bg-dark text-white">
                    €{expense.value}
                  </h3>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Container>
        <Container className="m-5 border shadow p-0" style={{ maxWidth: "18rem" }}>
          <ListGroup className="shadow-sm">
            {owes.length > 0 &&
              owes.map((owe, i) => (
                <ListGroup.Item key={i}>
                  <h3 className="m-0" key={i}>{owe}</h3>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Container>
      </div>
      <Container className="d-flex justify-content-center align-items-center border shadow" style={{width: 'max-content', maxWidth: '100%', paddingRight: '0'}}>  
      <h4 className="mb-0" style={{ marginRight: "5px"}}>
        Invite your friends with this Groupin: {group.password} 
      </h4>
      <Button onClick={copyToClipBoard}>Copy</Button>
      </Container>
    </>
  );
}
