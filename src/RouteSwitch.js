import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Beach from "./components/Beach";
import Snow from "./components/Snow";
import Space from "./components/Space";
import Track from "./components/Track";
import Leaderboards from "./components/Leaderboards";

const RouteSwitch = () => {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [allowPopup, setAllowPopup] = useState(false);
  

  const unBlurImage = (e) => {
    setTimerOn(true);
    setAllowPopup(true); //allows people to click image to make guesses
    setStartButtonAndNotificationText("");
    const mapContainer = document.querySelector(".mapContainer");
    mapContainer.children[1].className = "mapBig"; //remove the blur
  };

  const [startButtonAndNotificationText, setStartButtonAndNotificationText] =
    useState(<button className="startTimerButton" onClick={unBlurImage}>Start!</button>);



  return (
    <BrowserRouter>
      <NavBar
        time={time}
        setTime={setTime}
        timerOn={timerOn}
        setTimerOn={setTimerOn}
        allowPopup={allowPopup}
        setAllowPopup={setAllowPopup}
        startButtonAndNotificationText={startButtonAndNotificationText}
        setStartButtonAndNotificationText={setStartButtonAndNotificationText}
      />
      <Routes>
        <Route path="/wheres-waldo" element={<Home />} />
        <Route
          path="/beach"
          element={
            <Beach
              time={time}
              setTime={setTime}
              timerOn={timerOn}
              allowPopup={allowPopup}
              setAllowPopup={setAllowPopup}
              setTimerOn={setTimerOn}
              startButtonAndNotificationText={startButtonAndNotificationText}
              setStartButtonAndNotificationText={
                setStartButtonAndNotificationText
              }
            />
          }
        />
        <Route
          path="/snow"
          element={
            <Snow
              time={time}
              setTime={setTime}
              timerOn={timerOn}
              setTimerOn={setTimerOn}
              allowPopup={allowPopup}
              setAllowPopup={setAllowPopup}
              startButtonAndNotificationText={startButtonAndNotificationText}
              setStartButtonAndNotificationText={setStartButtonAndNotificationText}
            />
          }
        />
        <Route
          path="/space"
          element={
            <Space
              time={time}
              setTime={setTime}
              timerOn={timerOn}
              setTimerOn={setTimerOn}
              allowPopup={allowPopup}
              setAllowPopup={setAllowPopup}
              startButtonAndNotificationText={startButtonAndNotificationText}
              setStartButtonAndNotificationText={setStartButtonAndNotificationText}
            />
          }
        />
        <Route
          path="/track"
          element={
            <Track
              time={time}
              setTime={setTime}
              timerOn={timerOn}
              setTimerOn={setTimerOn}
              allowPopup={allowPopup}
              setAllowPopup={setAllowPopup}
              startButtonAndNotificationText={startButtonAndNotificationText}
              setStartButtonAndNotificationText={setStartButtonAndNotificationText}
            />
          }
        />
        <Route path="/leaderboards" element={<Leaderboards />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
