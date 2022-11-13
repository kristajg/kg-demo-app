import { placeVoiceCall } from '../../helpers/apiHelpers';

function IVR(props) {
  const handlePlaceCall = async e => {
    e.preventDefault();
    console.log('place call fired');
  };

  return (
    <div>
      <div className='mb-3'>
        <h3>Call into Twilio Studio + Dialogflow IVR</h3>
      </div>
      <button className='btn btn-primary' onClick={handlePlaceCall()}>
        Place Call
      </button>
    </div>
  );
}

export default IVR;
