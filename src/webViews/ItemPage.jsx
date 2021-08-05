import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";

import axios from "axios";
import shallow from "zustand/shallow";

import { useCommonAppStore } from "../store/cart";

import { Loader, Header } from "../webComponents/";

import "../webStyles/CommonItemPage.css";
function ItemPage() {
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVeg, setIsVeg] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const getSpecialItems = async () => {
    await axios
      .get("http://127.0.0.1:5003/item/get")
      .then((response) => {
        setIsLoading(false);
        console.log(response.data.result.data);
        setResponseData(response.data.result.data);
        let data = response.data.result.data;
        let test = data.map((item) => item.isCarted);
        let sample = test.filter(Boolean);
        setCartCount(sample.length);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getSpecialItems();
  }, [isVeg]);

  const onHandleChange = (item) => {
    const updateItems = async () => {
      await axios
        .post("http://127.0.0.1:5003/item/update", {
          itemId: item.itemId,
          isCarted: !item.isCarted,
        })
        .then((response) => {
          console.log(response.data.result.data);
          getSpecialItems();
        })
        .catch((error) => {
          console.log(error);
        });
    };
    updateItems();
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Header />
          <div>
            <div className="itemWrapper">
              <div>
                <div className="titleWrapper">
                  <div style={{ display: "flex" }}>
                    {isVeg ? (
                      <button
                        className="LoadingJoinNowButton"
                        onClick={() => {
                          setIsVeg(!isVeg);
                        }}
                        style={{
                          width: "6rem",
                          height: "2rem",
                          border: "1px solid white",
                        }}
                      >
                        Non-Veg
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsVeg(!isVeg);
                        }}
                        className="LoadingSignInButton"
                        style={{ width: "6rem", height: "2rem" }}
                      >
                        Non-Veg
                      </button>
                    )}
                    {!isVeg ? (
                      <button
                        className="LoadingJoinNowButton"
                        onClick={() => {
                          setIsVeg(!isVeg);
                        }}
                        style={{
                          width: "6rem",
                          height: "2rem",
                          border: "1px solid white",
                        }}
                      >
                        Vegetarien
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsVeg(!isVeg);
                        }}
                        className="LoadingSignInButton"
                        style={{
                          width: "6rem",
                          height: "2rem",
                          border: "1px solid white",
                        }}
                      >
                        Vegetarien
                      </button>
                    )}
                  </div>
                  <div
                    style={{
                      margin: "2rem",
                      color: "whitesmoke",
                    }}
                  >
                    <ShoppingCartOutlined />
                    <div className="cartCount">{cartCount}</div>
                  </div>
                </div>
                <div className="itemContainer">
                  {responseData &&
                    responseData.map(
                      (item) =>
                        (isVeg && item?.itemType === "Vegetarian" && (
                          <div className="cardWrapper" key={item.itemName}>
                            <img
                              src={item.itemImageUrl}
                              alt={item.itemName}
                              style={{ width: "50%" }}
                            />
                            <div className="itemContentWrapper">
                              <div style={{ textSize: "50px" }}>
                                {item.itemName}
                              </div>
                              <div>{item.itemDescription}</div>
                              <div>{item.itemCost} Rs</div>
                              <div>{item.itemType}</div>
                            </div>
                            <div style={{ display: "flex", color: "white" }}>
                              {item.isCarted ? (
                                <DeleteOutlined
                                  className="cardCart"
                                  onClick={() => onHandleChange(item)}
                                />
                              ) : (
                                <ShoppingCartOutlined
                                  className="cardCart"
                                  onClick={() => onHandleChange(item)}
                                />
                              )}
                            </div>
                          </div>
                        )) ||
                        (!isVeg && item?.itemType !== "Vegetarian" && (
                          <div className="cardWrapper" key={item.itemName}>
                            <img
                              src={item.itemImageUrl}
                              alt={item.itemName}
                              style={{ width: "50%" }}
                            />
                            <div className="itemContentWrapper">
                              <div style={{ textSize: "50px" }}>
                                {item.itemName}
                              </div>
                              <div>{item.itemDescription}</div>
                              <div>{item.itemCost} Rs</div>
                              <div>{item.itemType}</div>
                            </div>
                            <div style={{ display: "flex", color: "white" }}>
                              {item.isCarted ? (
                                <DeleteOutlined
                                  className="cardCart"
                                  onClick={() => onHandleChange(item)}
                                />
                              ) : (
                                <ShoppingCartOutlined
                                  className="cardCart"
                                  onClick={() => onHandleChange(item)}
                                />
                              )}
                            </div>
                          </div>
                        ))
                    )}
                </div>
                <div className="itemButton">
                  <Link to="/cart">
                    <button className="LoadingSignInButton">buy token</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default ItemPage;
