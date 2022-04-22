const users = require("../models/users");
const groupsModel = require("../models/groups");
async function createUser(req, res) {
  try {
    const user = await users.createUser(req.body.uid, req.body.name);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
}
async function getGroups(req, res) {
  try {
    const groups = await users.getGroups(req.headers.uid);
    res.send(groups);
  } catch (err) {
    console.log(err);
    res.send("400");
  }
}
async function joinGroup(req, res) {
  try {
    let group = await groupsModel.getGroup(req.body.password);
    if (group) {
      if (group.users.includes(req.body.uid)) {
        res.status(401);
        res.send("already in group");
      } else {
        await groupsModel.addUser(group._id, req.body.uid);
        await users.addGroup(req.body.uid, {
          _id: group._id,
          groupName: group.groupName,
          password: group.password,
        });
        res.send(group);
        return;
      }
    } else {
      res.status(400);
      res.send("can't find group");
    }
  } catch (err) {
    console.log(err);
    res.send("400");
  }
}

module.exports = { createUser, getGroups, joinGroup };
