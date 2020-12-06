import "./ChatApp.css";
import React from "react";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import MessageInput from "../MessageInput/MessageInput";
import {useState } from "react";

function ChatApp(props) {

  const [messages, setMessages] = useState([]);
  
  const callbackFunction = (messageInputData) => {
    setMessages(messages.concat(messageInputData));
  }
  
  return (
    <div className="messages">
      <MessagesContainer messages={messages}></MessagesContainer>
      <MessageInput chatAppCallback = {callbackFunction}></MessageInput>       
    </div>
  );
}
export default ChatApp;
