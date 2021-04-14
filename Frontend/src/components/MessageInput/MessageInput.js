import React from "react";
import "./MessageInput.css";
import { useState } from "react";
import axios from "axios";

function MessageInput(props) {
  const [currentMessage, setCurrentMessage] = useState("");
   
  const handleClick = async (e) => {
    addMessageBox();
  };
  const OnChange = (e) => {
    setCurrentMessage(e);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      addMessageBox();
    }
  };

  const addMessageBox = async (e) => {
    
    if (currentMessage) {
      setCurrentMessage("");
      props.chatAppCallback({
      message: currentMessage,
      });
    }
    
    await axios.post("https://localhost:44359/message" , { FromId: '2e5e4537-d9c8-4283-8957-34d8fcdd7cdc' , ToId: '6b5e4537-d9c8-4283-8957-34d8fcdd8cdc' , Content: currentMessage , CreatedDateTime : new Date()});
     
  };

  return (
    <div className="message_input_wrapper">
      <input
        className="message_input"
        onKeyDown={handleKeyDown}
        value={currentMessage}
        onChange={(e) => OnChange(e.target.value)}
        placeholder="Type your messages here..."
      />
      <button className="send_message" onClick={handleClick}>
        Send
      </button>
    </div>
  );
}
export default MessageInput;
