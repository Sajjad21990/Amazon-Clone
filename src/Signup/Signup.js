import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import firebase from "firebase";
import { useStateValue } from "../StateProvider/StateProvider";
import { useHistory } from "react-router-dom";
import db from "../Firebase/Firebase";
import "./Signup.css";
import CustomButton from "../CustomButton";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [{}, dispatch] = useStateValue();

  const history = useHistory();

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        db.collection("users")
          .doc(res.user.uid)
          .set({ name, email })
          .then(() => {
            dispatch({
              type: "UPDATE_USER",
              item: {
                uid: res.user.uid,
                email: res.user.email,
              },
            });
            message.success("Signup Successful");
            history.goBack();
          })
          .catch((err) => {
            message.error(err.message);
            console.log(err);
          });
      })
      .catch((err) => {
        message.error(err.message);
        console.log(err);
      });
  };

  return (
    <div className="signup-main-container">
      <div className="signup-image">
        <img
          src="https://www.bgr.in/wp-content/uploads/2013/06/amazonIN_logo.jpg"
          alt="signup-img"
        />
      </div>
      <div className="signup-container">
        <h1>Create Account</h1>
        <Input
          size="large"
          placeholder="Enter your Name"
          prefix={<UserOutlined />}
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "2vh 0 1vh 0" }}
        />
        <Input
          size="large"
          placeholder="Enter your email"
          prefix={<MailOutlined />}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: "1vh 0 " }}
        />
        <Input.Password
          placeholder="Input password"
          size="large"
          prefix={<LockOutlined />}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "1vh 0 " }}
        />
        <Input.Password
          placeholder="Confirm Password"
          size="large"
          prefix={<LockOutlined />}
          onChange={(e) => setCnfPassword(e.target.value)}
          style={{ margin: "1vh 0 " }}
        />

        <CustomButton handleClick={handleSignup} title="Continue" />
        <br />
        <span>By continuing, you agree to Amazon's Conditions of</span>
        <span>Use and Privacy Notice.</span>
      </div>

      <br />
      <h5>
        -------------------------Have an Account?-------------------------
      </h5>

      <CustomButton
        handleClick={() => history.push("/login")}
        title=" Login to Amazon Account"
      />
    </div>
  );
};

export default Signup;
