/* eslint-disable consistent-return */
const isEmpty = value => !value && !Number.isInteger(value)
const join = rules => (value, data) => rules.map(rule => rule(value, data)).filter(error => Boolean(error))[0]

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address'
  }
}

export function creditCard(value) {
  if (!isEmpty(value) && !/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i.test(value)) {
    return 'Invalid credit card number'
  }
}

export function creditCardExp(value) {
  if (!isEmpty(value) && !/(0[1-9]|1[0-2])\/[0-9]{2}/i.test(value)) {
    return 'Invalid expiration date'
  }
}

export function creditCardCvc(value) {
  if (!isEmpty(value) && !/^[0-9]{3,4}$/i.test(value)) {
    return 'Invalid CVC'
  }
}

export function zipCode(value) {
  if (!isEmpty(value) && !/^\d{5}(?:[-\s]\d{4})?$/i.test(value)) {
    return 'Invalid ZIP code'
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'This field is required'
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`
    }
  }
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`
    }
  }
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'This field must contain a number'
  }
}

export function oneOf(enumeration) {
  return value => {
    if (enumeration.indexOf(value) !== -1) {
      return `Must be one of: ${enumeration.join(', ')}`
    }
  }
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Passwords do not match'
      }
    }
  }
}

export function validateQtyFragrances(field){
  return (value, data) => {
    if (data) {
      if (value < (data[field] * 2)) {
        const error = "You don't have enough fragrances related to the quantity of dispensers";
        alert(error);
        return error;
      }
    }
  }
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {}

    Object.keys(rules).forEach(key => {
      // concat enables both functions and arrays of functions
      const rule = join([].concat(rules[key]))
  
      const error = rule(data[key], data)
           

      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}
/* eslint-enable consistent-return */
