import React from "react";
import UserMessageBox from "../UserMessageBox/UserMessageBox";
import BotMessageBox from "../BotMessageBox/BotMessageBox";
import "../MessagesContainer/MessagesContainer.css";

function MessagesContainer(props) {
  
  const createMessages = (e) => {
    if (props && props.messages.length > 0) {
      return props.messages.map((message, index) => (
        <div>
          <UserMessageBox key={index} message={message["message"]} />
          <BotMessageBox key={index} botMessage={message["botMessage"]} />
        </div>
      ));
    }
  };

  return (
    <div className="messages">
      {createMessages()}
    </div>
  );
}
export default MessagesContainer;
