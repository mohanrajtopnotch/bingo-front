import React, { useEffect, useState } from "react";
import { Header, Loader } from "../webComponents";

import axios from "axios";
import "../webStyles/CommonItemPage.css";

function OrderDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenDetails, setTokenDetails] = useState([]);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  useEffect(() => {
    setIsLoading(true);
    getTokenDetails();
  }, []);

  const getTokenDetails = async () => {
    await axios
      .get("http://127.0.0.1:5003/order/get")
      .then((response) => {
        setIsLoading(false);
        console.log(response.data.result.data);
        let mapData = response.data.result.data;
        let filteredData = mapData.map((item) => item.orderDetails);
        let temp = [];
        filteredData.forEach((item) => {
          item.map((data) => temp.push(data));
        });
        setTokenDetails(temp.flat());
        console.log(tokenDetails);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <div
        className="itemWrapper"
        style={{ padding: "20px", display: "flex", flexWrap: "wrap" }}
      >
        {!isLoading &&
          tokenDetails?.map((item) => (
            <div
              className="cardWrapper"
              style={{ margin: 0, margin: "20px" }}
              key={item.itemName}
            >
              <img
                src={item.itemImageUrl}
                alt={item.itemName}
                style={{ width: "50%" }}
              />
              <div className="itemContentWrapper">
                <div style={{ textSize: "50px" }}>Ordered Item: {item.itemName}</div>
                <div>Cost: {item.itemCost} Rs</div>
                <div>Count: {item.itemCount}</div>
                <div>Total Cost: {item.itemCount * item.itemCost}</div>
                <div>Ordered Date: {item.itemCreated}</div>
              </div>
            </div>
          ))}

        {isLoading && (
          <>
            <Loader />
            <div className="middle" style={{ top: "55%", color: "#ff3d6e" }}>
              Order History Details
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default OrderDetailsPage;
