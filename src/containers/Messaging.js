import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

// Components
import Alert from '../components/Alert';
import CodeBlockDisplay from '../components/CodeBlockDisplay';
import CheckBox from '../components/form/CheckBox';

// Helpers
import { getAccountNumbers, sendMessage, sendScheduleMessage } from '../helpers/apiHelpers';
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
    dateTime: new Date(),
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

  handleDateTimeChange = dateTime => {
    this.setState({ dateTime });
  }

  handleSendMessage = async e => {
    e.preventDefault();
    const { toNumberValue, fromNumberValue, messageBodyValue, dateTime, scheduleMessage } = this.state;
    let serverResponse;
    if (scheduleMessage) {
      serverResponse = await sendScheduleMessage(messageBodyValue, dateTime, formatPhoneNumber(toNumberValue));
    } else {
      serverResponse = await sendMessage(messageBodyValue, formatPhoneNumber(toNumberValue), formatPhoneNumber(fromNumberValue));
    }
    const { success, data } = serverResponse;
    this.setState({
      messageSendSubmitted: true,
      messageSendSuccess: success && data.status !== 400,
      serverResponse: formatJSONResponse(data),
    });
  }

  render() {
    const { accountNumbers, toNumberValue, fromNumberValue, messageBodyValue, serverResponse, messageSendSuccess, scheduleMessage, messageSendSubmitted, dateTime } = this.state;
    return (
      <div className='container'>
        <h2 className='my-4 mb-5'>
          📱 Messaging Demo
        </h2>
        <div className='row'>
          <div className='col-5'>
            <div className='mb-3'>
              <h3>Input SMS Data</h3>
            </div>
            <form onSubmit={this.handleSendMessage}>
              <div className="mb-4">
              {scheduleMessage ? (
                <label>Scheduled Messages are sent from a Messaging Service</label>
              ) : (
                <>
                  <label htmlFor="fromNumberValue" className="form-label">Outbound Sender Number</label>
                  <div className='input-group mb-1'>
                    <button id='fromNumberValue' className='btn btn-outline-secondary dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">Text Via</button>
                    <ul className="dropdown-menu">
                      {accountNumbers.map((num, i) => <li key={`phone-number-item-${i}`} style={{ cursor: 'pointer' }}><a className='dropdown-item' id={num.phoneNumber} onClick={this.handleDropdownSelect}>{num.friendlyName}</a></li>)}
                    </ul>
                    <input type="phonenumber" className="form-control" id="fromNumberValue" aria-describedby="fromNumberHelp" onChange={this.onChange} value={fromNumberValue} />
                  </div>
                  <div id="fromNumberHelp" className="form-text">Enter the number the message is coming from</div>                
                </>
              )}
              </div>
              <div className="mb-4">
                <label htmlFor="toNumberValue" className="form-label">Inbound Recipient Number</label>
                <input type="phonenumber" className="form-control" id="toNumberValue" aria-describedby="toNumberHelp" onChange={this.onChange} value={toNumberValue} />
                <div id="toNumberHelp" className="form-text">Enter the number to send a message to</div>
              </div>
              <div className="mb-3">
                <label htmlFor="messageBodyValue" className="form-label">Message</label>
                <textarea type="text" className="form-control" id="messageBodyValue" aria-describedby="messageBodyHelp" onChange={this.onChange} value={messageBodyValue} />
                <div id="messageBodyHelp" className="form-text">Enter your message</div>
              </div>

              <div className="mb-4">
                <CheckBox
                  id='scheduleMessage'
                  handleCheckChange={this.handleSchedulerToggle}
                  text='Schedule Future Message'
                />
              </div>
              {scheduleMessage ? (
                <div className="mb-4">
                  <DatePicker
                    minDate={new Date()}
                    selected={dateTime}
                    onChange={date => this.handleDateTimeChange(date)}
                    showPopperArrow={false}
                    timeInputLabel='Time:'
                    dateFormat='MM/dd/yyyy h:mm aa'
                    showTimeInput
                  />
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
