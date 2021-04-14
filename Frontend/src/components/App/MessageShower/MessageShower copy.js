import React from "react";
import "../MessageShower/MessageShower.css";

function MessageShower(props){

    const message = props.message;

    if(message.ToUserId == '6e5e4537-d9c8-4283-8957-34d8fcdd7cdc')

        return <div className="container">
        <div className="message-left-appeared">{message.Content}</div>
        <div className="avatar-left-appeared"></div>
      </div>

    if(message.FromUserId == '6e5e4537-d9c8-4283-8957-34d8fcdd7cdc')

        return <div className="container">
        <div className="message-right-appeared">{message.Content}</div>
        <div className="avatar-right-appeared"></div>
    </div>  
}

export default MessageShower;