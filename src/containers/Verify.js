import React, { Component } from 'react';

// Components
import Alert from '../components/Alert';
import CodeBlockDisplay from '../components/CodeBlockDisplay';
import RadioButton from '../components/form/RadioButton';

// Helpers
import { sendVerificationCode, submitVerificationCode, checkVerificationStatus } from '../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../helpers/utils';

const verifyChannels = [
  { name: 'SMS', id: 'sms' },
  { name: 'Voice', id: 'call' },
  { name: 'Email', id: 'email' },
  { name: 'Silent Network Auth', id: 'sna' },
]

class Verify extends Component {
  state = {
    channel: 'sms',
    userContactValue: '',
    verifyCodeValue: '',
    tokenRequested: false,
    serverResponse: '',
    verifySuccess: false,
    verifyStatus: '',
  };

  handleTextChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleRadioChange = e => this.setState({ channel: e.target.value });

  handleTokenRequest = async e => {
    e.preventDefault();
    const { userContactValue, channel } = this.state;
    const contactValue = channel === 'email' ? userContactValue : formatPhoneNumber(userContactValue);
    const response = await sendVerificationCode(contactValue, channel);
    // TODO: error handle based on verificationResponse returns error
    this.setState({
      tokenRequested: true,
      serverResponse: formatJSONResponse(response.data),
    });
  }

  handleVerifyTokenSubmit = async e => {
    e.preventDefault();
    const { userContactValue, verifyCodeValue, channel } = this.state;
    const contactValue = channel === 'email' ? userContactValue : formatPhoneNumber(userContactValue);
    const response = await submitVerificationCode(contactValue, verifyCodeValue);
    const { success, data } = response;
    this.setState({
      verifySuccess: success,
      verifyStatus: data.status,
      serverResponse: formatJSONResponse(data),
    });
  }

  handleCheckVerification = async e => {
    e.preventDefault();
    const { userContactValue } = this.state;
    const response = await checkVerificationStatus(userContactValue);
    const { success, data } = response;
    this.setState({
      verifySuccess: success,
      verifyStatus: data.status,
      serverResponse: formatJSONResponse(data),
    });
  }

  displayVerifyTokenForm = () => {
    const { channel, verifyCodeValue, userContactValue, verifyStatus } = this.state;
    return (
      <>
        {channel !== 'sna' ? (
          <form onSubmit={this.handleVerifyTokenSubmit}>
            <div className="mb-3">
              <label htmlFor="verifyCodeValue" className="form-label">Authentication Code</label>
              <input
                type="text"
                className="form-control"
                id="verifyCodeValue"
                aria-describedby="verificationHelp"
                onChange={this.handleTextChange}
                value={verifyCodeValue}
              />
              <div id="verificationHelp" className="form-text">Enter the verification code sent via {channel}.</div>
            </div>
            {/* <button type="submit" className="btn btn-primary" onClick={this.handleVerifyTokenSubmit}>Submit</button> */}
            <button
              type="submit"
              className="btn btn-primary"
              onClick={verifyStatus === 'approved' ? this.resetForm : this.handleVerifyTokenSubmit}
            >
              {verifyStatus === 'approved' ? 'Restart' : 'Submit'}
            </button>
          </form>
        ) : (
          <div>
            <p>
              Would you like to check the authentication status of {userContactValue}?
            </p>
            <button type="submit" className="btn btn-primary" onClick={this.handleCheckVerification}>Check Verification</button>
          </div>
        )}
      </>
    );
  }

  resetForm = () => {
    this.setState({
      userContactValue: '',
      verifyCodeValue: '',
      tokenRequested: false,
      serverResponse: '',
      verifySuccess: false,
      verifyStatus: '',
    });
  }

  render() {
    const { channel, tokenRequested, userContactValue, serverResponse, verifySuccess, verifyStatus } = this.state;
    return (
      <div className='container'>
        <h2 className='my-4 mb-5'>
          🔐 Verify Demo
        </h2>
        <div className='row'>
          <div className='col-5'>
            <div className='mb-3'>
              <h3>Input Authentication Data</h3>
            </div>
            {tokenRequested ? (
              <>{this.displayVerifyTokenForm()}</>
            ) : (
              <form onSubmit={this.handleTokenRequest}>
                <div className='mb-3'>
                  <label htmlFor="channelValue" className="form-label">Select Verification Channel</label>
                  {verifyChannels.map((channel, i) => 
                    <RadioButton
                      key={`radio-button-${i}`}
                      id={channel.id}
                      name={channel.name}
                      isDefault={channel.id === 'sms' ? true : false}
                      handleRadioChange={this.handleRadioChange}
                    />
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="userContactValue" className="form-label">{channel !== 'email' ? 'Phone Number' : 'Email'}</label>
                  <input type={channel !== 'email' ? 'phonenumber' : 'email'} className="form-control" id="userContactValue" aria-describedby="channelHelp" onChange={this.handleTextChange} value={userContactValue} />
                  <div id="channelHelp" className="form-text">
                    Enter your {channel !== 'email' ? 'phone number' : 'email'} to {channel !== 'sna' ? 'receive an authentication code' : ' verify through Silent Network Auth'}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleTokenRequest}>
                  Submit
                </button>
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
