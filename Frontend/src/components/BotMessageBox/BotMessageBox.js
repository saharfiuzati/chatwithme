import React from "react";
import "../BotMessageBox/BotMessageBox.css";
import { useState, useEffect } from "react";

function BotMessageBox(props) {
  const [botMessage, setBotMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setBotMessage(props.botMessage);
    }, 1000);
    return () => timer;
  }, [botMessage]);

  const sendMessageBot = (e) => {
    if (botMessage.length > 0) {
      return (
        <div className="container">
          <div className="message-left-appeared">{botMessage}</div>
          <div className="avatar-left-appeared"></div>
        </div>
      );
    }
  };

  return <div>{sendMessageBot()}</div>;
}

export default BotMessageBox;
