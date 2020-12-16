import { useState, useEffect } from "react";
import { fetchPutData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import "./SubscribeButton.css";

const SubscribeButton = ({ subData }) => {
  const auth = useAuth();
  const [userSubscribed, setUserSubscribed] = useState(null);

  useEffect(() => {
    const isUserSubscribed = () => {
      const response = subData.subscribers.some((sub) => sub === auth.user._id);
      setUserSubscribed(response);
    };
    isUserSubscribed();
  }, [subData, auth.user._id]);

  const subscribe = async () => {
    try {
      await fetchPutData(
        `http://localhost:3000/api/s/${subData._id}/subscribe`,
        { body: "" },
        auth.token
      );
    } catch (err) {
      console.log(err);
    }
  };

  const unsubscribe = async () => {
    try {
      await fetchPutData(
        `http://localhost:3000/api/s/${subData._id}/unsubscribe`,
        { body: "" },
        auth.token
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    changeSubscription();
  };

  const handleMouseOver = (e) => {
    e.target.textContent = userSubscribed ? "Leave" : "Join?";
  };

  const handleMouseLeave = (e) => {
    e.target.textContent = userSubscribed ? "Joined" : "Join";
  };

  const changeSubscription = async () => {
    if (userSubscribed) {
      setUserSubscribed(false);
      await unsubscribe();
    } else {
      setUserSubscribed(true);
      await subscribe();
    }
  };

  return (
    <div className="subscribe-button-container">
      <button
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={
          userSubscribed
            ? "button-outline subscribe-button"
            : "button-filled subscribe-button"
        }
      >
        {userSubscribed ? "Joined" : "Join"}
      </button>
    </div>
  );
};

export default SubscribeButton;
