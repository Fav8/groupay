const mongoose = require('mongoose')
const GroupSchema = new mongoose.Schema({
  groupName: String,
  users: [String],
  expenses: [{
    title: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    pictureUrl: {
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
    },
  }]

}, {timestamps: false})

const UsersSchema = new mongoose.Schema({
    uid: {
      type: String,
      required: true
    },
    groups: {
      type: [String],
      required: true
    },
  },{timestamps: false});
  

let Groups =  mongoose.model('groups', GroupSchema);
let Users =  mongoose.model('users', UsersSchema);

module.exports = {Groups, Users}