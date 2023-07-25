import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// Components
import Alert from '../../Alert';
import CodeBlockDisplay from '../../CodeBlockDisplay';
import { CallForm } from './CallForm';
import { CallInProgress } from './CallInProgress';
import { CallSummary } from './CallSummary';

// Helpers
import { postRequest } from '../../../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../../../helpers/utils';

// Assets
import { ROUTES } from '../../../assets/constants/routeConstants';

const client = new W3CWebSocket('ws://localhost:8009');

class PlaceCall extends Component {
  state = {
    accountNumbers: [],
    callStatus: '', // from Twilio API, options: initiated, ringing, answered, completed
    callFormStatus: 'ready', // options: ready, inProgress, summary
    callSID: '',
    toNumberValue: '',
    fromNumberValue: '',
    recordCall: false,
    transcribeCall: false,
    serverResponse: '', 
    serverError: false,
    websocketConnectionReady: false,
    callSummaryData: {
      duration: '',
    },
  };

  async componentDidMount () {
    const accountNumbers = await postRequest(ROUTES.GET_ACCOUNT_NUMBERS);

    if (accountNumbers.success) {
      this.setState({ accountNumbers: accountNumbers.data });
    } else {
      this.setState({ serverError: true });
    }

    // Ensure websocket is open before placing call
    if (client.readyState === 1) {
      this.setState({ websocketConnectionReady: true });
    }

    // Receive call data from server when voice statusCallback is hit
    client.onmessage = (message) => {
      this.setCallStatusDataFromWebsocket(message);
    };
  }

  onChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handlePlaceCall = async e => {
    e.preventDefault();
    const { toNumberValue, fromNumberValue, recordCall, transcribeCall } = this.state;
    const placeCallResponse = await postRequest(ROUTES.PLACE_CALL, {
      to: `+1${toNumberValue}`,
      from: formatPhoneNumber(fromNumberValue),
      recordCall,
      transcribeCall,
    });
    const { success, data } = placeCallResponse;
    this.setState({
      callSID: data.sid,
      callFormStatus: 'inProgress',
      serverResponse: formatJSONResponse(data),
      serverError: !success || data.status === 400,
    });
  }

  handleEndCall = async () => {
    const twiml = '<Response><Hangup/></Response>';
    const response = await postRequest(ROUTES.UPDATE_IN_PROGRESS_CALL, { callSID: this.state.callSID, twiml });
    const { success, data } = response;
    this.setState({
      serverResponse: formatJSONResponse(data),
      serverError: !success || data.status === 400,
    });
  }

  setCallStatusDataFromWebsocket = message => {
    const { data } = message;
    let parsedData = JSON.parse(data);
    let newCallFormStatus = this.state.callFormStatus;
    if (parsedData.CallStatus === 'initiated') {
      newCallFormStatus = 'inProgress';
    }
    if (parsedData.CallStatus === 'completed') {
      newCallFormStatus = 'summary';
      this.setCallSummaryData(parsedData);
    }
    this.setState({
      callFormStatus: newCallFormStatus,
      callStatus: parsedData.CallStatus,
      serverResponse: formatJSONResponse(parsedData),
    });
  }

  resetPlaceCall = () => {
    this.setState({
      callStatus: '',
      callFormStatus: 'ready',
      callSID: '',
      recordCall: false,
      transcribeCall: false,
      toNumberValue: '',
      fromNumberValue: '',
      serverResponse: '',
      serverError: false,
    })
  }

  handleDropdownSelect = e => {
    e.preventDefault();
    this.setState({ fromNumberValue: e.target.id });
  }

  handleCheckboxToggle = e => {
    if (e.target.id === 'recordCallCheck') {
      this.setState({ recordCall: !this.state.recordCall });
    } else if (e.target.id === 'transcribeCallCheck') {
      this.setState({ transcribeCall: !this.state.transcribeCall });
    }
  }

  renderCallHeader = () => {
    const { callFormStatus } = this.state;
    let text = 'Input Call Data'
    if (callFormStatus === 'inProgress') {
      text = 'Call in Progress';
    }
    if (callFormStatus === 'summary') {
      text = 'Call Summary';
    }
    return (<h3>{text}</h3>);
  }

  setCallSummaryData = data => {
    this.setState({
      callSummaryData: {
        duration: data.Duration,
      },
    });
  }

  render() {
    const {
      accountNumbers,
      callStatus,
      callFormStatus,
      fromNumberValue,
      serverResponse,
      serverError,
      toNumberValue,
      websocketConnectionReady,
      callSummaryData,
    } = this.state;
    return (
      <div className='row'>
        <div className='col-5'>
          <div className='mb-3'>
            {this.renderCallHeader()}
          </div>
          {callFormStatus === 'ready' && (
            <CallForm
              accountNumbers={accountNumbers}
              handlePlaceCall={this.handlePlaceCall}
              handleDropdownSelect={this.handleDropdownSelect}
              handleCheckboxToggle={this.handleCheckboxToggle}
              onChange={this.onChange}
              toNumberValue={toNumberValue}
              fromNumberValue={fromNumberValue}
              websocketConnectionReady={websocketConnectionReady}
            />            
          )}
          {callFormStatus === 'inProgress' && (
            <CallInProgress
              handleEndCall={this.handleEndCall}
              callStatus={callStatus}
              setCallStatusDataFromWebsocket={this.setCallStatusDataFromWebsocket}
            />
          )}
          {callFormStatus === 'summary' && (
            <CallSummary
              resetPlaceCall={this.resetPlaceCall}
              callSummaryData={callSummaryData}
            />
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
