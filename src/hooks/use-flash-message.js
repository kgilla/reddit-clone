import React, { useState, useEffect, useContext, createContext } from "react";

const flashContext = createContext();

export function ProvideFlash({ children }) {
  const flash = useProvideFlash();
  return (
    <flashContext.Provider value={flash}>{children}</flashContext.Provider>
  );
}

export const useFlash = () => {
  return useContext(flashContext);
};

function useProvideFlash() {
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const changeMessage = (newMessage) => {
    setMessage(newMessage);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  // useEffect(() => {

  // }, [message, showMessage]);

  return {
    message,
    showMessage,
    changeMessage,
  };
}
