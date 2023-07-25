import { useState } from 'react';

// Components
import Alert from '../../Alert';
import CheckVerificationForm from './CheckVerificationForm';
import CodeBlockDisplay from '../../CodeBlockDisplay';

// Helpers
import { postRequest } from '../../../helpers/apiHelpers';
import { formatJSONResponse, formatPhoneNumber } from '../../../helpers/utils';

// Assets
import { ROUTES } from '../../../assets/constants/routeConstants';

// TODO: pull all valid toll-free numbers purchase on your account! or enter manually
// TODO: form validation, ensure its filled out with a valid phone number

export default function TollFree() {
  const [textValue, setTextValue] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverResponse, setServerResponse] = useState([]);

  const handleTextChange = e => {
    const { id, value } = e.target;
    setTextValue(value);
  }

  const submitVerificationForm = async e => {
    e.preventDefault();
    const response = await postRequest(ROUTES.GET_TFV_STATUS, { number: textValue });
    const { success, data } = response;
    setServerError(!success || data.status === 400);
    setServerResponse(formatJSONResponse(data));
    setFormSubmitted(true);
  }

  const resetForm = () => {
    setFormSubmitted(false);
    setServerError(false);
    setServerResponse([]);
    setTextValue('');
  }
  
  return (
    <div className='row'>
      <div className='col-5'>
        <div className='mb-3'>
          <h3>Check Toll-Free Verification Status</h3>
        </div>
        <CheckVerificationForm
          handleResetForm={resetForm}
          handleSubmit={submitVerificationForm}
          handleTextChange={handleTextChange}
          tollFreeValue={textValue}
          formSubmitted={formSubmitted}
        />
        <Alert
          alertType='danger'
          isVisible={serverError}
          styleClasses='mt-3'
          alertText='Server Response Error'
        />
      </div>
      <div className='col-7'>
        <div className='mb-5'>
          <h3>Twilio API Response</h3>
        </div>
        <CodeBlockDisplay code={serverResponse} />
      </div>
    </div>
  );
}