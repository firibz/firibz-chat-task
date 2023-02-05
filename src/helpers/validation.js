export const required = (val) => !!val || "This field is required";

export const email = (val) =>
  !val ||
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  ) ||
  "Enter a valid email";

export const max = (val, maxNumber) =>
  !val ||
  parseInt(val) <= parseInt(maxNumber) ||
  `Maximum valid value is ${maxNumber}`;

export const min = (val, minNumber) =>
  !val ||
  parseInt(val) >= parseInt(minNumber) ||
  `Minimum valid value is ${minNumber}`;

export const maxLength = (val, maxLengthValue) =>
  !val ||
  val.length <= maxLengthValue ||
  `The length can not be greater than ${maxLengthValue}`;

export const minLength = (val, minLengthValue) =>
  !val ||
  val.length >= minLengthValue ||
  `The length can not be less than ${minLengthValue}`;

export const asSameAs = (val, otherValue, otherName) =>
  !val || val === otherValue || `Value is not as same as <${otherName}> field`;

export const length = (val, lengthValue) =>
  !val ||
  val.length === lengthValue ||
  `The length of this field must be ${lengthValue}`;

export const validation = {
  required,
  email,
  max,
  min,
  maxLength,
  minLength,
  asSameAs,
  length,
};
