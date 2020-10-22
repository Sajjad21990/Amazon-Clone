import React, { useState } from "react";
import { Rate, Button, Carousel, notification } from "antd";
import "./Product.css";
import { useStateValue } from "../StateProvider/StateProvider";
import NumberFormat from "react-number-format";
import CustomButton from "../CustomButton";

const Product = (props) => {
  const { title, price, rating, imageArr, id } = props;
  const [btnClicked, setBtnClicked] = useState(false);
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  const handleAddToCart = (desc) => {
    notification["success"]({
      message: "Added To Cart",
      description: desc,
    });
    setBtnClicked(true);
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id,
        title,
        price,
        image: imageArr[0],
        rating,
      },
    });
  };

  const handleRemoveFromCart = () => {
    setBtnClicked(false);
    dispatch({
      type: "REMOVE_FROM_CART",
      item: {
        id,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>₹</small>
          <strong>
            <NumberFormat
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              value={price}
              style={{ border: "none", fontWeight: "bold" }}
            />
          </strong>
        </p>
        <div className="product_rating">
          <Rate allowHalf defaultValue={2.5} disabled={true} value={rating} />
        </div>
      </div>
      <div className="product_images">
        <Carousel autoplay autoplaySpeed={4000} dots={false}>
          {imageArr.map((_img, i) => (
            <img src={_img} alt={i} className="product_image_slider" />
          ))}
        </Carousel>
      </div>
      {/* <img src={imageUrl} alt="product" /> */}
      {!btnClicked ? (
        <CustomButton
          handleClick={() => handleAddToCart(title)}
          title="Add to Cart"
        />
      ) : (
        <CustomButton
          handleClick={handleRemoveFromCart}
          title="Remove from Cart"
        />
      )}
    </div>
  );
};

export default Product;
