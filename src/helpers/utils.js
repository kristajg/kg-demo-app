export const formatJSONResponse = obj => JSON.stringify(obj, null, 4);

export const formatPhoneNumber = num => {
  const firstTwoChars = num.substring(0, 2);
  return firstTwoChars === '+1' ? num : `+1${num}`;
}
