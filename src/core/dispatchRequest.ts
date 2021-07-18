import { flattenHeaders } from '../helper/headers'
import { buildURL, combineURL, isAbsoluteURL } from '../helper/url'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import transform from './transform'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
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
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url!)
  }
  return buildURL(url!, params, paramsSerializer)
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

/**
 * 请求取消函数
 * 如果已经取消过请求，将不会再取消请求
 * @param config 请求配置信息
 */
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
