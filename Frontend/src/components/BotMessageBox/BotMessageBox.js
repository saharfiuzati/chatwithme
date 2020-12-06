import React from "react";
import "../BotMessageBox/BotMessageBox.css";
import { useState } from "react";

function BotMessageBox(props) {
    
  const [botMessage] = useState(props.botMessage);

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
