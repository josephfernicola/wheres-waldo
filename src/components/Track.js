import track from "../images/waldo-track.jpeg";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";

function Track (props) {
  const { time, setTime, timerOn, setTimerOn, allowPopup, setAllowPopup } = props;
  const [popup, setPopup] = useState(true);
  const [popupText, setPopupText] = useState("");
  const [circle, setCircle] = useState("");
  const [circleCoordinates, setCircleCoordinates] = useState([]);
  const [validateWaldo, setValidateWaldo] = useState(false);
  const [validateOdlaw, setValidateOdlaw] = useState(false);
  const [validateWhitebeard, setValidateWhitebeard] = useState(false);
  const [notificationText, setNotificationText] = useState("");
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
        circleCoordinates[0].left < 424 &&
        circleCoordinates[0].left > 385 &&
        circleCoordinates[1].top < 322 &&
        circleCoordinates[1].top > 283
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
        circleCoordinates[0].left < 885 &&
        circleCoordinates[0].left > 844 &&
        circleCoordinates[1].top < 603 &&
        circleCoordinates[1].top > 565
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
        circleCoordinates[0].left < 905 &&
        circleCoordinates[0].left > 864 &&
        circleCoordinates[1].top < 801 &&
        circleCoordinates[1].top > 766
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
            <div className="singlePopup" style={{ ...popupX, ...popupY }}>
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

  useEffect(() => {
    //when all three are found
    if (odlawFound && waldoFound && whitebeardFound) {
      setTimerOn(false);
      setAllowPopup(false);
      const spacePic = document.querySelector(".trackBig");
      spacePic.className = "trackBig blur fitScreen";
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
            <form className="addTrackScore" onSubmit={addScore}>
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
    const scoreRef = collection(allScores, "trackScores");
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
    navigate(0);
  };
  return (
    <div className="trackContainer">
    <div>{winnerModal}</div>
    <div className={"trackBig blur"} onClick={popUpScreen}>
      {popupText}
      {circle}
      <img src={track} alt="Track"></img>
    </div>
  </div>
  );
}
export default Track;
