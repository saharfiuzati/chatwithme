import React from "react";
import "./MessageInput.css";
import BotMessages from "./BotMessages.json";
import {useState } from "react";

function MessageInput(props) {
  
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  // const handleClick =(e) => {
  //   addMessageBox();
  // }

  const OnChange =(e) =>{
    setCurrentMessage(e);
  }

  const _handleKeyDown =(e) =>{
    if (e.key === "Enter") {
      addMessageBox();
    }
  }

  const addMessageBox =(e) => {
    
    let botmessage = BotMessages[Math.floor(Math.random() * BotMessages.length)];

    if (currentMessage) {
      
      setCurrentMessage("");  
      props.chatAppCallback({ message: currentMessage, botMessage: botmessage.message });
    }
    
    console.log(messages);
  }
  
    return (
        
      <div className="message_input_wrapper">
           
        <input
          className="message_input"
          onKeyDown={_handleKeyDown}
          
          value={currentMessage}
          onChange={(e) => OnChange(e.target.value)}
          placeholder="Type your messages here..."
        />
        <button className="send_message">Send</button>
      </div>
    );
  
}
export default MessageInput;
