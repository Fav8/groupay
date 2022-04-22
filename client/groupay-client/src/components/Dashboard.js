import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiServices from "../services/apiService";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup"

export default function Dashboard() {
  const groupList=[];
  const [groupButtons, setgroupButtons] = useState();
  const { currentUser, logout, token } = useAuth();
  const navigate = useNavigate();
  async function handleLogOut() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGroupClick(group) {
    navigate(`/group/${group.groupName}`, { state: { group: group } })
  }

  useEffect(() => { //refactor to use async await
    if (token) {
      apiServices.getGroups(token, currentUser.uid).then((items) => {
        let newGroupList = [...groupList, ...items]
        let groups = newGroupList.map((group, i) => <Button onClick={() =>handleGroupClick(group)} className="m-5" key={i}>{group.groupName}</Button>);
        setgroupButtons(groups)
      });
    }
  }, [token]);



  return (
    <div>
      { groupButtons}
      <Button className="m-5" onClick={handleLogOut}>
        Log Out
      </Button>
      <CreateGroup></CreateGroup>
      <JoinGroup></JoinGroup>
    </div>
  );
}
