import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import apiServices from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import CreateExpense from "./CreateExpense";

export default function GroupPage() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [totals, setTotals] = useState({});
  const [owes, setOwes] = useState([]);
  const [userstotal, setuserstotal] = useState([]);
  const [groupWithUsers, setgroupWithUsers] = useState({});
  const { currentUser, token } = useAuth();
  const { state } = useLocation();
  const group = state.group;
  const params = useParams();

  function splitPayments(payments) {
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);
  
    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;
  
    const sortedPeople = people.sort((personA, personB) => payments[personA] - payments[personB]);
    const sortedValuesPaid = sortedPeople.map((person) => payments[person] - mean);
  
    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    let owesArr = []
    while (i < j) {
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;
      
      owesArr.push(`${sortedPeople[i]} owes ${sortedPeople[j]} €${debt.toFixed(2)}`);
  
      if (sortedValuesPaid[i] === 0) {
        i++;
      }
  
      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
    setOwes(owesArr)
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
      let userTotalsArr = [];
      for (let user in newTotals) {
        userTotalsArr.push(user !== 'you' ? `${user} has spent €${newTotals[user]} and must receive €${newTotals[user]/ groupWithUsers.users.length * (groupWithUsers.users.length - 1) }`: `you spent €${newTotals[user]}`);
      }
      setuserstotal(userTotalsArr);
      setTotals(newTotals);
      setTotal(newTotal);
      splitPayments(newTotals)
    }
  }, [expenses, groupWithUsers]);

  return (
    <>
      <div>Group Page of {params.groupName}</div>
      {expenses.length > 0 &&
        expenses.map((expense, i) => (
          <h2 key={i}>
            {expense.title}: € {expense.value} paid by:{" "}
            {expense.payerName || "You"}
          </h2>
        ))}
      {<p>Total Spent: €{total}</p>}
      {owes.length > 0 &&
        owes.map((owe, i) => <h3 key={i}>{owe}</h3>)}
      Invite your friends with this Groupin: {group.password}
      <CreateExpense group={group} setExpenses={setExpenses}></CreateExpense>
    </>
  );
}
