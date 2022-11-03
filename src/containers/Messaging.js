import React, { Component } from 'react';

// Components
import Alert from '../components/Alert';
import CodeBlockDisplay from '../components/CodeBlockDisplay';
import CheckBox from '../components/form/CheckBox';

// Helpers
import { getAccountNumbers, sendMessage, scheduleMessage } from '../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../helpers/utils';

class Messaging extends Component {
  state = {
    accountNumbers: [],
    toNumberValue: '',
    fromNumberValue: '',
    messageBodyValue: '',
    messageSendSubmitted: false,
    messageSendSuccess: false,
    serverResponse: '',
    scheduleMessage: false,
    scheduleDateTime: null,
  };

  async componentDidMount () {
    const accountNumbers = await getAccountNumbers();
    if (accountNumbers.success) {
      this.setState({ accountNumbers: accountNumbers.data });
    }
  }

  onChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleDropdownSelect = e => {
    this.setState({ fromNumberValue: e.target.id });
  }

  handleSchedulerToggle = () => {
    this.setState({ scheduleMessage : !this.state.scheduleMessage });
  }

  handleDateTimePicker = () => {
    console.log('Date time picker fired');
  }

  handleSendMessage = async e => {
    e.preventDefault();
    const { toNumberValue, fromNumberValue, messageBodyValue, scheduleDateTime, scheduleMessage } = this.state;
    let serverResponse;
    if (scheduleMessage) {
      console.log('datetime scheduler ', scheduleDateTime);
      // serverResponse = await scheduleDateTime(messageBodyValue, scheduleDateTime, toNumberValue);
    } else {
      serverResponse = await sendMessage(messageBodyValue, `+1${toNumberValue}`, formatPhoneNumber(fromNumberValue));
    }
    const { success, data } = serverResponse;
    this.setState({
      messageSendSubmitted: true,
      messageSendSuccess: success && data.status !== 400,
      serverResponse: formatJSONResponse(data),
    });
  }

  render() {
    const { accountNumbers, toNumberValue, fromNumberValue, messageBodyValue, serverResponse, messageSendSuccess, scheduleMessage, messageSendSubmitted } = this.state;
    return (
      <div className='container'>
        <h2 className='my-4 mb-5'>
          📱 Messaging Demo
        </h2>
        <div className='row'>
          <div className='col-5'>
            <div className='mb-3'>
              <h3>Message Data Input</h3>
            </div>
            <form onSubmit={this.handleSendMessage}>
              <div className="mb-3">
                <label htmlFor="fromNumberValue" className="form-label">Sender Number</label>
                <div className='input-group mb-3'>
                  <button id='fromNumberValue' className='btn btn-outline-secondary dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">Text Via</button>
                  <ul className="dropdown-menu">
                    {accountNumbers.map((num, i) => <li key={`phone-number-item-${i}`}><a className='dropdown-item' id={num.phoneNumber} onClick={this.handleDropdownSelect}>{num.friendlyName}</a></li>)}
                  </ul>
                  <input type="phonenumber" className="form-control" id="fromNumberValue" aria-describedby="fromNumberHelp" onChange={this.onChange} value={fromNumberValue} />
                </div>
                <div id="fromNumberHelp" className="form-text">Enter the number the message is coming from.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="toNumberValue" className="form-label">Recipient Number</label>
                <input type="phonenumber" className="form-control" id="toNumberValue" aria-describedby="toNumberHelp" onChange={this.onChange} value={toNumberValue} />
                <div id="toNumberHelp" className="form-text">Enter the number to send a message to.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="messageBodyValue" className="form-label">Message</label>
                <textarea type="text" className="form-control" id="messageBodyValue" aria-describedby="messageBodyHelp" onChange={this.onChange} value={messageBodyValue} />
                <div id="messageBodyHelp" className="form-text">Enter your message.</div>
              </div>

              <div className="mb-3">
                <CheckBox
                  id='scheduleMessage'
                  handleCheckChange={this.handleSchedulerToggle}
                  text='Schedule Future Message'
                />
              </div>
              {scheduleMessage ? (
                <div className="mb-3">
                  Scheduler goes here
                </div>
              ) : ''}


              <button type="submit" className="btn btn-primary" onClick={this.handleSendMessage}>Submit</button>
            </form>
            <Alert
              alertType={messageSendSuccess ? 'success' : 'danger'}
              isVisible={messageSendSubmitted}
              styleClasses='mt-3'
              alertText={messageSendSuccess ? `Successfully sent ${scheduleMessage ? 'scheduled ' : ''}message` : 'Error sending message'}
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
