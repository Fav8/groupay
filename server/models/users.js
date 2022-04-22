const {Users} = require('./index')


async function createUser(uid, name){
  try{
    const newUser = new Users({uid: uid, name: name, groups: []});
    console.log(newUser);
    await newUser.save();
    return newUser
  }
  catch(err){
    console.log(err);
  }
}

async function getGroups(uid){
    const user = await Users.find({uid: uid})
    console.log(user[0].groups);
    return user[0].groups;
  }

  async function addGroup(uid, group){
    return await Users.updateOne(
      { uid: uid }, 
      { $push: { groups: group}
    }
  );
  }

async function findUser(uid){
  return await Users.findOne({uid: uid})
}



module.exports = {createUser, getGroups, findUser, addGroup}