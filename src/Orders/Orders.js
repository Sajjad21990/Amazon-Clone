import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import "./Orders.css";
import { useStateValue } from "../StateProvider/StateProvider";
import Order from "./Order";

const Orders = () => {
  const [{ user, userDetails }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          userDetails: userDetails,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("orderedOn", "desc")
        .onSnapshot((snapShot) =>
          setOrders(
            snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    } else {
      history.push("/login");
    }
  }, [user]);

  return orders.length > 0 ? (
    <div>
      <center>Your Orders</center>
      {orders.map((_order) => (
        <Order data={_order} />
      ))}
    </div>
  ) : null;
};

export default Orders;
