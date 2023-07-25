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
