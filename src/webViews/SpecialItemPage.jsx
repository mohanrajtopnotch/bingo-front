import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

import { Loader, Header } from "../webComponents/";

import "../webStyles/CommonItemPage.css";

function SpecialItemPage() {
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const history = useHistory();

  const getSpecialItems = async () => {
    await axios
      .get("http://127.0.0.1:5003/item/get")
      .then((response) => {
        console.log(response.data.result.data);
        setResponseData(response.data.result.data);
        let data = response.data.result.data;
        let test = data.map((item) => item.isCarted);
        let sample = test.filter(Boolean);
        setCartCount(sample.length);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    getSpecialItems();
  }, [setCartCount, setResponseData]);

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
            <div className="imageWrapper"></div>
            <div className="itemWrapper">
              <div>
                <div className="titleWrapper">
                  <div style={{ display: "flex" }}>
                    <ArrowLeftOutlined
                      style={{
                        margin: "1rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        history.push("/");
                      }}
                    />
                    <h3 style={{ margin: "1rem", color: "white" }}>
                      Today's Special
                    </h3>
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
                        item.isSpecial && (
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
                        )
                    )}
                </div>
                <div className="itemButton">
                  <Link to="/item">
                    <button className="LoadingJoinNowButton">Home</button>
                  </Link>
                  <Link to="/cart">
                    <button className="LoadingSignInButton">
                      Procced to buy token
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
export default SpecialItemPage;
