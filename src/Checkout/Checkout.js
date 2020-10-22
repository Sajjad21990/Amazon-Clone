import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Badge, Menu, Dropdown, Button, Checkbox } from "antd";
import { DownOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Checkout.css";
import { useStateValue } from "../StateProvider/StateProvider";
import NumberFormat from "react-number-format";
import CustomButton from "../CustomButton";

const menu = (
  <Menu>
    <Menu.Item>
      {/* <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a> */}
      1
    </Menu.Item>
    <Menu.Item>2</Menu.Item>
    <Menu.Item>3</Menu.Item>
    <Menu.Item>4</Menu.Item>
    <Menu.Item>5</Menu.Item>
  </Menu>
);

const Checkout = () => {
  const [{ cart }, dispatch] = useStateValue();
  const [totalPrice, setTotalPrice] = useState(0);
  const History = useHistory();

  useEffect(() => {
    let price = 0;
    cart.map((prod) => {
      price += parseInt(prod.price);
    });
    setTotalPrice(price);
    dispatch({
      type: "CART_TOTAL",
      total: price,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleRemoveFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* {console.log("total price", totalPrice)} */}
      <div style={{ margin: "20px" }}>
        <p>
          <strong>
            Pay faster for all your shopping needs
            <span style={{ color: "#B22222" }}> with Amazon Pay balance</span>
          </strong>
        </p>
        <p>Get Instant refund on cancellations | Zero payment failures</p>
      </div>

      <div className="checkout-container">
        <div className="cart-container" style={{ margin: "20px" }}>
          <h1>
            Shopping Cart
            <span style={{ float: "right", marginRight: "10px" }}>Price</span>
          </h1>

          {cart && cart.length > 0 ? (
            cart.map((product) => (
              <div className="cart-item-container">
                <div className="cart-img">
                  <img src={product.image} alt="cart-img" />
                </div>

                <div className="cart-item-detail-container">
                  <div className="cart-item-detail">
                    <Link>
                      <h2 className="cart-item-heading">{product.title}</h2>
                    </Link>
                    <Badge.Ribbon
                      text="#1 BEST SELLER"
                      placement="start"
                      color="#E47911"
                      style={{ color: "white", margin: "5px" }}
                    ></Badge.Ribbon>
                    <br />
                    <br />
                    <h6>In Stock</h6>
                    <h6>Eligible for FREE Shipping</h6>
                    <img
                      src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png"
                      alt="amazon-fullfilled"
                    />
                    <br />
                    <Dropdown overlay={menu} placement="bottomCenter" arrow>
                      <Button
                        style={{ margin: "5px 0px" }}
                        className="common-button"
                      >
                        Qty: 1 <DownOutlined />
                      </Button>
                    </Dropdown>
                    <br />
                    <span
                      className="delete-from-cart"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      <DeleteOutlined /> Delete
                    </span>
                  </div>
                  <div className="cart-item-price">
                    <h3>
                      <small>₹</small>
                      {product.price}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>Empty Cart</h1>
            </div>
          )}
        </div>
        <div className="checkout-items-total">
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
            alt="checkout-img"
          />
          <div className="checkout">
            <div className="checkout-header">
              <CheckOutlined />
              <span> Your order is eligible for FREE Delivery.</span>
            </div>
            <div className="checkout-total">
              <span>
                Subtotal ({cart.length} items):
                <strong>
                  <small> ₹ </small>
                  <NumberFormat
                    thousandSeparator={true}
                    thousandsGroupStyle="lakh"
                    value={totalPrice}
                    style={{
                      border: "none",
                      fontWeight: "bold",
                      backgroundColor: "transparent",
                      width: "8vw",
                    }}
                  />
                </strong>
              </span>
              <Checkbox style={{ margin: "0.5rem" }}>
                This order contains a gift
              </Checkbox>

              <CustomButton
                handleClick={() => History.push("/payment")}
                title="Proceed to Buy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
