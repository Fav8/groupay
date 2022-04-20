const {Users} = require('./index')


async function createUser(user){
  return await Users.create(user)
}

async function getGroups(id){
    const user = await Users.find({_id: id})
    return user.groups;
  }

async function findUser(email){
  return await Users.findOne({email: email})
}



module.exports = {createUser, getGroups, findUser}