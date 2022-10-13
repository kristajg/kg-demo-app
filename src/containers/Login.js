import React, { Component } from 'react';

// Helpers
import { sendVerificationCode, submitVerificationCode } from '../helpers/apiHelpers';

class Login extends Component {
  state = {
    phoneNumberValue: '',
    verifyCodeValue: '',
    phoneNumberSubmitted: false,
    verifySuccess: false,
    verifyStatus: '',
  };

  onChange = e => {
    const val = e.target.value;
    // TODO: add validation for numbers & length
    // let isnum = /^\d+$/.test(val);

    // TODO: make onChange more reusable
    if (e.target.id === 'phonenumberInput') {
      this.setState({ phoneNumberValue: val });
    }
    if (e.target.id === 'verifyCodeInput') {
      this.setState({ verifyCodeValue: val });
    }
  };

  handlePhoneNumberSubmit = async e => {
    e.preventDefault();
    const { phoneNumberValue } = this.state;
    const verificationResponse = await sendVerificationCode(`+1${phoneNumberValue}`);
    console.log('verificationResponse!!! ', verificationResponse);
    // TODO: anything to set in state here with verificationResponse?
    // TODO: error handle here
    this.setState({ phoneNumberSubmitted: true });
  }

  handleVerificationCodeSubmit = async e => {
    e.preventDefault();
    const { phoneNumberValue, verifyCodeValue } = this.state;
    const codeSubmitResponse = await submitVerificationCode(`+1${phoneNumberValue}`, verifyCodeValue);
    const { success, data } = codeSubmitResponse;
    this.setState({
      verifySuccess: success,
      verifyStatus: data.status,
    });
  }


  render() {
    const { phoneNumberSubmitted, phoneNumberValue, verifyCodeValue, verifySuccess, verifyStatus } = this.state;

    return (
      <div className='container'>
        <h2 className='my-4'>
          Verify Demo
        </h2>
        {phoneNumberSubmitted ? (
          <form onSubmit={this.handleVerificationCodeSubmit}>
            <div className="mb-3">
              <label htmlFor="verifyCodeInput" className="form-label">Authentication Code</label>
              <input type="text" className="form-control" id="verifyCodeInput" aria-describedby="verificationHelp" onChange={this.onChange} value={verifyCodeValue} />
              <div id="verificationHelp" className="form-text">Enter the verification code sent via SMS.</div>
            </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        ) : (
          <form onSubmit={this.handlePhoneNumberSubmit}>
            <div className="mb-3">
              <label htmlFor="phonenumberInput" className="form-label">Phone Number</label>
              <input type="phonenumber" className="form-control" id="phonenumberInput" aria-describedby="phoneHelp" onChange={this.onChange} value={phoneNumberValue} />
              <div id="phoneHelp" className="form-text">Enter your phone number to receive an authentication code.</div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handlePhoneNumberSubmit}>Submit</button>
          </form>
        )}
        {verifySuccess ? (
          <div className={`alert alert-${verifyStatus === 'approved' ? 'success' : 'danger'} mt-3`} role='alert'>
            {verifyStatus === 'approved' ? 'Successfully verified!' : 'Wrong code entered'}
          </div>
        ) : (<></>)}
      </div>
    );
  }
}

export default Login;
