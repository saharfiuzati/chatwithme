import "./ChatApp.css";
import React from "react";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import MessageInput from "../MessageInput/MessageInput";

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages : []
    }
  }
  callbackFunction = (messageInputData) => {
    this.setState({messages: messageInputData})
  }
  
  render() {
    return (
      <div className="messages">
        <MessagesContainer messages={this.state.messages}></MessagesContainer>
        <MessageInput chatAppCallback = {this.callbackFunction}></MessageInput>       
      </div>
    );
  }
}

export default ChatApp;
