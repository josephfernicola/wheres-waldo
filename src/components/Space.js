import space from "../images/waldo-space.jpeg";
import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";

function Space (props) {
  const { time, setTime, timerOn, setTimerOn, allowPopup, setAllowPopup } = props;
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

  useEffect(() => {
    if (circleCoordinates.length === 2) {

      if (
        circleCoordinates[0].left < 605 &&
        circleCoordinates[0].left > 561 &&
        circleCoordinates[1].top < 611 &&
        circleCoordinates[1].top > 571
      ) {

        const waldoImg =
          document.querySelector(".waldoImageAndName").firstChild;
        waldoImg.className = "greyOut";
        setWaldoFound(true);
      }
    }
  }, [validateWaldo]);

  useEffect(() => {
    if (circleCoordinates.length === 2) {

      if (
        circleCoordinates[0].left < 122 &&
        circleCoordinates[0].left > 81 &&
        circleCoordinates[1].top < 673 &&
        circleCoordinates[1].top > 634
      ) {
 
        const odlawImg =
          document.querySelector(".odlawImageAndName").firstChild;
        odlawImg.className = "greyOut";
        setOdlawFound(true);
      }
    }
  }, [validateOdlaw]);

  useEffect(() => {
    if (circleCoordinates.length === 2) {

      if (
        circleCoordinates[0].left < 1145 &&
        circleCoordinates[0].left > 1106 &&
        circleCoordinates[1].top < 568 &&
        circleCoordinates[1].top > 529
      ) {

        const whitebeardImg = document.querySelector(
          ".whitebeardImageAndName"
        ).firstChild;
        whitebeardImg.className = "greyOut";
        setWhitebeardFound(true);
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
  useEffect(() => {
    //when all three are found
    if (odlawFound && waldoFound && whitebeardFound) {
      setTimerOn(false);
      setAllowPopup(false);
      const spacePic = document.querySelector(".spaceBig");
      spacePic.className = "spaceBig blur fitScreen";
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
            <form className="addSpaceScore" onSubmit={addScore}>
              <label htmlFor="name"></label>
              <input type="text" name="name" placeholder="Name" maxLength="30"></input>
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
  }, [odlawFound, waldoFound, whitebeardFound]);

  const addScore = (e) => {
    e.preventDefault();
    const allScores = getFirestore();
    const scoreRef = collection(allScores, "spaceScores");
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

  return (
    <div className="spaceContainer">
    <div>{winnerModal}</div>
    <div className={"spaceBig blur"} onClick={popUpScreen}>
      {popupText}
      {circle}
      <img src={space} alt="Space"></img>
    </div>
  </div>
  );
}

export default Space;
