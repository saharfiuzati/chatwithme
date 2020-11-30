import React from 'react';
import '../BotMessageBox/BotMessageBox.css';

class BotMessageBox extends React.Component{
    constructor(props) {
      super(props);
      this.state = 
        {
            botMessage: ''
        }
    }
    componentDidMount() {
        this.setState({ botMessage: false })
        setTimeout(() => {
            this.setState({ botMessage: this.props.botMessage })
          }, 1500)
    }

    sendMessageBot() {
        
        if(this.state.botMessage.length > 0)
        {
            return (
                <div className = "container">
                    <div className="message-left-appeared">
                        {this.state.botMessage}
                    </div>
                    <div className="avatar-left-appeared"></div>
                </div>
            )
        }
    }
    
    render(){
      return(
          <div>
              {this.sendMessageBot()}
          </div>
          
        );
    }
  }

  export default BotMessageBox;