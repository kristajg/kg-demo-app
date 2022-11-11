import React from 'react';

export const CallSummary = (props) => {
  return (
    <>
      <div className='mb-3'>
        Call summary goes here
      </div>
      <button type="submit" className="btn btn-primary" onClick={props.resetPlaceCall}>
        Go Back to Place Call
      </button>
    </>
  );
}
