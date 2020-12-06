import React from "react";
import ReactDOM from "react-dom";
import UserMessageBox from "../UserMessageBox/UserMessageBox";
import BotMessageBox from "../BotMessageBox/BotMessageBox";
import "../MessagesContainer/MessagesContainer.css";
import { useEffect } from "react";

function MessagesContainer(props) {
  
  const scrollToBottom = (e) => {
    // const messagesContainer = ReactDOM.findDOMNode(MessagesContainer);
    // messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };
  
  useEffect(()=>{
    scrollToBottom();
  },[])

  const createBotMessages = (e) => {
    if (props && props.messages.length > 0) {
      return props.messages.map((message, index) => (
        <BotMessageBox key={index} botMessage={message["botMessage"]} />
      ));
    }
  }
  const createUserMessages = (e) =>  {
    if (props && props.messages.length > 0) {
      return props.messages.map((message, index) => (
        <UserMessageBox key={index} message={message["message"]} />
      ));
    }
  }
 
  return (
    <div
      className="messages"      
    >
      <div>{createUserMessages()}</div>
      <div>{createBotMessages()}</div>
    </div>
  );
  
}
export default MessagesContainer;
