import { flattenHeaders } from '../helper/headers'
import { buildURL } from '../helper/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import transform from './transform'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

/**
 * 处理配置信息
 * @param config 配置信息
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
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
 * 转化响应 data
 *
 * @param res 配置信息
 * @returns 处理后的 header
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)

  return res
}
