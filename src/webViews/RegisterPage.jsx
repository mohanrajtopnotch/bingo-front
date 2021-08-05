import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { useCommonAppApi } from "../store/common";

import "../webStyles/RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const history = useHistory();
 

  const Validation = () => {
    if (username && email && password && reEnterPassword) {
      if (password === reEnterPassword) {
        RegisterAxiosCall();
      } else {
        alert("Password && re-enter password must be same");
      }
    } else {
      alert("Please enter all the fields");
    }
  };
  const RegisterAxiosCall = () => {
    axios
      .post("http://127.0.0.1:5003/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        useCommonAppApi
          .getState()
          .updateRegisterResponseData(response.data.message);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="RegisterContainer">
        <>
          <div className="RegisterCreateAccount">Create new user Account</div>
          <div className="RegisterAlreadyRegistered">
            Already Registered?{" "}
            <Link className="RegisterLinkLogin" to="/login">
              User login
            </Link>
          </div>
        </>
      </div>
      <div className="RegisterRegisterForm">
        <div>
          <div className="RegisterInputLabel">PLEASE ENTER YOUR NAME</div>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div>
          <div className="RegisterInputLabel">PLEASE ENTER YOUR EMAIL</div>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <div className="RegisterInputLabel">PLEASE ENTER YOUR PASSWORD</div>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
        </div>

        <div>
          <div className="RegisterInputLabel">
            PLEASE RE-ENTER YOUR PASSWORD
          </div>
          <input
            value={reEnterPassword}
            onChange={(e) => {
              setReEnterPassword(e.target.value);
            }}
            type="password"
          />
        </div>
        <div>
          <button
            className="RegisterSignUpButton"
            onClick={() => {
              Validation();
            }}
          >
            sign up
          </button>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;
