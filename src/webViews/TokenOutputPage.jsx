import React, { useEffect, useState } from "react";
import { Header, Loader } from "../webComponents/";

import axios from "axios";
import QRCode from "qrcode.react";
import "../webStyles/TokenOutputPage.css";
import "../webStyles/CommonItemPage.css";

function TokenOutputPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [isTokenGenerating, setIsTokenGenerating] = useState(true);
  const [tokenDetails, setTokenDetails] = useState([]);
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  const updateAllItems = async () => {
    await axios
      .post("http://127.0.0.1:5003/item/updateall", {
        isCarted: false,
      })
      .then((response) => {
        console.log(response);
        getSpecialItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSpecialItems = async () => {
    await axios
      .get("http://127.0.0.1:5003/item/get")
      .then((response) => {
        setResponseData(response.data.result.data);
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
    getTokenDetails();
  }, []);
  let curday = function () {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //As January is 0.
    let yyyy = today.getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return mm + "-" + dd + "-" + yyyy;
  };
  const createTokenDetails = async () => {
    let dataArray = responseData?.map((item) => {
      return (
        item.isCarted && {
          itemImageUrl: item.itemImageUrl,
          itemName: item.itemName,
          itemCount: item.itemCount,
          itemCost: item.itemCost,
          itemCreated: curday(),
        }
      );
    });

    let filtered = dataArray.filter(Boolean);
    console.log({ orderDetails: filtered });
    let orderDetails = filtered;
    await axios
      .post("http://127.0.0.1:5003/order/create", orderDetails)
      .then((response) => {
        setIsTokenGenerating(true);
        updateAllItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      {!isLoading && isTokenGenerating && (
        <div>
          <div className="middle">
            <div
              className="screenshot"
            >
              Take a Screenshot
            </div>
            <QRCode
              value={Math.round(Math.random() * 1000) + ""}
              size={"150"}
            />
            <div className="tokenSaveDiv">
              <button
                className="tokenSave"
                onClick={() => {
                  createTokenDetails();
                }}
              >
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <>
          <Loader />
          {isTokenGenerating && (
            <div className="middle" style={{ top: "55%", color: "#ff3d6e" }}>
              Token generating
            </div>
          )}
        </>
      )}
    </>
  );
}
export default TokenOutputPage;
