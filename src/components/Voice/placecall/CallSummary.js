import React from 'react';

export const CallSummary = (props) => {
  return (
    <>
      <div className='mb-3'>
        <h6>Total Call Time</h6>
        <div>
          {props.callSummaryData.duration} seconds
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={props.resetPlaceCall}>
        Go Back to Place Call
      </button>
    </>
  );
}
