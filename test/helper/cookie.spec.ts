import cookie from '../../src/helper/cookie'

describe('helpers:cookie', () => {

  /**
   * @jest-environment jsdom
   */

  test('should read cookies', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })

  /**
   * @jest-environment jsdom
   */

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
  
})
