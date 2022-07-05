import snow from "../images/waldo-snow.jpeg";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Snow(props) {
  const { time, setTime, timerOn, setTimerOn } = props;
  const [popup, setPopup] = useState(true);
  const [popupText, setPopupText] = useState("");
  const [circle, setCircle] = useState("");
  const [circleCoordinates, setCircleCoordinates] = useState([]);
  const [validateWaldo, setValidateWaldo] = useState(false);
  const [validateOdlaw, setValidateOdlaw] = useState(false);
  const [validateWhitebeard, setValidateWhitebeard] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [allowPopup, setAllowPopup] = useState(false);
  const [waldoFound, setWaldoFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);
  const [whitebeardFound, setWhitebeardFound] = useState(false);
  const [winnerModal, setWinnerModal] = useState("");
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setNotificationText("");
    }, 4000);
  }, [validateWaldo, validateOdlaw, validateWhitebeard]);

  useEffect(() => {
    if (circleCoordinates.length === 2) {
      if (
        circleCoordinates[0].left < 1250 &&
        circleCoordinates[0].left > 1213 &&
        circleCoordinates[1].top < 681 &&
        circleCoordinates[1].top > 641
      ) {
        setNotificationText(
          <div className="correctNotification">Found Waldo!</div>
        );
        const waldoImg =
          document.querySelector(".waldoImageAndName").firstChild;
        waldoImg.className = "greyOut";
        setWaldoFound(true);
      } else {
        setNotificationText(
          <div className="wrongNotification">Try Again!</div>
        );
      }
    }
  }, [validateWaldo]);

  useEffect(() => {
    if (circleCoordinates.length === 2) {
      if (
        circleCoordinates[0].left < 477 &&
        circleCoordinates[0].left > 439 &&
        circleCoordinates[1].top < 598 &&
        circleCoordinates[1].top > 563
      ) {
        setNotificationText(
          <div className="correctNotification">Found Odlaw!</div>
        );
        const odlawImg =
          document.querySelector(".odlawImageAndName").firstChild;
        odlawImg.className = "greyOut";
        setOdlawFound(true);
      } else {
        setNotificationText(
          <div className="wrongNotification">Try Again!</div>
        );
      }
    }
  }, [validateOdlaw]);

  useEffect(() => {
    if (circleCoordinates.length === 2) {
      if (
        circleCoordinates[0].left < 121 &&
        circleCoordinates[0].left > 82 &&
        circleCoordinates[1].top < 712 &&
        circleCoordinates[1].top > 672
      ) {
        setNotificationText(
          <div className="correctNotification">Found Whitebeard!</div>
        );
        const whitebeardImg = document.querySelector(
          ".whitebeardImageAndName"
        ).firstChild;
        whitebeardImg.className = "greyOut";
        setWhitebeardFound(true);
      } else {
        setNotificationText(
          <div className="wrongNotification">Try Again!</div>
        );
      }
    }
  }, [validateWhitebeard]);

  const popUpScreen = (e) => {
    if (allowPopup) {
      setPopup((prevPopup) => !prevPopup);
      if (popup) {
        const circleX = { left: e.pageX };
        const circleY = { top: e.pageY };
        setCircleCoordinates([circleX, circleY]);
        const popupX = { left: e.pageX + 10 };
        const popupY = { top: e.pageY + 10 };
        if (!waldoFound && !odlawFound && !whitebeardFound) {
          setPopupText(
            <div className="popup" style={{ ...popupX, ...popupY }}>
              <div onClick={switchValidateWaldo} className="waldoText">
                Waldo
              </div>
              <div onClick={switchValidateOdlaw} className="odlawText">
                Odlaw
              </div>
              <div
                onClick={switchValidateWhitebeard}
                className="whitebeardText"
              >
                Whitebeard
              </div>
            </div>
          );
        } else if (waldoFound && !odlawFound && !whitebeardFound) {
          setPopupText(
            <div className="popup" style={{ ...popupX, ...popupY }}>
              <div onClick={switchValidateOdlaw} className="odlawText">
                Odlaw
              </div>
              <div
                onClick={switchValidateWhitebeard}
                className="whitebeardText"
              >
                Whitebeard
              </div>
            </div>
          );
        } else if (waldoFound && odlawFound && !whitebeardFound) {
          setPopupText(
            <div className="singlePopup" style={{ ...popupX, ...popupY }}>
              <div
                onClick={switchValidateWhitebeard}
                className="whitebeardText"
              >
                Whitebeard
              </div>
            </div>
          );
        } else if (waldoFound && !odlawFound && whitebeardFound) {
          setPopupText(
            <div className="singlePopup" style={{ ...popupX, ...popupY }}>
              <div onClick={switchValidateOdlaw} className="odlawText">
                Odlaw
              </div>
            </div>
          );
        } else if (!waldoFound && odlawFound && !whitebeardFound) {
          setPopupText(
            <div className="popup" style={{ ...popupX, ...popupY }}>
              <div onClick={switchValidateWaldo} className="waldoText">
                Waldo
              </div>
              <div
                onClick={switchValidateWhitebeard}
                className="whitebeardText"
              >
                Whitebeard
              </div>
            </div>
          );
        } else if (!waldoFound && odlawFound && whitebeardFound) {
          setPopupText(
            <div className="singlePopup" style={{ ...popupX, ...popupY }}>
              <div onClick={switchValidateWaldo} className="waldoText">
                Waldo
              </div>
            </div>
          );
        } else if (!waldoFound && !odlawFound && whitebeardFound) {
          setPopupText(
            <div className="popup" style={{ ...popupX, ...popupY }}>
              <div onClick={switchValidateWaldo} className="waldoText">
                Waldo
              </div>
              <div onClick={switchValidateOdlaw} className="odlawText">
                Odlaw
              </div>
            </div>
          );
        }

        setCircle(
          <div className="circle" style={{ ...circleX, ...circleY }}></div>
        );
      } else {
        setPopupText("");
        setCircle("");
      }
    }
  };

  const switchValidateWaldo = () => {
    //switch between true and false to check for character on every click
    setValidateWaldo((prevValue) => !prevValue);
  };
  const switchValidateOdlaw = () => {
    //switch between true and false to check for character on every click
    setValidateOdlaw((prevValue) => !prevValue);
  };
  const switchValidateWhitebeard = () => {
    //switch between true and false to check for character on every click
    setValidateWhitebeard((prevValue) => !prevValue);
  };

  const unBlurImage = (e) => {
    setTimerOn(true);
    setAllowPopup(true); //allows people to click image to make guesses
    const snowImg = e.target.parentElement.lastChild;
    snowImg.className = "snowBig"; //removed the blur
    const introText = e.target.parentElement.firstChild;
    introText.remove();
    e.target.remove();
  };
  useEffect(() => {
    //when all three are found
    if (odlawFound && waldoFound && whitebeardFound) {
      setTimerOn(false);
      setAllowPopup(false);
      const snowPic = document.querySelector(".snowBig");
      snowPic.className = "snowBig blur";
      setWinnerModal(
        <div className="winnerModal">
          <div className="winnerTime">
            <span>You found all characters in</span>
            <span>
              {("0" + Math.floor((time / 60000) % 60)).slice(-2)}m :
              {("0" + Math.floor((time / 1000) % 60)).slice(-2)}s :
              {("0" + ((time / 10) % 100)).slice(-2)}ms
            </span>
          </div>
          <div className="winnerNameInput">
            <form className="addBeachScore" onSubmit={addScore}>
              <label htmlFor="name"></label>
              <input type="text" name="name" placeholder="Name" maxlength="30"></input>
              <button type="submit" className="submitScoreButton">
                Add Score
              </button>
            </form>
            <div className="tryAgainAndLeaderboard">
              <button type="button" className="tryAgain" onClick={refreshPage}>
                Try Again
              </button>
              <Link to="/leaderboards">
                <button className="leaderboardButton">View Leaderboards</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }, [odlawFound, waldoFound, whitebeardFound]);

  const addScore = (e) => {
    e.preventDefault();
    const allScores = getFirestore();
    const scoreRef = collection(allScores, "snowScores");
    if (e.target.children[1].value.length > 0) {
    addDoc(scoreRef, {
      name: e.target.children[1].value,
      time:
        ("0" + Math.floor((time / 60000) % 60)).slice(-2) +
        "m : " +
        ("0" + Math.floor((time / 1000) % 60)).slice(-2) +
        "s : " +
        ("0" + ((time / 10) % 100)).slice(-2) +
        "ms",
    });
    navigate("/leaderboards");
  }
  };
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div>
      <div className="introText">Find Waldo, Odlaw and Whitebeard!</div>
      <button className="startTimerButton" onClick={unBlurImage}>
        Start!
      </button>
      <div>{winnerModal}</div>
      <div className={"snowBig blur"} onClick={popUpScreen}>
        {popupText}
        {circle}
        <img src={snow} alt="Snow"></img>
        <div className="notificationText">{notificationText}</div>
      </div>
    </div>
  );
}

export default Snow;
