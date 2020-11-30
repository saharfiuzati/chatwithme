import './MessageBox.css';
import Avatar from './Avatar';
import React from 'react';

class MessageBox extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            current_message : ''
        }
      }

    onChange(e) {
        this.setState({
          current_message: e.target.value    
        }); 
        if(e.key === "Enter"){
          // We need to add a new message to MessageContainer component
        }
    }
    render(){
        return (
        <li className={`message ${this.props.appearance} appeared`}>
            <Avatar></Avatar>
            <div className="text_wrapper">
                <div className="text">{this.props.message}</div>
            </div>
        </li>
        )
    }   
}

export default MessageBox;