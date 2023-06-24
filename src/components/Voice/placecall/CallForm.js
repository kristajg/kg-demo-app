import React from 'react';
import CheckBox from '../../form/CheckBox';
import DropDownMenu from '../../form/DropDownMenu';

const spinnerStyles = {
  width: '18px',
  height: '18px',
  marginRight: '10px',
};

export const CallForm = props => {
  return (
    <form onSubmit={props.handlePlaceCall}>
      <div className='input-group mb-4'>
        <DropDownMenu
          id='fromNumberValue'
          labelText='Outbound Caller Number'
          buttonText='Call Via'
          inputType='phonenumber'
          inputOnChange={props.onChange}
          inputValue={props.fromNumberValue}
          listData={props.accountNumbers}
          listDataId='phoneNumber'
          listDataText='friendlyName'
          handleDropdownSelect={props.handleDropdownSelect}
          sublabelText='Enter the number the call is coming from'
          sublabelId='fromNumberHelp'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='toNumberValue' className='form-label'>
          Inbound Recipient Number
        </label>
        <input
          type='phonenumber'
          className='form-control'
          id='toNumberValue'
          aria-describedby='toNumberHelp'
          onChange={props.onChange}
          value={props.toNumberValue}
        />
        <div id='toNumberHelp' className='form-text'>
          Enter the number to place a call to
        </div>
      </div>
      <div className='mb-4'>
        <div className='row'>
          <div className='col-4'>
            <CheckBox
              id='recordCall'
              handleCheckChange={props.handleCheckboxToggle}
              text='Record call'
            />
          </div>
          <div className='col-5'>
            <CheckBox
              id='transcribeCall'
              handleCheckChange={props.handleCheckboxToggle}
              text='Transcribe call'
            />
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-primary'
        disabled={!props.websocketConnectionReady}
        onClick={props.handlePlaceCall}>
          {!props.websocketConnectionReady && (
            <div className='spinner-border' role='status' style={spinnerStyles} />
          )}
        {props.websocketConnectionReady ? 'Place Call' : 'Connecting...'}
      </button>
    </form>
  );
};
