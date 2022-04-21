import axios from "axios";
const url = "http://localhost:3001/";
const apiServices = {
  register: async function(authId, userId) {
    const body = { uid: userId };
    const headers = { headers: { Authorization: "Bearer " + authId } };
    const registered = await axios.post(url + "register", body, headers);
    return registered;
  },
  createNewGroup: async function (authId, userId, groupName) {
    const body = { uid: userId, groupName: groupName };
    const headers = { headers: { Authorization: "Bearer " + authId } };
    const createdGroup = await axios.post(url + "groups", body, headers);
    return createdGroup;
  },
  createNewExpense: async function (authId, userId, group, expenseName) { //TOBECHANGED with a full expense
    const body = { uid: userId, group: group, expense: expenseName };
    const headers = { headers: { Authorization: "Bearer " + authId } };
    const createdExpense = await axios.post(url + "expenses", body, headers);
    return createdExpense;
  },
  getGroups: async function (authId, userId,) { 
    const headers = { headers: { Authorization: "Bearer " + authId, uid: userId } };
    const groups = await axios.get(url + "groups", headers);
    console.log(groups.data);
    return groups.data;
  },
  getExpenses: async function (authId, userId, groupId) { 
    const headers = { headers: { Authorization: "Bearer " + authId, uid: userId, groupId: groupId } };
    const groups = await axios.get(url + "expenses", headers);
    console.log(groups);
    return groups.data;
  },
  joinGroup: async function (authId, userId, password) { //TOBECHANGED with a full expense
    const body = { uid: userId, password: password};
    const headers = { headers: { Authorization: "Bearer " + authId } };
    const joinedGroup = await axios.put(url + "join", body, headers);
    return joinedGroup;
  },
}

export default apiServices