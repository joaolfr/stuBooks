export function isValidISBNCode(str: string) {
  const regex = /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/

  if (str == null) {
    return false
  }

  if (regex.test(str) === true) {
    return true
  } else {
    return false
  }
}
