import React, { useEffect, useState } from "react";
import { Button, Navbar, Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiServices from "../services/apiService";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import groupSvg from "../img/people-fill.svg"
import logo from "../img/token_4.png"

export default function Dashboard() {
  const groupList = [];
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
    navigate(`/group/${group.groupName}`, { state: { group: group } });
  }

  useEffect(() => {
    //refactor to use async await
    if (token) {
      apiServices.getGroups(token, currentUser.uid).then((items) => {
        let newGroupList = [...groupList, ...items];
        let groups = newGroupList.map((group, i) => (
          <>
            <Card
              className="text-white bg-dark m-5 shadow"
              style={{ maxWidth: "18rem", width: "100%", minWidth: "15rem"}}
            >
              <Card.Header className="d-flex align-items-center">
                <img className="" src={groupSvg}></img>
                <p className="mb-0 ml-3" style={{marginLeft: "5px"}}>{Math.floor(Math.random() * (5 - 2 + 1) + 2)}</p> {/* //mock data */}
                </Card.Header>
              <Card.Body>
                <Card.Title className="mb-3">{group.groupName}</Card.Title>
                <Button onClick={() => handleGroupClick(group)} key={i}>
                  Go to group
                </Button>
              </Card.Body>
            </Card>
          </>
        ));
        setgroupButtons(groups);
      });
    }
  }, [token]);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="Yo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Groupay
          </Navbar.Brand>
          <Button className="m-3" onClick={handleLogOut}>
            Log Out
          </Button>
        </Container>
      </Navbar>
      <h1 className="text-center m-3">Your Groupay Groups:</h1>
      <Container className="border mt-4 shadow">
      <Container className="d-flex align-items-center justify-content-around flex-wrap">
      {groupButtons}
      </Container>
      </Container>
      <Container className="d-flex align-items-center justify-content-around mt-4 mb-3">
        <CreateGroup ></CreateGroup>
        <JoinGroup></JoinGroup>
      </Container>
    </div>
  );
}
