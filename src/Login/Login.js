import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import firebase from "firebase";
import { useStateValue } from "../StateProvider/StateProvider";
import { useHistory } from "react-router-dom";
import "./Login.css";
import CustomButton from "../CustomButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch({
          type: "UPDATE_USER",
          item: {
            uid: res.user.uid,
            email: res.user.email,
          },
        });
        message.success("login Successful");
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      });
  };

  return (
    <div className="login-main-container">
      <div className="login-image">
        <img
          src="https://www.bgr.in/wp-content/uploads/2013/06/amazonIN_logo.jpg"
          alt="login-img"
        />
      </div>
      <div className="login-container">
        <h1>Login</h1>

        <Input
          size="large"
          placeholder="Enter your email"
          prefix={<MailOutlined />}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: "2vh 0 1vh 0" }}
        />

        <Input.Password
          placeholder="Input password"
          size="large"
          prefix={<LockOutlined />}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: "1vh 0 " }}
        />
        <CustomButton handleClick={handleLogin} title="Continue" />
        <br />

        <span>By continuing, you agree to Amazon's Conditions of</span>
        <span>Use and Privacy Notice.</span>
      </div>
      <br />
      <h5>-------------------------New to Amazon?-------------------------</h5>
      <CustomButton
        handleClick={() => history.push("/signup")}
        title="Create your Amazon Account"
      />
    </div>
  );
};

export default Login;
