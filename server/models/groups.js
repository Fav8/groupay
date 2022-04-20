const {Groups} = require('./index')

async function getExpenses(id){
  const gotGroup = await Groups.find({_id : id});
  return gotGroup.expenses;
}

async function createExpense(id, expense){
  return await Groups.updateOne(
    { _id: id }, 
    { $push: { expenses: expense } },
    done
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
  



module.exports = {getExpenses, createExpense, deleteExpense, createGroup}