import "./App.css";
import { React } from "react";
import { Link } from "react-router-dom";
import beach from "./images/waldo-beach.jpeg";
import snow from "./images/waldo-snow.jpeg";
import space from "./images/waldo-space.jpeg";
import track from "./images/waldo-track.jpeg";

function App() {

  return (
    <div>
      <ul className="allLevels">
        <Link to="/beach">
          <li className="beachSmall">
            <img src={beach} alt="Beach"></img>
          </li>
        </Link>
        <Link to="/snow">
          <li className="snowSmall">
            <img src={snow} alt="Snow"></img>
          </li>
        </Link>
        <Link to="/space">
          <li className="spaceSmall">
            <img src={space} alt="Space"></img>
          </li>
        </Link>
        <Link to="/track">
          <li className="trackSmall">
            <img src={track} alt="Track"></img>
          </li>
        </Link>
      </ul>
      <Link to="/leaderboards">
      <button className="leaderboardButton">View Leaderboards</button>
      </Link>
    </div>
  );
}

export default App;
