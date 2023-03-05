import beach from "../images/waldo-beach.jpeg";
import snow from "../images/waldo-snow.jpeg";
import space from "../images/waldo-space.jpeg";
import track from "../images/waldo-track.jpeg";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function Leaderboards() {
  const [beachScores, setBeachScores] = useState(true);
  const [snowScores, setSnowScores] = useState(false);
  const [spaceScores, setSpaceScores] = useState(false);
  const [trackScores, setTrackScores] = useState(false);
  const [currentDisplayScores, setCurrentDisplayScores] = useState([]);
  const [beachDisplay, setBeachDisplay] = useState(true);
  const [spaceDisplay, setSpaceDisplay] = useState(false);
  const [snowDisplay, setSnowDisplay] = useState(false);
  const [trackDisplay, setTrackDisplay] = useState(false);
  const [error, setError] = useState("");

  const allScores = getFirestore();

  //whenever new image is clicked, changing display to show those scores
  useEffect(() => {
    if (beachScores) {
      const beachScoreRef = collection(allScores, "beachScores");
      getDocs(beachScoreRef)
        .then((snapshot) => {
          let scores = [];
          snapshot.docs.forEach((doc) => {
            scores.push({ ...doc.data(), id: doc.id });
          });
          setCurrentDisplayScores(scores);
        })
        .catch((err) => {
          setError(<div>{err.message} Unable to display scores.</div>);
        });

      currentDisplayScores.map((arr) => {
        return (
          <div key={arr.id}>
            <div className="nameAndTime">
              <div>{arr.name}</div>
              <div>{arr.time}</div>
            </div>
          </div>
        );
      });
    } else if (snowScores) {
      const snowScoreRef = collection(allScores, "snowScores");
      getDocs(snowScoreRef)
        .then((snapshot) => {
          let scores = [];
          snapshot.docs.forEach((doc) => {
            scores.push({ ...doc.data(), id: doc.id });
          });
          setCurrentDisplayScores(scores);
        })
        .catch((err) => {
          setError(<div>{err.message} Unable to display scores.</div>);
        });

      currentDisplayScores.map((arr) => {
        return (
          <div key={arr.id}>
            <div className="nameAndTime">
              <div>{arr.name}</div>
              <div>{arr.time}</div>
            </div>
          </div>
        );
      });
    } else if (spaceScores) {
      const spaceScoreRef = collection(allScores, "spaceScores");
      getDocs(spaceScoreRef)
        .then((snapshot) => {
          let scores = [];
          snapshot.docs.forEach((doc) => {
            scores.push({ ...doc.data(), id: doc.id });
          });
          setCurrentDisplayScores(scores);
        })
        .catch((err) => {
          setError(<div>{err.message} Unable to display scores.</div>);
        });

      currentDisplayScores.map((arr) => {
        return (
          <div key={arr.id}>
            <div className="nameAndTime">
              <div>{arr.name}</div>
              <div>{arr.time}</div>
            </div>
          </div>
        );
      });
    } else if (trackScores) {
      const trackScoreRef = collection(allScores, "trackScores");
      getDocs(trackScoreRef)
        .then((snapshot) => {
          let scores = [];
          snapshot.docs.forEach((doc) => {
            scores.push({ ...doc.data(), id: doc.id });
          });
          setCurrentDisplayScores(scores);
        })
        .catch((err) => {
          setError(<div>{err.message} Unable to display scores.</div>);
        });

      currentDisplayScores.map((arr) => {
        return (
          <div key={arr.id}>
            <div className="nameAndTime">
              <div>{arr.name}</div>
              <div>{arr.time}</div>
            </div>
          </div>
        );
      });
    }
  }, [
    beachScores,
    spaceScores,
    snowScores,
    trackScores,
    allScores,
    currentDisplayScores,
  ]);

  //alternate between true and false to change display page
  const changeBoardDisplayToBeach = (e) => {
    setBeachScores(true);
    setSnowScores(false);
    setSpaceScores(false);
    setTrackScores(false);
  };
  const changeBoardDisplayToSnow = () => {
    setBeachScores(false);
    setSnowScores(true);
    setSpaceScores(false);
    setTrackScores(false);
  };
  const changeBoardDisplayToSpace = () => {
    setBeachScores(false);
    setSnowScores(false);
    setSpaceScores(true);
    setTrackScores(false);
  };
  const changeBoardDisplayToTrack = () => {
    setBeachScores(false);
    setSnowScores(false);
    setSpaceScores(false);
    setTrackScores(true);
  };

  useEffect(() => {
    if (beachScores) {
      setBeachDisplay(true);
      setSnowDisplay(false);
      setSpaceDisplay(false);
      setTrackDisplay(false);
    } else if (spaceScores) {
      setSpaceDisplay(true);
      setSnowDisplay(false);
      setBeachDisplay(false);
      setTrackDisplay(false);
    } else if (snowScores) {
      setSnowDisplay(true);
      setBeachDisplay(false);
      setSpaceDisplay(false);
      setTrackDisplay(false);
    } else if (trackScores) {
      setTrackDisplay(true);
      setSnowDisplay(false);
      setSpaceDisplay(false);
      setBeachDisplay(false);
    }
  }, [snowScores, beachScores, spaceScores, trackScores]);

  function sortScores(array) {
    return array.sort(function (a, b) {
      if (a.time < b.time) return -1;
      return 1;
    });
  }

  return (
    <div>
      <ul className="leaderboardDisplay">
        <li className="leaderboardBeach" onClick={changeBoardDisplayToBeach}>
          <img
            src={beach}
            alt="Beach"
            className={beachDisplay ? "shadow" : "no-shadow"}
          ></img>
          <div className="level">Level 1</div>
        </li>
        <li className="leaderboardSnow" onClick={changeBoardDisplayToSnow}>
          <img
            src={snow}
            alt="Snow"
            className={snowDisplay ? "shadow" : "no-shadow"}
          ></img>
          <div className="level">Level 2</div>
        </li>
        <li className="leaderboardSpace" onClick={changeBoardDisplayToSpace}>
          <img
            src={space}
            alt="Space"
            className={spaceDisplay ? "shadow" : "no-shadow"}
          ></img>
          <div className="level">Level 3</div>
        </li>

        <li className="leaderboardTrack" onClick={changeBoardDisplayToTrack}>
          <img
            src={track}
            alt="Track"
            className={trackDisplay ? "shadow" : "no-shadow"}
          ></img>
          <div className="level">Level 4</div>
        </li>
      </ul>
      <div className="boardTitles">
        <div className="leaderboardNameTitle">Name</div>
        <div className="leaderboardTimeTitle">Time</div>
      </div>
      <div className="leaderboardContainer">
        {sortScores(currentDisplayScores).map((arr) => {
          return (
            <div key={arr.id} className="eachNameAndTime">
              <div className="nameAndTime">
                <div>{arr.name}</div>
                <div>{arr.time}</div>
              </div>
            </div>
          );
        })}
        {error}
      </div>
    </div>
  );
}

export default Leaderboards;
