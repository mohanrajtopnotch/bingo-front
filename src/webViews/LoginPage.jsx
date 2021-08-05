import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import shallow from "zustand/shallow";

import { Loader } from "../webComponents/";
import { useCommonAppStore } from "../store/common";

import "../webStyles/LoginPage.css";
function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerResponseData } = useCommonAppStore(
    (state) => ({
      registerResponseData: state.registerResponseData,
    }),
    shallow
  );
  const history = useHistory();

  const LoginAxiosCall = () => {
    setIsLoading(true);
    axios
      .post("http://127.0.0.1:5003/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        history.push("/item/special");
        const data = response.data.userDetails.createdToken;
        localStorage.setItem("userDetails", data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    (isLoading && <Loader />) ||
    (!isLoading && (
      <>
        <div className="LoginContainer">
          <div className="LoginLogin">User login</div>

          <div className="LoginDontHaveAccount">
            Don't have an account?{" "}
            <Link className="LoginLinkRegister" to="/register">
              Register here
            </Link>
          </div>
          {registerResponseData && (
            <div className="LoginAgain">
              {registerResponseData} <br />
              Please login here !!
            </div>
          )}
        </div>
        <div className="LoginRegisterForm">
          <div>
            <div className="LoginInputLabel">PLEASE ENTER YOUR EMAIL</div>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="LoginInputLabel">PLEASE ENTER YOUR PASSWORD</div>
            <input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="LoginLoginButton"
              onClick={() => {
                LoginAxiosCall();
              }}
            >
              User login
            </button>
          </div>
        </div>
      </>
    ))
  );
}
export default LoginPage;
