import { isPlainObject } from './utils'

/**
 * 转化请求体
 *
 * @param data body 的请求体
 * @returns stringify json
 */
export function transformRequest(data: any): any {
  return isPlainObject(data) ? JSON.stringify(data) : data
}

/**
 * 转化响应体
 *
 * @param data 响应数据
 * @returns 解析后的响应数据 JSON.parse
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch {
      // do nothing
    }
  }
  return data
}
