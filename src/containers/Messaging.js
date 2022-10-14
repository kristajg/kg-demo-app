import React, { Component } from 'react';

// Helpers
import { sendMessage } from '../helpers/apiHelpers';

class Messaging extends Component {
  state = {
    toNumberValue: '',
    fromNumberValue: '',
    messageBodyValue: '',
    messageSendSubmitted: false,
    messageSendSuccess: false,
  };

  onChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
    console.log('this.state ', this.state);
  };

  handleSendMessage = async e => {
    e.preventDefault();
    const { toNumberValue, fromNumberValue, messageBodyValue } = this.state;
    const sendMessageResponse = await sendMessage(messageBodyValue, `+1${toNumberValue}`, `+1${fromNumberValue}` );
    console.log('sendMessageResponse - ', sendMessageResponse);
    // TODO: anything to set in state here with verificationResponse?
    // TODO: error handle here
    this.setState({ messageSendSubmitted: true });
  }

  render() {
    const { toNumberValue, fromNumberValue, messageBodyValue, messageSendSuccess } = this.state;

    return (
      <div className='container'>
        <h2 className='my-4'>
          Messaging Demo
        </h2>
        {/* {messageSendSubmitted ? (
          <form onSubmit={this.handleVerificationCodeSubmit}>
            <div className="mb-3">
              <label htmlFor="verifyCodeInput" className="form-label">Authentication Code</label>
              <input type="text" className="form-control" id="verifyCodeInput" aria-describedby="verificationHelp" onChange={this.onChange} value={verifyCodeValue} />
              <div id="verificationHelp" className="form-text">Enter the verification code sent via SMS.</div>
            </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        ) : ( */}
          <form onSubmit={this.handleSendMessage}>
            <div className="mb-3">
              <label htmlFor="toNumberValue" className="form-label">To Phone Number</label>
              <input type="phonenumber" className="form-control" id="toNumberValue" aria-describedby="toNumberHelp" onChange={this.onChange} value={toNumberValue} />
              <div id="toNumberHelp" className="form-text">Enter the number to send a message to.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="fromNumberValue" className="form-label">From Phone Number</label>
              <input type="phonenumber" className="form-control" id="fromNumberValue" aria-describedby="fromNumberHelp" onChange={this.onChange} value={fromNumberValue} />
              <div id="fromNumberHelp" className="form-text">Enter the number the message is coming from.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="messageBodyValue" className="form-label">Message to Send</label>
              <input type="text" className="form-control" id="messageBodyValue" aria-describedby="messageBodyHelp" onChange={this.onChange} value={messageBodyValue} />
              <div id="messageBodyHelp" className="form-text">Enter your message.</div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={this.handlePhoneNumberSubmit}>Submit</button>
          </form>
        {/* )} */}



        {/* {messageSendSuccess ? (
          <div className={`alert alert-${verifyStatus === 'approved' ? 'success' : 'danger'} mt-3`} role='alert'>
            {verifyStatus === 'approved' ? 'Successfully sent message' : 'Error sending message'}
          </div>
        ) : (<></>)} */}
      </div>
    );
  }
}

export default Messaging;
