import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import waldo from "../images/waldoFace.png";
import odlaw from "../images/odlawFace.png";
import whitebeard from "../images/whitebeardFace.png";
import logo from "../images/waldoHomeFace.jpeg";

function NavBar(props) {
  const { time, setTime, timerOn, setTimerOn } = props;
  const [navText, setNavText] = useState(
    <nav className="homeNav">
      <div className="nameLogo">
        <img className="logo" src={logo} alt="Waldo Logo"></img>
        <div className="logoWhere">Where's</div>
        <div className="logoWaldo">Waldo?</div>
      </div>
    </nav>
  );
  let location = useLocation();
  const clearTimer = () => {
    setTimerOn(false);
    setTime(0);
  };
  const setNavBar = () => {
    return (
      <nav className="nav">
        <Link to="/wheres-waldo">
          <button className="returnHome" onClick={clearTimer}>
            Return to Home
          </button>
        </Link>

        <div className="characterContainer">
          <div className="waldoImageAndName">
            <img src={waldo} alt="Waldo"></img>
            <div>Waldo</div>
          </div>
          <div className="odlawImageAndName">
            <img src={odlaw} alt="Odlaw"></img>
            <div>Odlaw</div>
          </div>
          <div className="whitebeardImageAndName">
            <img src={whitebeard} alt="Whitebeard"></img>
            <div>Whitebeard</div>
          </div>
        </div>
        <div className="timer">
          <div className="minutes">
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}m
          </div>
          <div>:</div>
          <div className="seconds">
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}s
          </div>
          <div>:</div>
          <div className="milli">{("0" + ((time / 10) % 100)).slice(-2)}ms</div>
        </div>
      </nav>
    );
  };
  useEffect(() => {
    if (
      location.pathname === "/beach" ||
      location.pathname === "/snow" ||
      location.pathname === "/space" ||
      location.pathname === "/track"
    ) {
      setNavText(setNavBar);
    }
  }, [time]);

  useEffect(() => {
    if (location.pathname === "/wheres-waldo") {
      setNavText(
        <nav className="homeNav">
          <div className="nameLogo">
            <img className="logo" src={logo} alt="Waldo Logo"></img>
            <div className="logoWhere">Where's</div>
            <div className="logoWaldo">Waldo?</div>
          </div>
        </nav>
      );
    } else if (location.pathname === "/beach") {
      setNavText(setNavBar);
    } else if (location.pathname === "/snow") {
      setNavText(setNavBar);
    } else if (location.pathname === "/space") {
      setNavText(setNavBar);
    } else if (location.pathname === "/track") {
      setNavText(setNavBar);
    } else if (location.pathname === "/leaderboards") {
      setNavText(
        <nav className="leaderboardNav">
          <Link to="/wheres-waldo">
            <button className="returnHome" onClick={clearTimer}>
              Return to Home
            </button>
          </Link>
          <div className="nameLogo">
            <img className="logo" src={logo} alt="Waldo Logo"></img>
            <div className="logoWhere">Where's</div>
            <div className="logoWaldo">Waldo</div>
          </div>
        </nav>
      );
    }
  }, [location]);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  return <nav className="navText">{navText}</nav>;
}

export default NavBar;
