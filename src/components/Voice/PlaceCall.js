import React, { Component } from 'react';

// Components
import Alert from '../../components/Alert';
import CodeBlockDisplay from '../../components/CodeBlockDisplay';

// Helpers
import { getAccountNumbers, placeVoiceCall } from '../../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../../helpers/utils';

class PlaceCall extends Component {
  state = {
    accountNumbers: [],
    toNumberValue: '',
    fromNumberValue: '',
    placeCallSubmitted: false,
    placeCallSuccess: false,
    serverResponse: '',
  };

  async componentDidMount () {
    const accountNumbers = await getAccountNumbers();
    if (accountNumbers.success) {
      this.setState({ accountNumbers: accountNumbers.data });
    }
  }

  onChange = e => {
    // TODO: add form validation
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handlePlaceCall = async e => {
    e.preventDefault();
    const { toNumberValue, fromNumberValue } = this.state;
    const placeCallResponse = await placeVoiceCall(`+1${toNumberValue}`, formatPhoneNumber(fromNumberValue));
    const { success, data } = placeCallResponse;
    this.setState({
      placeCallSubmitted: true,
      placeCallSuccess: success && data.status !== 400,
      serverResponse: formatJSONResponse(data),
    });
  }

  handleDropdownSelect = e => {
    this.setState({ fromNumberValue: e.target.id });
  }

  render() {
    const { accountNumbers, toNumberValue, fromNumberValue, placeCallSubmitted, placeCallSuccess, serverResponse } = this.state;
    return (
      <div className='row'>
        <div className='col-5'>
          <div className='mb-3'>
            <h3>Call Data Input</h3>
          </div>
          <form onSubmit={this.handlePlaceCall}>
            <div className='input-group mb-3'>
              <label htmlFor="fromNumberValue" className="form-label">Caller Number</label>
              <div className='input-group mb-3'>
                <button id='fromNumberValue' className='btn btn-outline-secondary dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">Call Via</button>
                <ul className="dropdown-menu">
                  {accountNumbers.map((num, i) => <li key={`phone-number-item-${i}`}><a className='dropdown-item' id={num.phoneNumber} onClick={this.handleDropdownSelect}>{num.friendlyName}</a></li>)}
                </ul>
                <input type="phonenumber" className="form-control" id="fromNumberValue" aria-describedby="fromNumberHelp" onChange={this.onChange} value={fromNumberValue} />
              </div>
              <div id="fromNumberHelp" className="form-text">Enter the number the call is coming from.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="toNumberValue" className="form-label">Recipient Number</label>
              <input type="phonenumber" className="form-control" id="toNumberValue" aria-describedby="toNumberHelp" onChange={this.onChange} value={toNumberValue} />
              <div id="toNumberHelp" className="form-text">Enter the number to place a call to.</div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={this.handlePlaceCall}>Submit</button>
          </form>
          <Alert
            alertType={placeCallSuccess ? 'success' : 'danger'}
            isVisible={placeCallSubmitted}
            styleClasses='mt-3'
            alertText={placeCallSuccess ? 'Successfully placed call' : 'Error placing call'}
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
