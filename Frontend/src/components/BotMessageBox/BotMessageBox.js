import React from "react";
import "../BotMessageBox/BotMessageBox.css";
import { useState, useEffect } from "react";
import * as Firebase from "../App/Firebase/Firebase";

function BotMessageBox(props) {

  const [botMessage, setBotMessage] = useState([]);
  
  useEffect(async () => {
    const unsubscribe = Firebase.streamMessages( {
        next: querySnapshot => {
            const updatedMessages = 
                querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                console.log(updatedMessages);
                setBotMessage(updatedMessages);
        },
    });
    
    return unsubscribe;
}, [setBotMessage]);

  const messages = botMessage
        .map((a, i) => <div key={i}>{a.Content}</div>);

  const sendMessageBot  = (e)=> {
    
    if (messages !== undefined && messages.length > 0) {
      return (
        <div className="container">
          <div className="message-left-appeared">{messages}</div>
          <div className="avatar-left-appeared"></div>
        </div>
      );
    }
    return (
      <div className="container">
      </div>
    );
  };

  return <div>{sendMessageBot()}</div>;
}

export default BotMessageBox;
