import React from "react";
import "./MessageInput.css";
import { useState, useEffect } from "react";
import axios from "axios";

function MessageInput(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [botMessages, setBotMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get("https://localhost:44359/botmessages");
      setBotMessages(result.data);
    })();
  }, []);

  const handleClick = (e) => {
    addMessageBox();
  };
  const OnChange = (e) => {
    setCurrentMessage(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addMessageBox();
    }
  };

  const addMessageBox = (e) => {
    let botmessage =
      botMessages[Math.floor(Math.random() * botMessages.length)];
    if (currentMessage) {
      setCurrentMessage("");
      props.chatAppCallback({
        message: currentMessage,
        botMessage: botmessage,
      });
    }
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
