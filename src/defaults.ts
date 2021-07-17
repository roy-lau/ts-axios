import { transformRequest, transformResponse } from './helper/data'
import { processHeaders } from './helper/headers'
import { AxiosRequestConfig } from './types'

/**
 * axios 默认配置
 */
const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

/**
 * 这些方法默认不设置 header
 */
const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

/**
 * 设置这些方法的 header 的'Content-Type' 为 'application/x-www-form-urlencoded'
 */
const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
