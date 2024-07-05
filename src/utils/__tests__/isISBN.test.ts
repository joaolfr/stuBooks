import { isValidISBNCode } from '@utils/isISBN'

describe('ISBN', () => {
  it('should return true if is a valid ISBN', () => {
    const teste = '9781786469571'
    expect(isValidISBNCode(teste)).toBeTruthy()
  })
  it('should return false if is a valid ISBN', () => {
    const teste = '13213131233'
    expect(isValidISBNCode(teste)).toBeFalsy()
  })
})
