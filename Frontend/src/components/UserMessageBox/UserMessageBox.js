
import React from 'react';
import './UserMessageBox.css';

function UserMessageBox(props) {
          
    return(
        <div className = "container">
            <div className="message-right-appeared">
                {props.message}
            </div>
            <div className="avatar-right-appeared"></div>
        </div>
    );
}
export default UserMessageBox;