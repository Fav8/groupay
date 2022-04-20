const groups = require('../models/groups')


async function createExpense(req, res) {
    try{
        const expense = await groups.createExpense(req.body.id, req.body.expense);
        res.send(expense);
    }
    catch(err){
        console.log(err);
        res.send('error');

    }
}
async function deleteExpense(req, res) {
    try{
        const expense = await groups.deleteExpense(req.body);
        res.send(expense);
    }
    catch(err){
        console.log(err);
        res.send('error');

    }
}

async function getExpenses(req, res) {
     try{
        const groupExpenses = await groups.getExpenses(req.body.groupId);
        res.send(groupExpenses);
    }
    catch(err){
        console.log(err);
        res.send('error');
    } 
}
async function createGroup(req, res) {
    try{
        const group = await groups.createGroup(req.body);
        res.send(group);
    }
    catch(err){
        console.log(err);
        res.send('501');
    }
}

module.exports = {createExpense, getExpenses, deleteExpense, createGroup}