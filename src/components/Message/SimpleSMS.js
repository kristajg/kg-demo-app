import React from 'react';

const SimpleSMS = (props) => {
  return (
    <div className='mt-3 mb-3'>
      <label htmlFor='messageBodyValue' className='form-label'>Message Body</label>
      <textarea 
        type='text'
        className='form-control'
        id='messageBodyValue'
        aria-describedby='messageBodyHelp'
        onChange={props.onChange}
        value={props.messageBodyValue}
      />
      <div id='messageBodyHelp' className='form-text'>Enter your message</div>
    </div>
  );
}

export default SimpleSMS;
