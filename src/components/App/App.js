import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "../Navbar";
import Main from "../Main";
import Login from "../Login";
import Signup from "../Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/s/:name">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
