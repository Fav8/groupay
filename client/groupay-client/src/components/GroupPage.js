import React from "react";
import { useParams } from "react-router-dom";
import apiServices from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";

export default function GroupPage() {
  const { currentUser, token } = useAuth();

  const params = useParams();
  async function createExpense() {
    try {
      const newExpense = await apiServices.createNewExpense(
        token,
        currentUser.uid,
        "6260fcdf2da53fb006939444",
        "testExpense"
      );
      console.log(newExpense);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>GroupPage of {params.groupName}</div>
      <Button className="m-5" onClick={createExpense}>
        Create Test Expense
      </Button>
    </>
  );
}
