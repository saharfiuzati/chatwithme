import React from 'react';
import ReactDOM from 'react-dom';
import UserMessageBox from '../UserMessageBox/UserMessageBox';
import BotMessageBox from '../BotMessageBox/BotMessageBox';
import '../MessagesContainer/MessagesContainer.css';

class MessagesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.createUserMessages = this.createUserMessages.bind(this);
        this.createBotMessages = this.createBotMessages.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
      }
    
      // scrollToBottom = () => {
        
      //   var el = this.refs.scroll;
      //   el.scrollTop = el.scrollHeight;
      //   this.messagesEnd.scrollIntoView({ behavior: "smooth" });

       
      // }
      scrollToBottom = () => {
        
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
      };
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
            <div className="messages" ref={(el) => { this.messagesContainer = el; }}>
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