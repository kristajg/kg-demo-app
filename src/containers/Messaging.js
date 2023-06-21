import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

// Components
import Alert from '../components/Alert';
import CodeBlockDisplay from '../components/CodeBlockDisplay';
import CheckBox from '../components/form/CheckBox';
import DropDownMenu from '../components/form/DropDownMenu';
import SimpleSMS from '../components/Message/SimpleSMS';
import MMS from '../components/Message/MMS';

// Helpers
import { getAccountNumbers, getMessagingServices, sendMessage, sendMMS } from '../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../helpers/utils';

class Messaging extends Component {
  state = {
    accountNumbers: [],
    accountMessagingServices: [],
    activeTab: 'sms', // sms, mms, link
    senderMethodTab: 'number', // number, service
    toNumberValue: '',
    fromNumberValue: '',
    fromServiceValue: '',
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
    const messagingServices = await getMessagingServices();
    if (accountNumbers.success) {
      this.setState({ accountNumbers: accountNumbers.data });
    }
    if (messagingServices.success) {
      this.setState({ accountMessagingServices: messagingServices.data });
    }
  }

  onChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  addMedia = e => {
    this.setState({
      mmsFile: e.target.files[0],
    });
  }

  handleSetActiveTab = (tabName, type) => {
    // Bootstrap handles the visal aspects of tab behavior
    // This is to track which tab user is on to ensure the correct submit to API
    // There are two sets of tabs: senderMethod, and messageType
    if (type === 'senderMethod') {
      this.setState({ senderMethodTab: tabName });
    }
    if (type === 'messageType') {
      this.setState({ activeTab: tabName });
    }
  }

  handleDropdownSelect = (e, type) => {
    e.preventDefault();
    if (type === 'fromServiceValue') {
      this.setState({ fromServiceValue: e.target.id });
    } else {
      this.setState({ fromNumberValue: e.target.id });
    }
  }

  handleSchedulerToggle = () => {
    this.setState({ scheduleMessage : !this.state.scheduleMessage });
    // As of the time of this feature creation: scheduled messages MUST come from a Message Service
    this.handleSetActiveTab('service', 'senderMethod');
  }

  handleDateTimeChange = dateTime => this.setState({ dateTime });

  handleSendMessage = async e => {
    e.preventDefault();
    const { activeTab, senderMethodTab, toNumberValue, fromNumberValue, fromServiceValue, messageBodyValue, mmsFile, scheduleMessage, dateTime } = this.state;
    let serverResponse;

    if (activeTab === 'sms') {
      let messageData = {
        to: formatPhoneNumber(toNumberValue),
        body: messageBodyValue,
      };
      if (senderMethodTab === 'number') messageData.from = fromNumberValue;
      if (senderMethodTab === 'service') messageData.messagingServiceSid = fromServiceValue;
      if (scheduleMessage) messageData.sendAt = dateTime.toISOString();
      serverResponse = await sendMessage(messageData);
    } else if (activeTab === 'mms') {
      // TODO: SEND BY NUMBER OR SERVICE
      // TODO: HANDLE SCHEDULED MMS
      const data = new FormData();
      data.append('mmsFile', mmsFile);
      data.append('toNumber', formatPhoneNumber(toNumberValue));

      data.append('fromNumber', fromNumberValue);
      
      data.append('messageBody', messageBodyValue);
      serverResponse = await sendMMS(data);
    } else if (activeTab === 'link') {
      console.log('TODO: link shortening demo');
    }
    const { success, data } = serverResponse;
    this.setState({
      messageSendSubmitted: true,
      messageSendSuccess: success && data.status !== 400,
      serverResponse: formatJSONResponse(data),
    });
  }

  render() {
    const {
      accountNumbers,
      accountMessagingServices,
      toNumberValue,
      fromNumberValue,
      messageBodyValue,
      fromServiceValue,
      serverResponse,
      senderMethodTab,
      messageSendSuccess,
      scheduleMessage,
      messageSendSubmitted,
      dateTime,
    } = this.state;
    return (
      <div className='container'>
        <h2 className='my-4 mb-5'>
          📱 Programmable Messaging
        </h2>
        <div className='row'>
          <div className='col-5'>
            <div className='mb-3'>
              <h3>Input SMS Data</h3>
            </div>
            <form onSubmit={this.handleSendMessage}>
              <div className="form-section mb-2">
                <ul className="nav nav-tabs mb-3" id="senderMethodTab" role="tablist">
                  <li className="nav-item" role="presentation" onClick={(e) => this.handleSetActiveTab('number', 'senderMethod')}>
                    <button className={`nav-link ${senderMethodTab === 'number' ? 'active' : ''}`} id="number-tab" data-bs-toggle="tab" data-bs-target="#number" type="button" role="tab" aria-controls="number" aria-selected="true">
                      Phone Number
                    </button>
                  </li>
                  <li className="nav-item" role="presentation" onClick={(e) => this.handleSetActiveTab('service', 'senderMethod')}>
                    <button className={`nav-link ${senderMethodTab === 'service' ? 'active' : ''}`} id="service-tab" data-bs-toggle="tab" data-bs-target="#service" type="button" role="tab" aria-controls="service" aria-selected="true">
                      Messaging Service
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="senderMethodTabContent">
                  <div className={`tab-pane fade ${senderMethodTab === 'number' ? 'show active' : ''}`} id="number" role="tabpanel" aria-labelledby="number-tab">
                    <DropDownMenu
                      id='fromNumberValue'
                      labelText='Outbound Sender'
                      buttonText='Text Via'
                      inputType='phonenumber'
                      inputOnChange={this.onChange}
                      inputValue={fromNumberValue}
                      listData={accountNumbers}
                      listDataId='phoneNumber'
                      listDataText='friendlyName'
                      handleDropdownSelect={this.handleDropdownSelect}
                      sublabelText='Enter the number the message is coming from'
                      sublabelId='fromNumberHelp'
                    />
                  </div>
                  <div className={`tab-pane fade ${senderMethodTab === 'service' ? 'show active' : ''}`} id="service" role="tabpanel" aria-labelledby="service-tab">
                    <DropDownMenu
                      id='fromServiceValue'
                      labelText='Outbound Service'
                      buttonText='Select Service'
                      inputType='text'
                      inputOnChange={this.onChange}
                      inputValue={fromServiceValue}
                      listData={accountMessagingServices}
                      listDataId='sid'
                      listDataText='friendlyName'
                      handleDropdownSelect={this.handleDropdownSelect}
                      sublabelText='Enter the Messaging Service to send from'
                      sublabelId='fromServiceHelp'
                    />
                  </div>
                </div>
              </div>

              <div className="form-section mb-2">
                <label htmlFor="toNumberValue" className="form-label">Inbound Recipient Number</label>
                <input type="phonenumber" className="form-control" id="toNumberValue" aria-describedby="toNumberHelp" onChange={this.onChange} value={toNumberValue} />
                <div id="toNumberHelp" className="form-text">Enter the number to send a message to</div>
              </div>

              <div className='form-section big-form-section mb-2'>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation" onClick={(e) => this.handleSetActiveTab('sms', 'messageType')}>
                    <button className="nav-link active" id="sms-tab" data-bs-toggle="tab" data-bs-target="#sms" type="button" role="tab" aria-controls="sms" aria-selected="true">
                      SMS
                    </button>
                  </li>
                  <li className="nav-item" role="presentation" onClick={(e) => this.handleSetActiveTab('mms', 'messageType')}>
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                      MMS
                    </button>
                  </li>
                  <li className="nav-item" role="presentation"  onClick={(e) => this.handleSetActiveTab('link', 'messageType')}>
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
                <div className="mb-2">
                  <CheckBox
                    id='scheduleMessage'
                    handleCheckChange={this.handleSchedulerToggle}
                    text='Schedule Future Message'
                  />
                </div>
                {scheduleMessage && (
                  <DatePicker
                    minDate={new Date()}
                    selected={dateTime}
                    onChange={date => this.handleDateTimeChange(date)}
                    showPopperArrow={false}
                    timeInputLabel='Time:'
                    dateFormat='MM/dd/yyyy h:mm aa'
                    showTimeInput
                  />
                )}
              </div>
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
