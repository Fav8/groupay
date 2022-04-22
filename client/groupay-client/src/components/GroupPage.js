import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import apiServices from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import CreateExpense from "./CreateExpense";

export default function GroupPage() {
  const [expenses, setExpenses] = useState([])
  const { currentUser, token } = useAuth();
  const {state} = useLocation();
  const group = state.group;
  const params = useParams();

   useEffect(() => {
    try {
      apiServices.getExpenses(
        token,
        currentUser.uid,
        group._id,
      ).then(newExpenses => {
        setExpenses(old => [...newExpenses]); 
      })
    } catch (error) { 
      console.log(error);
    }
  }, [])  
  
  return (
    <>
      <div>Group Page of {params.groupName}</div>
      {expenses.length > 0 && expenses.map((expense, i) => <h2 key={i}>{expense.title}: € {expense.value} Payed by: {expense.payerName || 'You'}</h2>)}
      Invite your friends with this passowrd: {group.password}
      <CreateExpense group={group} setExpenses={setExpenses}></CreateExpense>
    </>
  );
}
