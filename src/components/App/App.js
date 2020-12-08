import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import Navbar from "../Navbar";
import Home from "../Home";
import Sub from "../Sub";
import Modal from "../Modal";
import CreatePost from "../CreatePost";
import CreateSub from "../CreateSub";
import Post from "../Post";
import Signup from "../Modal/Signup";
import Login from "../Modal/Login"

function App() {
  const [user, SetUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
    setOpenModal(true);
  };

  const handleRemoveModal = () => {
    setOpenModal(false);
    setModalType(null);
  };

  const storeUser = (user) => {
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    SetUser(user);
  };

  const handleLogout = () => {
    SetUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="App">
      {openModal ? (
        <Modal
          type={modalType}
          removeModal={handleRemoveModal}
          storeUser={storeUser}
        />
      ) : null}
      <Router>
        <Navbar openModal={handleOpenModal} user={user} logout={handleLogout} />
        <main id="main-container">
          {" "}
          <Switch>
            <Route path="/s/:subID/posts/:postID">
              <Post user={user} />
            </Route>
            <Route path="/s/:subID/submit">
              <CreatePost user={user} />
            </Route>
            <Route path="/s/:subID">
              <Sub />
            </Route>

            <Route path="/submit">
              <CreatePost user={user} />
            </Route>
            <Route path="/newSub">
              <CreateSub user={user} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/s:name/posts/:id">
              <Post />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
