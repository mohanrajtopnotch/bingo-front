import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";

import { Loader, Header } from "../webComponents/";

import "../webStyles/CommonItemPage.css";
function CartPage() {
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const onHandleChange = (item, type) => {
    let data = {};
    if (type === "inc") {
      data = {
        ...item,
        itemCount: item.itemCount + 1,
      };
    }
    if (type === "dec") {
      data = {
        ...item,
        itemCount: item.itemCount - 1,
      };
    }
    if (type === "cart") {
      data = {
        ...item,
        isCarted: !item.isCarted,
      };
    }
    const updateItems = async () => {
      await axios
        .post("http://127.0.0.1:5003/item/update", data)
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
  const getSpecialItems = async () => {
    await axios
      .get("http://127.0.0.1:5003/item/get")
      .then((response) => {
        setResponseData(response.data.result.data);
        setIsLoading(false);
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
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <Header />
          <div>
            <div className="itemWrapper">
              <div>
                {cartCount === 0 ? (
                  <div className="noItem">No item found</div>
                ) : (
                  <div
                    className="itemContainer"
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {responseData?.map(
                      (item, index) =>
                        item.isCarted && (
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
                              <div style={{ display: "flex" }}>
                                <div>{item.itemType}</div>
                                <div>{item.itemCost * item.itemCount} Rs</div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <div style={{ display: "flex" }}>
                                  <button
                                    className="cartButton"
                                    onClick={() => onHandleChange(item, "dec")}
                                  >
                                    -
                                  </button>
                                  <div>{item.itemCount}</div>
                                  <button
                                    className="cartButton"
                                    onClick={() => {
                                      onHandleChange(item, "inc");
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div style={{ display: "flex", color: "white" }}>
                                {item.isCarted ? (
                                  <DeleteOutlined
                                    className="cardCart"
                                    onClick={() => onHandleChange(item, "cart")}
                                  />
                                ) : (
                                  <ShoppingCartOutlined
                                    className="cardCart"
                                    onClick={() => onHandleChange(item, "cart")}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        )
                    )}
                  </div>
                )}
                <div className="itemButton">
                  <button className="LoadingJoinNowButton">
                    {responseData &&
                      responseData
                        .map((item) => {
                          return (
                            item.isCarted && item.itemCost * item.itemCount
                          );
                        })
                        .reduce((accumulator, curr) => accumulator + curr, 0)}
                  </button>
                  <Link to="/token">
                    <button className="LoadingSignInButton">
                      Generate Token
                    </button>
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
export default CartPage;
