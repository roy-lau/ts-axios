import { transfromRequest, transfromResponse } from '../helper/data'
import { processHeaders } from '../helper/headers'
import { buildURL } from '../helper/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}

/**
 * 处理配置信息
 * @param config 配置信息
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * 转化 url params
 * @param config 配置信息
 * @returns 处理后的 url
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config

  return buildURL(url!, params)
}

/**
 * 转化请求 data
 *
 * @param config 配置信息
 * @returns 处理后的 data string
 */
function transformRequestData(config: AxiosRequestConfig): string {
  return transfromRequest(config.data)
}

/**
 * 转化请求 headers
 *
 * @param config 配置信息
 * @returns 处理后的 header
 */
function transformHeaders(config: AxiosRequestConfig): string {
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}

/**
 * 转化响应 data
 *
 * @param res 配置信息
 * @returns 处理后的 header
 */
function transfromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transfromResponse(res.data)

  return res
}
