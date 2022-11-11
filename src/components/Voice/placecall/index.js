import React, { Component } from 'react';

// Components
import Alert from '../../Alert';
import CodeBlockDisplay from '../../CodeBlockDisplay';
import { CallForm } from './CallForm';
import { CallInProgress } from './CallInProgress';
import { CallSummary } from './CallSummary';

// Helpers
import { getAccountNumbers, placeVoiceCall, updateInProgressCall } from '../../../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../../../helpers/utils';

class PlaceCall extends Component {
  state = {
    accountNumbers: [],
    callStatus: 'ready', // options are: ready, inProgress, summary
    callSID: '',
    toNumberValue: '',
    fromNumberValue: '',
    serverResponse: '', 
    serverError: false,
  };

  async componentDidMount () {
    const accountNumbers = await getAccountNumbers();
    if (accountNumbers.success) {
      this.setState({ accountNumbers: accountNumbers.data });
    } else {
      this.setState({ serverError: true });
    }
  }

  onChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handlePlaceCall = async e => {
    e.preventDefault();
    const { toNumberValue, fromNumberValue } = this.state;
    const placeCallResponse = await placeVoiceCall(`+1${toNumberValue}`, formatPhoneNumber(fromNumberValue));
    const { success, data } = placeCallResponse;
    this.setState({
      callSID: data.sid,
      callStatus: 'inProgress',
      serverResponse: formatJSONResponse(data),
      serverError: !success || data.status === 400,
    });
  }

  // TODO: rename function handle end call from outbound
  handleEndCall = async () => {
    const hangupTwiml = '<Response><Hangup/></Response>';
    const response = await updateInProgressCall(this.state.callSID, hangupTwiml);
    const { success, data } = response;
    console.log('um ok ', data);
    this.setState({
      callStatus: 'summary',
      serverResponse: formatJSONResponse(data),
      serverError: !success || data.status === 400,
    });
  }

  // TODO: rename this function to something that makes more sense
  setCallStatusDataFromWebsocket = (data) => {
    // This should get hit when call status changes via statusCallback
    // TODO: dont set callStatus to summary unless the call is completed
    // ----  should be accessible from data.CallStatus === 'completed'
    // ----  will also need to de-stringify data json
    console.log('set call status hit ', data);
    let parsedData = JSON.parse(data);
    console.log('parsed data! ', parsedData);

    this.setState({
      callStatus: 'summary',
      serverResponse: formatJSONResponse(parsedData),
    })
  }

  resetPlaceCall = () => {
    this.setState({
      callStatus: 'ready',
      callSID: '',
      toNumberValue: '',
      fromNumberValue: '',
      serverResponse: '',
      serverError: false,
    })
  }

  handleDropdownSelect = e => {
    this.setState({ fromNumberValue: e.target.id });
  }

  renderCallHeader = () => {
    const { callStatus } = this.state;
    let text = 'Call Data Input'
    if (callStatus === 'inProgress') {
      text = 'Call in Progress';
    }
    if (callStatus === 'summary') {
      text = 'Call Summary';
    }
    return (<h3>{text}</h3>);
  }

  render() {
    const {
      accountNumbers,
      callStatus,
      fromNumberValue,
      serverResponse,
      serverError,
      toNumberValue,
    } = this.state;
    return (
      <div className='row'>
        <div className='col-5'>
          <div className='mb-3'>
            {this.renderCallHeader()}
          </div>
          {callStatus === 'ready' && (
            <CallForm
              accountNumbers={accountNumbers}
              handlePlaceCall={this.handlePlaceCall}
              handleDropdownSelect={this.handleDropdownSelect}
              onChange={this.onChange}
              toNumberValue={toNumberValue}
              fromNumberValue={fromNumberValue}
            />            
          )}
          {callStatus === 'inProgress' && (
            <CallInProgress
              handleEndCall={this.handleEndCall}
              setCallStatusDataFromWebsocket={this.setCallStatusDataFromWebsocket}
            />
          )}
          {callStatus === 'summary' && (
            <CallSummary resetPlaceCall={this.resetPlaceCall} />
          )}
          <Alert
            alertType='danger'
            isVisible={serverError}
            styleClasses='mt-3'
            alertText='Server Response Error'
          />
        </div>
        <div className='col-7'>
          <div className='mb-5'>
            <h3>Twilio API Response</h3>
          </div>
          <CodeBlockDisplay code={serverResponse} />
        </div>
      </div>        
    );
  }
}

export default PlaceCall;
