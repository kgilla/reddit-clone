import { ArrowUp, ArrowDown } from "@styled-icons/entypo";
import { useState } from "react";
import "./Score.css";
import { useAuth } from "../../hooks/use-auth";

const Score = ({ score, item, type, handleChoice }) => {
  const auth = useAuth();
  const [choice, setChoice] = useState(
    auth.user ? localStorage.getItem(item._id) : null
  );

  const handleClick = (e) => {
    const t = e.currentTarget.name;
    let increment = 0;
    if (choice && choice === t) {
      increment = t === "up" ? -1 : 1;
      changeChoice(null, increment);
    } else {
      if (choice && choice !== t) {
        increment = t === "up" ? 2 : -2;
      } else {
        increment = t === "up" ? 1 : -1;
      }
      changeChoice(t, increment);
    }
  };

  const changeChoice = (t, increment) => {
    setChoice(t);
    t === null
      ? localStorage.removeItem(item._id)
      : localStorage.setItem(item._id, t);
    handleChoice(t, increment);
  };

  return (
    <div className={type === "post" ? "post-score-box" : "score-box"}>
      <button
        name="up"
        onClick={auth.user ? handleClick : null}
        className="invis-button"
      >
        <ArrowUp
          className="score-arrow up-arrow"
          style={choice === "up" ? { color: "var(--orange)" } : null}
        />
      </button>
      {type === "post" ? <span className="score-number">{score}</span> : null}
      <button
        name="down"
        onClick={auth.user ? handleClick : null}
        className="invis-button"
      >
        <ArrowDown
          className="score-arrow down-arrow"
          style={choice === "down" ? { color: "var(--blue)" } : null}
        />
      </button>
    </div>
  );
};

export default Score;
