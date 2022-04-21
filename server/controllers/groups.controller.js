const groups = require("../models/groups");
const users = require("../models/users");
const ADLER32 = require('adler-32'); 

async function createExpense(req, res) {
  try {
    const user = await users.findUser(req.body.uid);
    if (user.groups.includes(req.body.group)) {
        const expense = {
            users: [req.body.uid],
            title: req.body.expense
        }
      const Newexpense = await groups.createExpense(
        req.body.group,
        expense,
        req.body.uid
      ); //to fix in production adding all of the data of the expense
      res.send(Newexpense);
    }
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
    for(let group of user.groups){
      if (group._id === req.headers.groupid) {
          const groupExpenses = await groups.getExpenses(req.headers.groupid);
          res.send(groupExpenses);
          return;
          }
    }
    res.send('group not found in user')
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
      password: ADLER32.str(Date.now().toString())
    };
    const group = await groups.createGroup(newGroup);
    if (group) {
      console.log(group);
      await users.addGroup(req.body.uid, {_id: group._id, groupName: group.groupName, password: group.password});
      res.send(group);
    }
  } catch (err) {
    console.log(err);
    res.send("501");
  }
}

module.exports = { createExpense, getExpenses, deleteExpense, createGroup };
