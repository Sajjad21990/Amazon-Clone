import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Checkout/Checkout";
import Payment from "./Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Orders from "./Orders/Orders";

const promise = loadStripe(
  "pk_test_51HdqGmIldQmbRXg44x43qF4NMuMwj79MUQpaZCpZY8ccN6wzaLP81ZUSpI3sEMzFzde7TPl9W0nUtkqe8YHJArzA00YGmPEayX"
);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>
        <Route path="/payment">
          <Header />
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
        <Route path="/orders">
          <Header />
          <Orders />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
