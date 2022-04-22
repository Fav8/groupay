const groups = require("../models/groups");
const users = require("../models/users");
const ADLER32 = require("adler-32");

async function createExpense(req, res) {
  try {
    const user = await users.findUser(req.body.uid);
    for (let userGroup of user.groups) {
      if (userGroup._id === req.body.group) {
        const expense = req.body.expense;
        expense.payer = req.body.uid;
        expense.payerName = user.name;
        const Newexpense = await groups.createExpense(
          req.body.group,
          expense
        );
        res.send(Newexpense);
        return;
      }
    }
    res.status(400);
    res.send("not found");
    console.log("group not in user");
  } catch (err) {
    console.log(err);
    res.send("error");
  }
}
async function deleteExpense(req, res) {
  try {
    const expense = await groups.deleteExpense(req.body);
    res.send(expense);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
}

async function getExpenses(req, res) {
  try {
    const user = await users.findUser(req.headers.uid);
    for (let group of user.groups) {
      if (group._id === req.headers.groupid) {
        const groupExpenses = await groups.getExpenses(req.headers.groupid);
        res.send(groupExpenses);
        return;
      }
    }
    res.send("group not found in user");
  } catch (err) {
    console.log(err);
    res.send("error");
  }
}
async function createGroup(req, res) {
  try {
    const newGroup = {
      groupName: req.body.groupName,
      users: [req.body.uid],
      expenses: [],
      password: ADLER32.str(Date.now().toString()),
    };
    const group = await groups.createGroup(newGroup);
    if (group) {
      console.log(group);
      await users.addGroup(req.body.uid, {
        _id: group._id,
        groupName: group.groupName,
        password: group.password,
      });
      res.send(group);
    }
  } catch (err) {
    console.log(err);
    res.send("501");
  }
}

module.exports = { createExpense, getExpenses, deleteExpense, createGroup };
