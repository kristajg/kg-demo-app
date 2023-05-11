import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

// Components
import Alert from '../components/Alert';
import CodeBlockDisplay from '../components/CodeBlockDisplay';
import CheckBox from '../components/form/CheckBox';
import SimpleSMS from '../components/Message/SimpleSMS';
import MMS from '../components/Message/MMS';

// Helpers
import { getAccountNumbers, sendSMS, sendMMS, sendScheduleMessage } from '../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../helpers/utils';

class Messaging extends Component {
  state = {
    accountNumbers: [],
    activeTab: 'sms', 
    toNumberValue: '',
    fromNumberValue: '',
    messageBodyValue: '',
    messageSendSubmitted: false,
    messageSendSuccess: false,
    mmsFile: {},
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
  }

  addMedia = e => {
    console.log('file be like ', e.target.files[0]);
    this.setState({
      mmsFile: e.target.files[0],
    });
  }

  handleSetActiveTab = tabName => {
    // Bootstrap handles the visal aspects of tab behavior
    // This is to track which tab user is on to ensure the correct submit to API
    this.setState({ activeTab: tabName });
  }

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
    const { activeTab, toNumberValue, fromNumberValue, messageBodyValue, dateTime, mmsFile, scheduleMessage } = this.state;
    let serverResponse;
    if (scheduleMessage) {
      serverResponse = await sendScheduleMessage(messageBodyValue, dateTime, formatPhoneNumber(toNumberValue));
    } else if (activeTab === 'mms') {
      const data = new FormData();
      data.append('mmsFile', mmsFile);
      data.append('toNumber', toNumberValue);
      data.append('fromNumber', fromNumberValue);
      data.append('messageBody', messageBodyValue);
      serverResponse = await sendMMS(data);
    } else {
      serverResponse = await sendSMS(messageBodyValue, formatPhoneNumber(toNumberValue), formatPhoneNumber(fromNumberValue));
    }
    const { success, data } = serverResponse;
    // TODO: RESET FORM LIKE IN VERIFY!!
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
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation" onClick={(e) => this.handleSetActiveTab('sms')}>
                  <button className="nav-link active" id="sms-tab" data-bs-toggle="tab" data-bs-target="#sms" type="button" role="tab" aria-controls="sms" aria-selected="true">
                    SMS
                  </button>
                </li>
                <li className="nav-item" role="presentation" onClick={(e) => this.handleSetActiveTab('mms')}>
                  <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                    MMS
                  </button>
                </li>
                <li className="nav-item" role="presentation"  onClick={(e) => this.handleSetActiveTab('link')}>
                  <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Link Shortening</button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="sms" role="tabpanel" aria-labelledby="sms-tab">
                  <SimpleSMS
                    onChange={this.onChange}
                    messageBodyValue={messageBodyValue}
                  />
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <MMS
                    addMedia={this.addMedia}
                    onChange={this.onChange}
                    messageBodyValue={messageBodyValue}
                  />
                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                  Link shortening example goes here
                </div>
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
