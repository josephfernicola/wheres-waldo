import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import waldo from "../images/waldoFace.png";
import odlaw from "../images/odlawFace.png";
import whitebeard from "../images/whitebeardFace.png";
import logo from "../images/waldoHomeFace.png";

function NavBar(props) {
  const {
    time,
    setTime,
    timerOn,
    setTimerOn,
    allowPopup,
    setAllowPopup,
    startButtonAndNotificationText,
    setStartButtonAndNotificationText,
  } = props;
  const [navText, setNavText] = useState(
    <nav className="homeNav">
      <div className="nameLogo">
        <img className="logo" src={logo} alt="Waldo Logo"></img>
        <div className="logoWhere">Where's</div>
        <div className="logoWaldo">Waldo?</div>
      </div>
    </nav>
  );

  const unBlurImage = (e) => {
    setTimerOn(true);
    setAllowPopup(true); //allows people to click image to make guesses
    setStartButtonAndNotificationText("");
    const mapContainer = document.querySelector(".mapContainer");
    mapContainer.children[1].className = "mapBig"; //remove the blur
  };

  let location = useLocation();

  useEffect(() => {
    if (
      location.pathname !== "/beach" ||
      location.pathname !== "/space" ||
      location.pathname !== "/snow" ||
      location.pathname !== "/track"
    ) {
      setTimerOn(false);
      setTime(0);
    }
  }, [location]);

  useEffect(() => { //reset the start button times anytime the user changes pages
    setStartButtonAndNotificationText(
      <button className="startTimerButton" onClick={unBlurImage}>
        Start!
      </button>
    );
  }, [location]);

  const clearTimerAndResetColumns = () => {
    setTimerOn(false);
    setTime(0);
    if (
      location.pathname === "/beach" ||
      location.pathname === "/snow" ||
      location.pathname === "/space" ||
      location.pathname === "/track"
    ) {
      const nav = document.querySelector(".nav");
      nav.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
      setAllowPopup(false);
      //setStartButtonAndNotificationText()
    }
  };

  const setNavBar = () => {
    return (
      <nav className="nav">
        <Link to="/wheres-waldo">
          <button className="returnHome" onClick={clearTimerAndResetColumns}>
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
        <div className="startButtonAndNotificationText">
          {startButtonAndNotificationText}
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
  }, [time, location.pathname]);

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
        <div className="leaderboardNav">
          <Link to="/wheres-waldo">
            <button className="returnHome" onClick={clearTimerAndResetColumns}>
              Return to Home
            </button>
          </Link>
          <div className="nameLogo">
            <img className="logo" src={logo} alt="Waldo Logo"></img>
            <div className="logoWhere">Where's</div>
            <div className="logoWaldo">Waldo</div>
          </div>
        </div>
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
