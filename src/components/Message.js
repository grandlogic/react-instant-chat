import React from 'react';

class DynamicButton extends React.Component {
  constructor(props) {
    super(props);
    this.commandSubmitHandler = this.commandSubmitHandler.bind(this);

    //console.log('UXBTN222_parent:' + this.props.routeHandler);
  }

  render() {
    return (<form className="ux-controls" onSubmit={this.commandSubmitHandler} >
                <input type="submit" value={this.props.btnName}/>
            </form>
            );
  }

  commandSubmitHandler(event) {
    event.preventDefault();
    console.log('Event:' + this.props.btnName);
    this.sendMyCommand(this.props.btnName);
  }

  sendMyCommand(message) {
    console.log(message);
    const messageObject = {
      command: message
    };

    // Emit the message to the server
    window.theSocket.emit('client:command', messageObject);
  }
}

class ButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    //const parentContainer=this.props.parentContainer;
  }

  render() {
    console.log('UXBTN111:' + this.props.uxbtns);
    console.log('UXBTN111_parent:' + this.props.parentContainer);

    return (<table>
              <tr>

                {this.props.uxbtns.map(function(uxbtn) { //, index){
                    //return <h1>{uxbtn}</h1>
                    return <td><DynamicButton btnName={uxbtn} /></td>
                  })}

              </tr>
            </table>
            );
  }
}

class Message extends React.Component {
  constructor() {
    super();
    this.state = { command: '' };

    // Bind 'this' to event handlers. React ES6 does not do this by default
    this.commandSubmitHandler = this.commandSubmitHandler.bind(this);
  }

  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'from-me' : '';

    console.log('MESSAGE:' + this.props.message);
    console.log('UXBTN33:' + this.props.uxdyno.uxbtns);

    //<span dangerouslySetInnerHTML={{__html: this.props.ux}}></span>

    if(fromMe == '') //assistant utterance
    {
      return (
        <div className={`message ${fromMe}`}>
          <div className='username'>
            { this.props.username }
          </div>
          <div className='message-body'>
            <span dangerouslySetInnerHTML={{__html: this.props.message}}></span>
          </div>
          <div>
            <span dangerouslySetInnerHTML={{__html: this.props.uxstatic}}></span>
          </div>
          <div>
          <ButtonPanel uxbtns={this.props.uxdyno.uxbtns} parentContainer={this}/>
          </div>
        </div>
      );
    }
    else //user's utterance
    {
      return (
        <div className={`message ${fromMe}`}>
          <div className='username'>
            { this.props.username }
          </div>
          <div className='message-body'>
            <span dangerouslySetInnerHTML={{__html: this.props.message}}></span>
          </div>
        </div>
      );
    }
  }

  commandSubmitHandler(event) {
    event.preventDefault();
    this.sendMyCommand(event.target.value);
  }

  sendMyCommand(message) {
    console.log(message);
    const messageObject = {
      command: message
    };

    // Emit the message to the server
    window.theSocket.emit('client:command', messageObject);
  }
}

Message.defaultProps = {
  ux: '',
  message: '',
  username: '',
  fromMe: false,
  uxdyno: { uxbtns: [] },
  uxstatic: ''
};

export default Message;
