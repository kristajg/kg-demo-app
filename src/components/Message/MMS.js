import React from 'react';

const MMS = (props) => {
  return (
    <div className='mt-3 mb-2'>
      <label htmlFor='mmsBodyValue' className='form-label mb-2'>
        📁 Add a <a href='https://www.twilio.com/docs/sms/accepted-mime-types' target='_blank' rel='noreferrer' className='link-secondary'>supported file type</a>
      </label>
      <div className='mb-3'>
        <input className="form-control" type="file" id="formFile" onChange={props.addMedia} />
      </div>
      <label htmlFor='messageBodyValue' className='form-label mb-2'>Message Body</label>
      <textarea 
        type='text'
        className='form-control'
        id='messageBodyValue'
        aria-describedby='messageBodyHelp'
        onChange={props.onChange}
        value={props.messageBodyValue}
      />
    </div>
  );
}

export default MMS;
