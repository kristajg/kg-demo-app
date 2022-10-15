import React, { Component } from 'react';

// Components
import Alert from '../components/Alert';
import CodeBlockDisplay from '../components/CodeBlockDisplay';

// Helpers
import { sendMessage } from '../helpers/apiHelpers';
import { formatResponse } from '../helpers/utils';

class Messaging extends Component {
  state = {
    toNumberValue: '',
    fromNumberValue: '',
    messageBodyValue: '',
    messageSendSubmitted: false,
    messageSendSuccess: false,
    serverResponse: '',
  };

  onChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleSendMessage = async e => {
    e.preventDefault();
    const { toNumberValue, fromNumberValue, messageBodyValue } = this.state;
    const sendMessageResponse = await sendMessage(messageBodyValue, `+1${toNumberValue}`, `+1${fromNumberValue}` );
    const { success, data } = sendMessageResponse;
    this.setState({
      messageSendSubmitted: true,
      messageSendSuccess: success && data.status !== 400,
      serverResponse: formatResponse(data),
    });
  }

  render() {
    const { toNumberValue, fromNumberValue, messageBodyValue, serverResponse, messageSendSuccess, messageSendSubmitted } = this.state;

    return (
      <div className='container'>
        <h2 className='my-4 mb-5'>
          Messaging Demo
        </h2>
        <div className='row'>
          <div className='col-5'>
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
            <Alert
              alertType={messageSendSuccess ? 'success' : 'danger'}
              isVisible={messageSendSubmitted}
              styleClasses='mt-3'
              alertText={messageSendSuccess ? 'Successfully sent message' : 'Error sending message'}
            />
          </div>
          <div className='col-7'>
            <div className='mb-5'>
              <h3>Twilio API Response</h3>
            </div>
            <CodeBlockDisplay code={serverResponse} />
          </div>
        </div>
      </div>
    );
  }
}

export default Messaging;
