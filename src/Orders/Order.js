import React from "react";
import "./Order.css";
import moment from "moment";

const Order = (props) => {
  const { data } = props;
  return (
    <div>
      <div className="order-container">
        <div className="order-header">
          <div className="order-placed">
            <h6 className="heading">ORDER PLACED</h6>
            <h6 className="heading">
              {moment.unix(data.data.orderedOn).format("MMMM Do YYYY, h:mma")}
            </h6>
          </div>
          <div className="order-total">
            <div>
              <h6 className="heading">Total</h6>
              <h6 className="heading">₹ {data.data.amount}</h6>
            </div>
            <div>
              <h6 className="heading">Order Id: #{data.data.orderId}</h6>
            </div>
          </div>
        </div>
        <div className="order-content">
          <div className="order-content-successful">
            <h4>Successful</h4>
            <h5>
              Paid on:
              {moment.unix(data.data.orderedOn).format("MMMM Do YYYY, h:mma")}
            </h5>
          </div>
          {data.data.order.map((_order) => {
            return (
              <div className="order-details">
                <div className="order-details-img">
                  <img src={_order.image} alt="img" />
                </div>
                <div className="order-details-details">
                  <h3>{_order.title}</h3>
                  <h3>{_order.price}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Order;
