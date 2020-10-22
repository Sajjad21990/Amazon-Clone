import React from "react";
import { Popover, Button } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./Header.css";
import { useStateValue } from "../StateProvider/StateProvider";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const [{ cart, user }] = useStateValue();
  const history = useHistory();
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Button onClick={() => history.push("/login")}>Sign in</Button>
      <p>
        New customer? <Link to="/signup">Start here.</Link>
      </p>
    </div>
  );

  return (
    <div className="header">
      <Link to="/">
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
          className="header_logo"
        />
      </Link>

      <div className="header_search">
        <input type="text" className="header_search_input" />
        <SearchOutlined className="header_search_icon" />
      </div>
      <div className="header_nav">
        <div
          className="header_nav_option"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/login")}
        >
          {user === null ? (
            <Popover content={content}>
              <span className="header_nav_option_line1">Hello</span>
              <br />
              <span className="header_nav_option_line2">Signin</span>
            </Popover>
          ) : (
            <>
              <span className="header_nav_option_line1">Hello</span>

              <span className="header_nav_option_line2">Sign out</span>
            </>
          )}
        </div>
        <div
          className="header_nav_option"
          onClick={() => history.push("/orders")}
          style={{ cursor: "pointer" }}
        >
          <span className="header_nav_option_line1">Returns</span>
          <span className="header_nav_option_line2">& Orders</span>
        </div>
        <div className="header_nav_option">
          <span className="header_nav_option_line1">Try</span>
          <span className="header_nav_option_line2">Prime</span>
        </div>
      </div>
      <div className="header_cart">
        <Link to="/checkout" style={{ textDecoration: "none", color: "white" }}>
          <ShoppingCartOutlined className="header_cart_icon" />
          <span className="header_cart_value">{cart.length}</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
