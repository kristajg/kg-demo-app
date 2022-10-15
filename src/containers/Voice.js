import React, { Component } from 'react';

// Components
import Alert from '../components/Alert';
import CodeBlockDisplay from '../components/CodeBlockDisplay';

// Helpers
import { placeVoiceCall } from '../helpers/apiHelpers';
import { formatResponse } from '../helpers/utils';

class Voice extends Component {
  state = {
    toNumberValue: '',
    fromNumberValue: '',
    placeCallSubmitted: false,
    placeCallSuccess: false,
    serverResponse: '',
  };

  onChange = e => {
    // TODO: add form validation
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handlePlaceCall = async e => {
    e.preventDefault();
    const { toNumberValue, fromNumberValue } = this.state;
    const placeCallResponse = await placeVoiceCall(`+1${toNumberValue}`, `+1${fromNumberValue}`);
    const { success, data } = placeCallResponse;
    this.setState({
      placeCallSubmitted: true,
      placeCallSuccess: success && data.status !== 400,
      serverResponse: formatResponse(data),
    });
  }

 render() {
   const { toNumberValue, fromNumberValue, placeCallSubmitted, placeCallSuccess, serverResponse } = this.state;

   return (
    <div className='container'>
      <h2 className='my-4 mb-5'>
        📞 Voice Demo
      </h2>
      <div className='row'>
        <div className='col-5'>
          <div className='mb-3'>
            <h3>Call Data Input</h3>
          </div>
          <form onSubmit={this.handlePlaceCall}>
            <div className="mb-3">
              <label htmlFor="toNumberValue" className="form-label">To Phone Number</label>
              <input type="phonenumber" className="form-control" id="toNumberValue" aria-describedby="toNumberHelp" onChange={this.onChange} value={toNumberValue} />
              <div id="toNumberHelp" className="form-text">Enter the number to place a call to.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="fromNumberValue" className="form-label">From Phone Number</label>
              <input type="phonenumber" className="form-control" id="fromNumberValue" aria-describedby="fromNumberHelp" onChange={this.onChange} value={fromNumberValue} />
              <div id="fromNumberHelp" className="form-text">Enter the number the call is coming from.</div>
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
    </div>
   );
 }
}

export default Voice;
