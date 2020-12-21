import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { ProvideAuth } from "../../hooks/use-auth";

import Navbar from "../Navbar";
import Home from "../Home";
import Sub from "../Sub";
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
  const [message, setMessage] = useState(null);

  const changeMessage = (newMessage) => {
    setMessage(newMessage);
  };

  return (
    <div className="App">
      <ProvideAuth>
        {message ? <Flash message={message} /> : null}
        <Router>
          <Navbar />
          <main id="main-container">
            <Switch>
              <Route path="/users/:username">
                <UserProfile />
              </Route>
              <PrivateRoute path="/s/:subID/posts/:postID/update">
                <PostForm edit={true} changeMessage={changeMessage} />
              </PrivateRoute>
              <Route path="/s/:subID/posts/:postID">
                <PostContainer changeMessage={changeMessage} />
              </Route>
              <PrivateRoute path="/s/:subID/submit">
                <PostForm />
              </PrivateRoute>
              <PrivateRoute path="/s/create">
                <SubForm changeMessage={changeMessage} />
              </PrivateRoute>
              <Route path="/s/browse">
                <SubIndex />
              </Route>
              <Route path="/s/:subID">
                <Sub />
              </Route>
              <PrivateRoute path="/submit">
                <PostForm changeMessage={changeMessage} />
              </PrivateRoute>
              <Route path="/login">
                <LoginForm changeMessage={changeMessage} />
              </Route>
              <Route path="/signup">
                <SignupForm changeMessage={changeMessage} />
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
