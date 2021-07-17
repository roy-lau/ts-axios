import { deepMerge, isPlainObject } from './utils'
import { Method } from '../types'

/**
 * 转换（归一化）请求头的名称 key，name
 * @param headers 请求头信息
 * @param normalizeName 请求头的 key，name
 * @returns
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * 处理请求头类型
 * @explain 如果请求体是对象，将请求头的 Content-Type 设置为 json 类型
 * @param headers 请求头
 * @param data 请求体
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 解析响应 headers
 * @param headers 响应 headers string
 * @returns header json
 */
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)

  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')

    key = key.trim().toLowerCase()

    if (!key) return
    if (val) val = val.trim()

    parsed[key] = val
  })

  return parsed
}

/**
 * 根据请求方法配置 headers
 * @param headers 请求头部配置
 * @param method 请求方法
 * @returns
 */
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers

  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
