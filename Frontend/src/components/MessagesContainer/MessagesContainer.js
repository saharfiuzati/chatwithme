import React from "react";
import "../MessagesContainer/MessagesContainer.css";
import { useState, useEffect } from "react";
import * as Firebase from "../App/Firebase/Firebase";
import MessageShower from "../App/MessageShower/MessageShower";

function MessagesContainer(props) {
  
const [Messages, setMessages] = useState([]);
  
  useEffect(async () => {
    const unsubscribe = Firebase.streamMessages( {
        next: querySnapshot => {
            const updatedMessages = 
                querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                setMessages(updatedMessages);
        },
    });
    
    return unsubscribe;
}, [setMessages]);

  const leveledUpMessages = Messages.map((a, i) => <MessageShower key={i} message = {a}></MessageShower>);
   
debugger
  if(Messages !== undefined && Messages.length > 0) {
    return (
      <div>
        {leveledUpMessages}
      </div>
      
    );
  }

  else{
    return (
      <div>
      </div>
    )
  }

}

export default MessagesContainer;
