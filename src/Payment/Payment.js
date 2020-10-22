import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import React from "react";
import { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider/StateProvider";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Steps, Button, Input } from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./Payment.css";
import firebase from "firebase";
import CustomButton from "../CustomButton";

const { Step } = Steps;

const Payment = () => {
  const [{ cart, user, userDetails, cartTotal }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  //delivery states

  const [name, setName] = useState(userDetails.name);
  const [address, setAddress] = useState(userDetails.address);
  const [city, setCity] = useState(userDetails.city);
  const [state, setState] = useState(userDetails.state);
  const [pincode, setPincode] = useState(userDetails.pincode);
  const [phone, setPhone] = useState(userDetails.phone);

  //payment states
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (user) next();
    else history.push("/login");
  }, []);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post(
        "https://amazon-clone-backend-api.herokuapp.com/payments/create",
        {
          totalAmt: cartTotal,
        }
      );
      // console.log(response);
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [cart]);

  // console.log("the secret is >>>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //payment confirmation
        // console.log(
        //   paymentIntent.amount,
        //   paymentIntent.created,
        //   paymentIntent.id,
        //   paymentIntent.last_payment_error,
        //   paymentIntent.payment_method_types,
        //   paymentIntent.status
        // );
        if (paymentIntent.last_payment_error) {
          setSucceeded(false);
          setError(paymentIntent.cancellation_reason);
        }

        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            order: cart,
            amount: paymentIntent.amount,
            orderedOn: paymentIntent.created,
            orderId: paymentIntent.id,
            anyError: paymentIntent.last_payment_error,
            paymentMethod: paymentIntent.payment_method_types,
            succeeded: paymentIntent.status,
          });

        dispatch({
          type: "UPDATE_USER_DATA",
          item: {
            name: name,
            address: address,
            city: city,
            state: state,
            pincode: pincode,
            phone: phone,
          },
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        history.replace("/orders");
      })
      .catch((err) => console.log(err));
  };

  const handleCardChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const delivery = (
    <div className="payment-container">
      <h1>Add Your Address</h1>
      <form>
        <Input
          size="large"
          placeholder="Full Name"
          prefix={<UserOutlined />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <Input
          size="large"
          placeholder="Address"
          prefix={<HomeOutlined />}
          required
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <br />
        <Input
          size="large"
          placeholder="City"
          prefix={<EnvironmentOutlined />}
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <Input
          size="large"
          placeholder="State / Province / Region"
          prefix={<HomeOutlined />}
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <br />
        <Input
          size="large"
          placeholder="Pincode"
          prefix={<EnvironmentOutlined />}
          type="number"
          required
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <br />
        <Input
          size="large"
          placeholder="Phone number"
          prefix={<PhoneOutlined />}
          type="number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </form>
    </div>
  );

  const paymentContent = (
    <div className="payment-section">
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleCardChange} />
      </form>
      <span style={{ fontSize: "0.6rem" }}>
        * pls enter card number as 4242 4242...
      </span>
      {error && <div>{error}</div>}
      <h2>
        Total Price: <small>₹ </small>
        {cartTotal}
      </h2>
    </div>
  );

  const steps = [
    {
      title: "SIGN IN",
      content: "You're Already Signed In !!!",
    },
    {
      title: "DELIVERY ADDRESS",
      content: delivery,
    },
    {
      title: "COMPLETE PAYMENT",
      content: paymentContent,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        padding: "20px",
      }}
    >
      <center>
        <h1 style={{ margin: "5vh 0" }}>Payment</h1>
      </center>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>

      <div className="steps-action">
        {current < steps.length - 1 && (
          <div style={{ width: "10vw", textAlign: "center", margin: "10px" }}>
            <CustomButton handleClick={next} title="Next" />
          </div>
        )}
        {current === steps.length - 1 && (
          <Button
            disabled={processing || disabled || succeeded}
            onClick={handleSubmit}
          >
            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
          </Button>
        )}
        {current > 0 && (
          <div style={{ width: "10vw", textAlign: "center", margin: "10px" }}>
            <CustomButton handleClick={prev} title="Previous" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
