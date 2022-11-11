import React from 'react';

export const CallForm = (props) => {
  return (
    <form onSubmit={props.handlePlaceCall}>
      <div className='input-group mb-3'>
        <label htmlFor="fromNumberValue" className='form-label'>Caller Number</label>
        <div className='input-group mb-3'>
          <button id='fromNumberValue' className='btn btn-outline-secondary dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
            Call Via
          </button>
          <ul className='dropdown-menu'>
            {props.accountNumbers.map((num, i) => {
              return (
                <li key={`phone-number-item-${i}`}>
                  <a className='dropdown-item' id={num.phoneNumber} onClick={props.handleDropdownSelect}>
                    {num.friendlyName}
                  </a>
                </li>
              )}
            )}
          </ul>
          <input type="phonenumber" className="form-control" id="fromNumberValue" aria-describedby="fromNumberHelp" onChange={props.onChange} value={props.fromNumberValue} />
        </div>
        <div id="fromNumberHelp" className="form-text">Enter the number the call is coming from.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="toNumberValue" className="form-label">Recipient Number</label>
        <input type="phonenumber" className="form-control" id="toNumberValue" aria-describedby="toNumberHelp" onChange={props.onChange} value={props.toNumberValue} />
        <div id="toNumberHelp" className="form-text">Enter the number to place a call to.</div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={props.handlePlaceCall}>Place Call</button>
    </form>
  );
}
