import React from 'react';

export const CallInProgress = (props) => {
  return (
    <>
      <div className='mb-3'>
        <label className='form-label'>Call Status</label>
        <div>{props.callStatus}</div>
      </div>

      <div className='mb-3'>
        <label className='form-label'>Call Duration</label>
        <div>TODO: call duration timer goes here</div>
      </div>

      {/* <div className='mb-3'>
        <label className='form-label'>Call Transcription</label>
        <div>TODO: live call transcription via media streams goes here</div>
      </div> */}

      <button
        type='submit'
        className='btn btn-danger'
        disabled={props.callStatus !== 'in-progress'}
        onClick={props.handleEndCall}
      >
        End Call
      </button>
    </>
  );
}
