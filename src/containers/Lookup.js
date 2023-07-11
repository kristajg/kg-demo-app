import React, { Component } from 'react';

// Components
import CodeBlockDisplay from '../components/CodeBlockDisplay';

// Helpers
import { getLookup } from '../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../helpers/utils';

class Lookup extends Component {
  state = {
    phoneNumberValue: '',
    serverResponse: '',
  }

  handleTextChange = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleGetLookup = async e => {
    e.preventDefault();
    const { phoneNumberValue } = this.state;
    const response = await getLookup(formatPhoneNumber(phoneNumberValue));
    this.setState({
      serverResponse: formatJSONResponse(response.data),
    });
  }

  render() {
    const { phoneNumberValue, serverResponse } = this.state;
    return (
      <div className='container'>
        <h2 className='my-4 mb-5'>
          🔎 Lookup Demo
        </h2>
        <div className='row'>
          <div className='col-5'>
            <div className='mb-5'>
              <h3>Input Phone Number</h3>
            </div>
            <form onSubmit={this.handleGetLookup}>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='phoneNumberValue'
                  aria-describedby='phoneNumberHelp'
                  onChange={this.handleTextChange}
                  value={phoneNumberValue}
                />
                <div id='phoneNumberHelp' className='form-text'>Enter the phone number to get Lookup details</div>
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={this.handleGetLookup}
              >
                Submit
              </button>
            </form>
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

export default Lookup;
