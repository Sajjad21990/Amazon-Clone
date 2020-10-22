import React from "react";
import { Carousel } from "antd";
import "./Home.css";
import Product from "../Product/Product";
import { useStateValue } from "../StateProvider/StateProvider";

const Home = () => {
  const [{ user }] = useStateValue();
  return (
    <div className="home">
      <div className="home_container">
        <Carousel autoplay dotPosition="left" pauseOnHover={false}>
          <img
            src={require("../images/home_image_1.jpg")}
            alt="ima"
            className="home_slider_image"
          />
          <img
            src={require("../images/home_image_2.jpg")}
            alt="ima"
            className="home_slider_image"
          />
          <img
            src={require("../images/home_image_3.jpg")}
            alt="ima"
            className="home_slider_image"
          />
          <img
            src={require("../images/home_image_4.jpg")}
            alt="ima"
            className="home_slider_image"
          />
          <img
            src={require("../images/home_image_5.jpg")}
            alt="ima"
            className="home_slider_image"
          />
          <img
            src={require("../images/home_image_6.jpg")}
            alt="ima"
            className="home_slider_image"
          />
        </Carousel>
      </div>
      <div className="home_product_row">
        <Product
          id="1"
          title="ASUS ROG Strix G17 17.3 FHD 120Hz Intel Core i7-10750H 10th Gen, GTX 1660Ti 6GB Graphics (16GB RAM/512GB NVMe SSD/Windows 10/Original Black/2.83 Kg), G712LU-H7015T"
          price="105990"
          rating="4"
          imageArr={[
            "https://m.media-amazon.com/images/I/81Ha+SI+QML._AC_UY218_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/81Kzukqx0NL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/81MZj4Q74WL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71Ckieyw6oL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71t9-oJbWoL._SL1500_.jpg",
          ]}
        />
        <Product
          id="2"
          title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey"
          price="195902"
          rating="4.5"
          imageArr={[
            "https://m.media-amazon.com/images/I/71L2iBSyyOL._AC_UY218_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/81bF-d1dNoL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/91cLzH2bjKL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/81mJ-Mdc-OL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71p1D89L7RL._SL1500_.jpg",
          ]}
        />
        <Product
          id="3"
          title="Dell Alienware M15 R2 15.6-inch FHD Laptop (9th Gen Core i9-9980HK/16GB/1TB SSD/Windows 10 + MS Office/8GB NVIDIA 2080 Graphics), Lunar Light"
          price="322899"
          rating="4.5"
          imageArr={[
            "https://m.media-amazon.com/images/I/61GfchY6UyL._AC_UY218_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61w33PBAzlL._SL1000_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61qV6GcyhbL._SL1000_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51WI1CrO9jL._SL1000_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61ejMkBfs4L._SL1000_.jpg",
          ]}
        />
      </div>
      <div className="home_product_row">
        <Product
          id="4"
          title="Apple iPhone 11 Pro Max (64GB) - Midnight Green"
          price="108599"
          rating="4.5"
          imageArr={[
            "https://m.media-amazon.com/images/I/61ers6OzvUL._AC_UY218_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51irJFXzIKL._SL1024_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51Xhd-f%2BQ-L._SL1024_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61jCXtTWt6L._SL1024_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71MHuC2HQBL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61v%2BUTZ1roL._SL1024_.jpg",
          ]}
          imageUrl="https://m.media-amazon.com/images/I/61ers6OzvUL._AC_UY218_.jpg"
        />
        <Product
          id="5"
          title="OnePlus 8 Pro (Glacial Green 12GB RAM+256GB Storage)"
          price="59999"
          rating="4"
          imageArr={[
            "https://m.media-amazon.com/images/I/61n6Ovq6EdL._AC_UY218_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61AAPiIN2NL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51lxhpLCTzL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/51pEDhBDlTL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61fmfBIeASL._SL1500_.jpg",
          ]}
          imageUrl="https://m.media-amazon.com/images/I/61n6Ovq6EdL._AC_UY218_.jpg"
        />
      </div>
      <div className="home_product_row">
        <Product
          id="6"
          title="Samsung 163 cm (65 Inches) Wondertainment Series Ultra HD LED Smart TV UA65TUE60AKXXL (Titan Gray) (2020 model)"
          price="94999"
          rating="3.5"
          imageArr={[
            "https://m.media-amazon.com/images/I/81644xBqdyL._AC_UY218_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/81-SLwv8vHL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/813ywQrdqTL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/61%2BjtD7%2BJkL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/811FKiXmfgL._SL1500_.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71yYQ-WnYtL._SL1500_.jpg",
          ]}
          imageUrl="https://m.media-amazon.com/images/I/81644xBqdyL._AC_UY218_.jpg"
        />
      </div>
    </div>
  );
};

export default Home;
