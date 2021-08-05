import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Loader } from "../webComponents/";

import "../webStyles/LoadingPage.css";
function LandingPage() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getStoredValues = async () => {
      const token = await localStorage.getItem("userDetails");
      console.log(token);
      if (token) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        history.push("/product/special");
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    getStoredValues();
  }, []);
  return (
    (isLoading && <Loader />) ||
    (!isLoading && (
      <>
        <div className="LoadingContainer">
          <img
            className="LoadingImageAvatar"
            src="https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
            alt="Loading Avatar"
          />
          <div>
            <div className="LoadingLanderTitle"> Bingo Foods</div>
            <div className="LoadingLanderSubTitle">
              we offer a platform for buy tokens
            </div>
          </div>
          <div>
            <Link to="/register">
              <button className="LoadingJoinNowButton">join now</button>
            </Link>
            <Link to="/login">
              <button className="LoadingSignInButton">Sign in</button>
            </Link>
          </div>
        </div>
      </>
    ))
  );
}
export default LandingPage;
