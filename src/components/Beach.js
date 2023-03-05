import beach from "../images/waldo-beach.jpeg";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";

function Beach(props) {
  const {
    time,
    setTimerOn,
    allowPopup,
    setAllowPopup,
    startButtonAndNotificationText,
    setStartButtonAndNotificationText,
  } = props;
  const [popup, setPopup] = useState(true);
  const [popupText, setPopupText] = useState("");
  const [circle, setCircle] = useState("");
  const [circleCoordinates, setCircleCoordinates] = useState([]);
  const [validateWaldo, setValidateWaldo] = useState(false);
  const [validateOdlaw, setValidateOdlaw] = useState(false);
  const [validateWhitebeard, setValidateWhitebeard] = useState(false);
  const [waldoFound, setWaldoFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);
  const [whitebeardFound, setWhitebeardFound] = useState(false);
  const [winnerModal, setWinnerModal] = useState("");
  let location = useLocation();
  const navigate = useNavigate();

  const unBlurImage = () => {
    setTimerOn(true);
    setAllowPopup(true); //allows people to click image to make guesses
    setStartButtonAndNotificationText("");
    const mapContainer = document.querySelector(".mapContainer");
    mapContainer.children[1].className = "mapBig"; //remove the blur
  };

  useEffect(() => {
    setStartButtonAndNotificationText(
      <button className="startTimerButton" onClick={unBlurImage}>
        Start!
      </button>
    );
  }, []);

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

  useEffect(() => {
    if (circleCoordinates.length === 2) {
      if (
        circleCoordinates[0].left < 909 &&
        circleCoordinates[0].left > 871 &&
        circleCoordinates[1].top < 371 &&
        circleCoordinates[1].top > 326
      ) {
        const waldoImg =
          document.querySelector(".waldoImageAndName").firstChild;
        waldoImg.className = "greyOut";
        setWaldoFound(true);

        setStartButtonAndNotificationText(
          <div className="correctGuess">Found Waldo!</div>
        );
      } else {
        setStartButtonAndNotificationText(
          <div className="wrongGuess">Try Again!</div>
        );
      }
    }
  }, [validateWaldo]);

  useEffect(() => {
    if (circleCoordinates.length === 2) {
      if (
        circleCoordinates[0].left < 177 &&
        circleCoordinates[0].left > 135 &&
        circleCoordinates[1].top < 351 &&
        circleCoordinates[1].top > 307
      ) {
        const odlawImg =
          document.querySelector(".odlawImageAndName").firstChild;
        odlawImg.className = "greyOut";
        setOdlawFound(true);

        setStartButtonAndNotificationText(
          <div className="correctGuess">Found Odlaw!</div>
        );
      } else {
        setStartButtonAndNotificationText(
          <div className="wrongGuess">Try Again!</div>
        );
      }
    }
  }, [validateOdlaw]);

  useEffect(() => {
    if (circleCoordinates.length === 2) {
      if (
        circleCoordinates[0].left < 408 &&
        circleCoordinates[0].left > 370 &&
        circleCoordinates[1].top < 351 &&
        circleCoordinates[1].top > 310
      ) {
        const whitebeardImg = document.querySelector(
          ".whitebeardImageAndName"
        ).firstChild;
        whitebeardImg.className = "greyOut";
        setWhitebeardFound(true);

        setStartButtonAndNotificationText(
          <div className="correctGuess">Found Whitebeard!</div>
        );
      } else {
        setStartButtonAndNotificationText(
          <div className="wrongGuess">Try Again!</div>
        );
      }
    }
  }, [validateWhitebeard]);

  useEffect(() => {
    //when all three are found
    if (odlawFound && waldoFound && whitebeardFound) {
      setStartButtonAndNotificationText("");

      setTimerOn(false);
      setAllowPopup(false);

      const beachPic = document.querySelector(".mapBig");
      beachPic.className = "mapBig blur fitScreen";
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
              <input
                type="text"
                name="name"
                placeholder="Name"
                maxLength="30"
              ></input>
              <button type="submit" className="submitScoreButton">
                Add Score
              </button>
            </form>

            <Link to="/leaderboards">
              <button className="leaderboardButton">View Leaderboards</button>
            </Link>
          </div>
        </div>
      );
    }
  }, [odlawFound, waldoFound, whitebeardFound, setTimerOn, time]);

  const addScore = (e) => {
    e.preventDefault();
    const allScores = getFirestore();
    const scoreRef = collection(allScores, "beachScores");
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

  useEffect(() => {
    const winnerModal = document.querySelector(".winnerModalContainer");
    const navStartButtonAndNotificationText = document.querySelector(".startButtonAndNotificationText");
    if (winnerModal) {
      if (winnerModal.firstChild) {
        setStartButtonAndNotificationText("");
        navStartButtonAndNotificationText.firstChild.textContent = ""
      }
    }
  }, [winnerModal, setWinnerModal])

  return (
    <div className="mapContainer">
      <div className="winnerModalContainer">{winnerModal}</div>
      <div className={"mapBig blur"} onClick={popUpScreen}>
        {popupText}
        {circle}
        <img src={beach} alt="Beach"></img>
      </div>
    </div>
  );
}

export default Beach;


