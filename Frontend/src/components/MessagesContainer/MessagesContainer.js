import React from "react";
import UserMessageBox from "../UserMessageBox/UserMessageBox";
import BotMessageBox from "../BotMessageBox/BotMessageBox";
import "../MessagesContainer/MessagesContainer.css";

function MessagesContainer(props) {

  const createBotMessages = (e) => {
    if (props && props.messages.length > 0) {  
      return props.messages.map((message, index) => (
        <BotMessageBox key={index} botMessage={message["botMessage"]} />
      ));
    }
  };
  const createUserMessages = (e) => {
    if (props && props.messages.length > 0) {
      return props.messages.map((message, index) => (
        <UserMessageBox key={index} message={message["message"]} />
      ));
    }
  };

  return (
    <div className="messages">
      <div>{createUserMessages()}</div>
      <div>{createBotMessages()}</div>
    </div>
  );
}
export default MessagesContainer;
