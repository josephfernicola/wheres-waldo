import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import React, {useState} from 'react';
import NavBar from './components/NavBar';
import Beach from './components/Beach';
import Snow from './components/Snow';
import Space from './components/Space';
import Track from './components/Track';
import Leaderboards from './components/Leaderboards';

const RouteSwitch = () => {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false)
    const [allowPopup, setAllowPopup] = useState(false);
  return (
    <BrowserRouter>
    <NavBar time={time} setTime={setTime} timerOn={timerOn} setTimerOn={setTimerOn} allowPopup={allowPopup} setAllowPopup={setAllowPopup}/>
      <Routes>
        <Route path="/wheres-waldo" element={<Home />} />
        <Route path="/beach" element={<Beach time={time} setTime={setTime} timerOn={timerOn} allowPopup={allowPopup} setAllowPopup={setAllowPopup} setTimerOn={setTimerOn}/>} />
        <Route path="/snow" element={<Snow time={time} setTime={setTime} timerOn={timerOn} setTimerOn={setTimerOn} allowPopup={allowPopup} setAllowPopup={setAllowPopup}/>} />
        <Route path="/space" element={<Space time={time} setTime={setTime} timerOn={timerOn} setTimerOn={setTimerOn} allowPopup={allowPopup} setAllowPopup={setAllowPopup}/>} />
        <Route path="/track" element={<Track time={time} setTime={setTime} timerOn={timerOn} setTimerOn={setTimerOn} allowPopup={allowPopup} setAllowPopup={setAllowPopup}/>} />
        <Route path="/leaderboards" element={<Leaderboards />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;