export const formatJSONResponse = obj => {
  return JSON.stringify(obj, null, 4);
}

export const formatPhoneNumber = phoneNumber => {
  const firstTwoChars = phoneNumber.substring(0, 2);
  console.log('first two?? ', firstTwoChars);
  if (firstTwoChars === '+1') {
    return phoneNumber;
  }
  return `+1${phoneNumber}`;
}
