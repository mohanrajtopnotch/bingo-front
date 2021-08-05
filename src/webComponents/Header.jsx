/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { CSSTransition } from "react-transition-group";
import { useHistory, Link } from "react-router-dom";
import { MenuOutlined, WeiboOutlined } from "@ant-design/icons";
function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  const imgSrc =
    "https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg";
  return (
    <header className="Header">
      <div className="Title">BingoBooking</div>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <Link to="/item">
            <button>Home</button>
          </Link>
          <Link to="/item/special">
            <button>Special</button>
          </Link>
          <Link to="/cart">
            <button>Cart</button>
          </Link>
          <Link to="/token">
            <button>Token</button>
          </Link>
          <Link to="/order">
            <button>Order</button>
          </Link>
          <span>
            <button
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              Logout
            </button>
          </span>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <MenuOutlined style={{ color: "white" }} />
      </button>
    </header>
  );
}

export default Header;
