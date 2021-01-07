import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ProvideAuth } from "../../hooks/use-auth";
import { ProvideFlash } from "../../hooks/use-flash-message";

import Navbar from "../Navbar";
import Home from "../Home";
import Sub from "../Sub";
import PostForm from "../PostForm";
import SubForm from "../SubForm";
import PostDetails from "../PostDetails";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";
import SubIndex from "../SubIndex";
import Flash from "../Flash";
import PrivateRoute from "../PrivateRoute";

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <ProvideFlash>
          <Flash />
          <Router>
            <Navbar />
            <main id="main-container">
              <Switch>
                <Route path="/users/:username">
                  <UserProfile />
                </Route>
                <PrivateRoute path="/s/:subID/update">
                  <SubForm edit={true} />
                </PrivateRoute>
                <PrivateRoute path="/s/:subID/posts/:postID/update">
                  <PostForm edit={true} />
                </PrivateRoute>
                <Route path="/s/:subID/posts/:postID">
                  <PostDetails />
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
                <PrivateRoute path="/home">
                  <Home />
                </PrivateRoute>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
          </Router>
        </ProvideFlash>
      </ProvideAuth>
    </div>
  );
}

export default App;
