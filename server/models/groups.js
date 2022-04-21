const {Groups} = require('./index')

async function getExpenses(id){
  const gotGroup = await Groups.find({_id : id});
  return gotGroup[0].expenses;
}

async function getGroup(password){
  const gotGroup = await Groups.find({password :password});
  return gotGroup[0];
}

async function addUser(id, user){
  return await Groups.updateOne(
    { _id: id }, 
    { $push: { users: user } }
);
}

async function createExpense(id, expense){
  return await Groups.updateOne(
    { _id: id }, 
    { $push: { expenses: expense } }
);
}

async function deleteExpense(id, expense){
  return await Groups.updateOne(
    { _id: id }, 
    { $pull: { expenses: expense } },
    done
);
  }

  async function createGroup(group){
    try {
      return await Groups.create(group);
    } catch (error) {
      console.log(error);
      return 'error'
    }
  }
  



module.exports = {addUser, getExpenses, createExpense, deleteExpense, createGroup, getGroup}