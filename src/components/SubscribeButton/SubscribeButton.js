import { useState, useEffect } from "react";
import { fetchPutData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { useFlash } from "../../hooks/use-flash-message";
import "./SubscribeButton.css";

const SubscribeButton = ({ subData }) => {
  const auth = useAuth();
  const flash = useFlash();
  const [userSubscribed, setUserSubscribed] = useState(null);

  useEffect(() => {
    const isUserSubscribed = () => {
      if (auth.user.subscriptions.some((sub) => sub === subData._id)) {
        setUserSubscribed(true);
      }
    };
    isUserSubscribed();
  }, [subData, auth.user]);

  const subscribe = async () => {
    try {
      const response = await fetchPutData(
        `http://localhost:3000/api/s/${subData._id}/subscribe`,
        { body: "" },
        auth.token
      );
      if (response.ok) {
        flash.changeMessage(`Now subscribed to ${subData.name}`);
        auth.subscribe(subData._id);
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unsubscribe = async () => {
    try {
      const response = await fetchPutData(
        `http://localhost:3000/api/s/${subData._id}/unsubscribe`,
        { body: "" },
        auth.token
      );
      if (response.ok) {
        flash.changeMessage(`Unsubscribed from ${subData.name}`);
        auth.unsubscribe(subData._id);
      } else {
        console.log("something went wrong");
      }
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
