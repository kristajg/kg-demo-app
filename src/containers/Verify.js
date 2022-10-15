import React, { Component } from 'react';

// Components
import Alert from '../components/Alert';
import CodeBlockDisplay from '../components/CodeBlockDisplay';

// Helpers
import { sendVerificationCode, submitVerificationCode } from '../helpers/apiHelpers';
import { formatResponse } from '../helpers/utils';

class Verify extends Component {
  state = {
    phoneNumberValue: '',
    verifyCodeValue: '',
    phoneNumberSubmitted: false,
    serverResponse: '',
    verifySuccess: false,
    verifyStatus: '',
  };

  onChange = e => {
    // TODO: add form validation
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handlePhoneNumberSubmit = async e => {
    e.preventDefault();
    const { phoneNumberValue } = this.state;
    const verificationResponse = await sendVerificationCode(`+1${phoneNumberValue}`);
    // TODO: error handle based on verificationResponse returns error
    this.setState({
      phoneNumberSubmitted: true,
      serverResponse: formatResponse(verificationResponse.data),
    });
  }

  handleVerificationCodeSubmit = async e => {
    e.preventDefault();
    const { phoneNumberValue, verifyCodeValue } = this.state;
    const codeSubmitResponse = await submitVerificationCode(`+1${phoneNumberValue}`, verifyCodeValue);
    const { success, data } = codeSubmitResponse;
    this.setState({
      verifySuccess: success,
      verifyStatus: data.status,
      serverResponse: formatResponse(codeSubmitResponse.data),
    });
  }


  render() {
    const { phoneNumberSubmitted, phoneNumberValue, serverResponse, verifyCodeValue, verifySuccess, verifyStatus } = this.state;

    return (
      <div className='container'>
        <h2 className='my-4 mb-5'>
          🔐 Verify Demo
        </h2>
        <div className='row'>
          <div className='col-5'>
            <div className='mb-3'>
              <h3>Authentication Input</h3>
            </div>
            {phoneNumberSubmitted ? (
              <form onSubmit={this.handleVerificationCodeSubmit}>
                <div className="mb-3">
                  <label htmlFor="verifyCodeValue" className="form-label">Authentication Code</label>
                  <input type="text" className="form-control" id="verifyCodeValue" aria-describedby="verificationHelp" onChange={this.onChange} value={verifyCodeValue} />
                  <div id="verificationHelp" className="form-text">Enter the verification code sent via SMS.</div>
                </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            ) : (
              <form onSubmit={this.handlePhoneNumberSubmit}>
                <div className="mb-3">
                  <label htmlFor="phoneNumberValue" className="form-label">Phone Number</label>
                  <input type="phonenumber" className="form-control" id="phoneNumberValue" aria-describedby="phoneHelp" onChange={this.onChange} value={phoneNumberValue} />
                  <div id="phoneHelp" className="form-text">Enter your phone number to receive an authentication code.</div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handlePhoneNumberSubmit}>Submit</button>
              </form>
            )}
            <Alert
              alertType={verifyStatus === 'approved' ? 'success' : 'danger'}
              isVisible={verifySuccess}
              styleClasses='mt-3'
              alertText={verifyStatus === 'approved' ? 'Successfully verified!' : 'Wrong code entered'}
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

export default Verify;
