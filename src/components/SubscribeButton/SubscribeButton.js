import { useState, useEffect } from "react";
import { fetchPutData } from "../../api";
import "./SubscribeButton.css";

const SubscribeButton = ({ user, token, subData, updateUser }) => {
  const [userSubscribed, setUserSubscribed] = useState(null);

  useEffect(() => {
    const isUserSubscribed = () => {
      const response = subData.subscribers.some((sub) => sub === user._id);
      setUserSubscribed(response);
    };
    isUserSubscribed();
  }, [subData, user._id]);

  const subscribe = async () => {
    try {
      const response = await fetchPutData(
        `http://localhost:3000/api/s/${subData._id}/subscribe`,
        { body: "" },
        token
      );
      updateUser(response.user);
    } catch (err) {
      console.log(err);
    }
  };

  const unsubscribe = async () => {
    try {
      const response = await fetchPutData(
        `http://localhost:3000/api/s/${subData._id}/unsubscribe`,
        { body: "" },
        token
      );
      updateUser(response.user);
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
            ? "subscribe-button unsubscribe"
            : "subscribe-button subscribe"
        }
      >
        {userSubscribed ? "Joined" : "Join"}
      </button>
    </div>
  );
};

export default SubscribeButton;
