
import React from 'react';
import './UserMessageBox.css';

class UserMessageBox extends React.Component {
    constructor(props) {
        super(props);
    
      }
      render(){
        return(
            <div className = "container">
                <div className="message-right-appeared">
                    {this.props.message}
                </div>
                <div className="avatar-right-appeared"></div>
            </div>
        );
      }
}
export default UserMessageBox;