import React from 'react';
import UserMessageBox from './UserMessageBox';
import BotMessageBox from './BotMessageBox.js';
import './UserMessageBox.css';

class MessagesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.createUserMessages = this.createUserMessages.bind(this);
        this.createBotMessages = this.createBotMessages.bind(this);
      }
    
      scrollToBottom = () => {
        var el = this.refs.scroll;
        el.scrollTop = el.scrollHeight;
      }
    
      componentDidMount() {
        this.scrollToBottom();
      }
    
      componentDidUpdate() {
        this.scrollToBottom();
      }
    
      createBotMessages (){

        if(this.props && this.props.messages.length > 0)
        {
            return this.props.messages.map((message, index) =>
               
                <BotMessageBox key={index} botMessage = {message["botMessage"]}/>
            );
        }
      }
      createUserMessages() {
         
          if(this.props && this.props.messages.length > 0)
          {
            return this.props.messages.map((message, index) =>
               
               <UserMessageBox key={index} message={message["message"]}/>
            );
          }
        }
    
      render(){
    
        return(
            <div className="messages" ref="scroll">
                <div>
                    {this.createUserMessages()}
                </div>
                <div>
                    {this.createBotMessages()}
                </div>                
           </div>
        );
      }
}
export default MessagesContainer;