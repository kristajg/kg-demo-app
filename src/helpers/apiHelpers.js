import superagent from 'superagent';

export const postRequest = async (url = '', data = {}) => {
  return await superagent
    .post(url)
    .send(data)
    .set('Accept', 'application/json')
    .then(res => {
      return {
        success: true,
        data: res.body.data
      };
    })
    .catch(err => {
      return {
        success: false,
        data: err,
      };
    });
}

export const getAccountNumbers = async () => {
  return await postRequest('/list-account-numbers');
}

export const sendMessage = async (messageBody, toNumber, fromNumber) => {
  return await postRequest('/send-message', { messageBody, toNumber, fromNumber });
}

export const sendVerificationCode = async (to, channel) => {
  return await postRequest('/send-verification-code', { to, channel });
}

export const submitVerificationCode = async (phoneNumber, verifyCode) => {
  return await postRequest('/submit-verification-code', {
    toNumber: phoneNumber,
    code: verifyCode,
  });
}

export const placeVoiceCall = async (toNumber, fromNumber) => {
  return await postRequest('/place-call', { toNumber, fromNumber } );
}
