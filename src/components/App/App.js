import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { ProvideAuth } from "../../hooks/use-auth";

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
import Flash from "../Flash";
import PrivateRoute from "../PrivateRoute";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [message, setMessage] = useState("Hey there fuck face!");

  const handleOpenModal = (type) => {
    setModalType(type);
    setOpenModal(true);
  };

  const handleRemoveModal = () => {
    setOpenModal(false);
    setModalType(null);
  };

  return (
    <div className="App">
      <ProvideAuth>
        {message ? <Flash message={message} /> : null}
        {openModal ? (
          <Modal type={modalType} removeModal={handleRemoveModal} />
        ) : null}
        <Router>
          <Navbar openModal={handleOpenModal} />
          <main id="main-container">
            <Switch>
              <Route path="/users/:name">
                <UserProfile />
              </Route>
              <Route path="/s/:subID/posts/:postID">
                <PostContainer />
              </Route>
              <PrivateRoute path="/s/:subID/submit">
                <PostForm />
              </PrivateRoute>
              <PrivateRoute path="/s/create">
                <SubForm />
              </PrivateRoute>
              <Route path="/s/browse">
                <SubIndex />
              </Route>
              <Route path="/s/:subID">
                <Sub />
              </Route>
              <PrivateRoute path="/submit">
                <PostForm />
              </PrivateRoute>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/signup">
                <SignupForm />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
