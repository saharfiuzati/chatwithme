import "./ChatApp.css";
import React from "react";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import BotMessages from "./BotMessages.json";

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      current_message: "",
    };
    this.addMessageBox = this.addMessageBox.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  handleClick() {
    this.addMessageBox();
  }

  onChange(e) {
    this.setState({
      current_message: e,
    });
  }
  _handleKeyDown(e) {
    if (e.key === "Enter") {
      this.addMessageBox();
    }
  }

  addMessageBox() {
    let messages = this.state.messages;
    let current_message = this.state.current_message;
    let botmessages =
      BotMessages[Math.floor(Math.random() * BotMessages.length)];

    if (current_message) {
      this.setState({
        messages: [
          ...messages,
          { message: current_message, botMessage: botmessages.message },
        ],
        current_message: "",
      });
    }
    console.log(messages);
  }

  render() {
    return (
      <div className="message_box">
        <MessagesContainer messages={this.state.messages}></MessagesContainer>
        <div className="message_input_wrapper">
          <input
            className="message_input"
            onKeyDown={this._handleKeyDown}
            value={this.state.current_message}
            onChange={(e) => this.onChange(e.target.value)}
            placeholder="Type your messages here..."
          />
          <button className="send_message">Send</button>
        </div>        
      </div>
    );
  }
}

export default ChatApp;
