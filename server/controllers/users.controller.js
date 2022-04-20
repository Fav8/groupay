const users = require('../models/users')
async function createUser(req, res) {
    let uid = req.body.uid;
    alreadyRegistered = await users.findUser(uid);
    if(alreadyRegistered) {
        res.send('Already Registered');
        return;
    }
    try{
        const user = await users.createUser(req.body);
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
}
async function getGroups(req, res) {
    try{
        const groups = await users.getGroups(req.body);
        res.send(groups);
    }
    catch(err){
        console.log(err);
        res.send('400')
    }
}


module.exports = {createUser, getGroups}