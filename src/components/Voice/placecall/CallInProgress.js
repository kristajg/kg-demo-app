import React from 'react';
import DurationCounter from '../../DurationCounter';

export const CallInProgress = (props) => {
  return (
    <div>
      <div className='mb-3'>
        <label className='form-label'>Call Status</label>
        <div className='fw-bold twilio-font-blue'>
          {props.callStatus}
        </div>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Call Duration</label>
        <div className='fs-1'>
          <DurationCounter isActive={props.callStatus === 'in-progress'} />
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-danger'
        disabled={props.callStatus !== 'in-progress'}
        onClick={props.handleEndCall}
      >
        End Call
      </button>
    </div>
  );
}
