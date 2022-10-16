export const formatJSONResponse = obj => {
  return JSON.stringify(obj, null, 4);
}

export const formatPhoneNumber = phoneNumber => {
  const firstTwoChars = phoneNumber.substring(0, 2);
  return firstTwoChars === '+1' ? phoneNumber : `+1${phoneNumber}`;
}
