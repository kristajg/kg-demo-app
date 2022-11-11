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

export const sendMessage = (messageBody, toNumber, fromNumber) => {
  return postRequest('/send-message', { messageBody, toNumber, fromNumber });
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

export const placeVoiceCall = (to, from) => postRequest('/place-call', { to, from });

export const updateInProgressCall = (callSID, twiml) => {
  return postRequest('/update-in-progress-call', { callSID, twiml });
}
