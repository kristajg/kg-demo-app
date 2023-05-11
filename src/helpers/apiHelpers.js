import superagent from 'superagent';

export const postRequest = async (url = '', data = {}) => {
  return await superagent
    .post(url)
    .send(data)
    .set('Accept', 'application/json')
    .then(res => {
      return {
        success: true,
        data: res.body.data,
      };
    })
    .catch(err => {
      return {
        success: false,
        data: err,
      };
    });
}

export const getAccountNumbers = () => postRequest('/list-account-numbers');

export const sendSMS = (messageBody, toNumber, fromNumber) => {
  return postRequest('/send-message', { messageBody, toNumber, fromNumber });
}

export const sendMMS = async (formData) => {
  // let tmpMediaUrl = 'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg';
  // return postRequest('/send-mms', { mediaUrl: tmpMediaUrl, toNumber, fromNumber });
  return postRequest('/send-mms', formData);
}

export const sendScheduleMessage = (body, dateTimeToSend, to) => {
  return postRequest('/send-scheduled-message', { body, sendAt: dateTimeToSend.toISOString(), to });
}

export const sendVerificationCode = (to, channel) => {
  return postRequest('/send-verification-code', { to, channel });
}

export const submitVerificationCode = (contactValue, verifyCode) => {
  return postRequest('/submit-verification-code', {
    to: contactValue,
    code: verifyCode,
  });
}

export const checkVerificationStatus = to => postRequest('/check-verification', { to });

export const placeVoiceCall = (to, from, recordCall, transcribeCall) => {
  return postRequest('/place-call', { to, from, recordCall, transcribeCall });
}

export const updateInProgressCall = (callSID, twiml) => {
  return postRequest('/update-in-progress-call', { callSID, twiml });
}
