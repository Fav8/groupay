const mongoose = require('mongoose')
const GroupSchema = new mongoose.Schema({
  groupName: String,
  users: [String],
  password: String, //this is cool btw
  expenses: [{
    title: {
      type: String,
      required: true
    },
    /* pictureUrl: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: true
    }, */ //touncomment in production
  }]

}, {timestamps: false})

const UsersSchema = new mongoose.Schema({
    uid: {
      type: String,
      required: true
    },
    groups: [{ 
      groupName: String,
      _id: String,
      password: String
    }],
  },{timestamps: false});
  

let Groups =  mongoose.model('groups', GroupSchema);
let Users =  mongoose.model('users', UsersSchema);

module.exports = {Groups, Users}