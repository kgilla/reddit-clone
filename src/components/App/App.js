import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import Navbar from "../Navbar";
import Home from "../Home";
import Sub from "../Sub";
import Modal from "../Modal";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (type) => {
    setModalType(type);
    setOpenModal(true);
  };

  const handleRemoveModal = () => {
    console.log("hi");
    setOpenModal(false);
    setModalType(null);
  };

  return (
    <div className="App">
      {openModal ? (
        <Modal type={modalType} removeModal={handleRemoveModal} />
      ) : null}
      <Router>
        <Navbar openModal={handleOpenModal} />
        <Switch>
          <Route path="/s/:name">
            <Sub />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
