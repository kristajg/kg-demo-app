import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const CallInProgress = (props) => {
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8009');

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      const { data = {} } = lastMessage;
      console.log('data is ', data);
      if (data !== null) {
        props.setCallStatusDataFromWebsocket(data);
      }
    }
  }, [lastMessage, setMessageHistory]);

  // TODO: could technically use websockets to end the call...
  // const handleEndCall = useCallback(() => 
  //   sendMessage({ messageType: 'call', twiml: 'hangup twiml goes here' }), []
  // );

  return (
    <>
      <div className='mb-3'>
        <label className='form-label'>Call Duration</label>
        <div>call duration timer goes here</div>
      </div>

      <div className='mb-3'>
        <label className='form-label'>Call Transcription</label>
        <div>call transcription goes here</div>
      </div>

      <button type='submit' className='btn btn-danger' onClick={props.handleEndCall}>
        End Call
      </button>
    </>
  );
}
