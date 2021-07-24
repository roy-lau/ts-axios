import { parseHeaders } from '../helper/headers'
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { createError } from '../helper/error'
import { isURLSameOrigin } from '../helper/url'
import cookie from '../helper/cookie'
import { isFormData } from '../helper/utils'

/**
 * 发送 xhr 请求
 * @param config 配置信息
 * @returns promise
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 获取配置信息
    const {
      data = null,
      url,
      method = 'get',
      headers = {},
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    // 创建请求实例
    const request = new XMLHttpRequest()

    /**
     * 发送 xhr 请求
     */
    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    /**
     * 发送请求数据
     */
    request.send(data)

    /**
     * 请求配置
     */
    function configureRequest(): void {
      // 设置请求 响应类型
      if (responseType) request.responseType = responseType

      // 设置超时时间 ms
      if (timeout) request.timeout = timeout

      // 设置跨域请求
      if (withCredentials) request.withCredentials = withCredentials
    }

    /**
     * 添加事件
     */
    function addEvents(): void {
      /**
       * 监听请求响应的状态变化
       * @returns
       */
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) return

        // 网络错误，或者超时错误（已在下面函数中监听）
        if (request.status === 0) return

        // 获取解析后的响应 headers
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        // 获取响应数据，响应类型(responseType)如果是 text 从 request.responseText 返回响应数据，否则从 request.response 返回响应数据
        const responseData = responseType !== 'text' ? request.response : request.responseText
        // 设置响应数据
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        // 处理响应数据
        handleResponse(response)
      }

      /**
       * 处理网络错误事件
       */
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      /**
       * 处理超时事件
       */
      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }

      /**
       * 设置下载进度监听
       */
      if (onDownloadProgress) request.onprogress = onDownloadProgress
      /**
       * 设置上传进度监听
       */
      if (onUploadProgress) request.upload.onprogress = onUploadProgress
    }

    /**
     * 处理 headers
     */
    function processHeaders(): void {
      /**
       * 如果 data 是 FormData 类型，删除 headers 里的 content-type
       */
      if (isFormData(data)) delete headers['Content-Type']

      /**
       * 设置 XSRF，防止跨站点攻击
       */
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfHeaderName && xsrfValue) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      /**
       * 设置 auth 鉴权
       */
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(`${auth.username}:${auth.password}`)
      }
      /**
       * 设置请求头
       */
      Object.keys(headers).forEach(name => {
        // 如果 data 为空，且 header 中有 content-type，则删除掉 content-type
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          // 否则设置所有 headers
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    /**
     * 处理取消
     */
    function processCancel(): void {
      /**
       * 取消请求
       */
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        }).catch(() => {
          // do nothing
        })
      }
    }

    /**
     * 处理响应事件
     * @param response 响应对象()
     *
     */
    function handleResponse(response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
