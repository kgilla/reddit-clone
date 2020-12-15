import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import Navbar from "../Navbar";
import Home from "../Home";
import Sub from "../Sub";
import Modal from "../Modal";
import PostForm from "../PostForm";
import SubForm from "../SubForm";
import PostContainer from "../PostContainer";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";
import SubIndex from "../SubIndex";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
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
    localStorage.setItem("user", JSON.stringify(user.user));
    localStorage.setItem("token", JSON.stringify(user.token));
    setUser(user.user);
    setToken(user.token);
  };

  const updateUser = (newUser) => {
    console.log(newUser);
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
        <Navbar
          openModal={handleOpenModal}
          user={user}
          token={token}
          logout={handleLogout}
        />
        <main id="main-container">
          {" "}
          <Switch>
            <Route path="/users/:name">
              <UserProfile user={user} token={token} />
            </Route>
            <Route path="/s/:subID/posts/:postID">
              <PostContainer user={user} token={token} />
            </Route>
            <Route path="/s/:subID/submit">
              <PostForm user={user} token={token} />
            </Route>
            <Route path="/s/browse">
              <SubIndex user={user} token={token} />
            </Route>
            <Route path="/s/:subID">
              <Sub user={user} updateUser={updateUser} token={token} />
            </Route>
            <Route path="/submit">
              <PostForm user={user} token={token} />
            </Route>
            <Route path="s/create">
              <SubForm user={user} token={token} />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupForm />
            </Route>
            <Route path="/">
              <Home user={user} token={token} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
