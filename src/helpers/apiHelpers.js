import superagent from 'superagent';

export const sendMessage = async (messageBody, toNumber, fromNumber) => {
  return await superagent
    .post('/send-message')
    .send({ messageBody, toNumber, fromNumber })
    .set('Accept', 'application/json')
    .then(res => {
      return res.body.data;
    })
    .catch(err => {
      return {
        success: false,
        data: err,
      };
    });
}

export const sendVerificationCode = async phoneNumber => {
  return await superagent
    .post('/send-verification-code')
    .send({ toNumber: phoneNumber })
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

export const submitVerificationCode = async (phoneNumber, verifyCode) => {
  return await superagent
    .post('/submit-verification-code')
    .send({
      toNumber: phoneNumber,
      code: verifyCode,
    })
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