import { isDate, isPlainObject, isURLSearchParams } from './utils'

interface URLOrigin {
  protocol: string
  host: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
/**
 * 构建统一资源定位符（url）
 * @param url 统一资源定位符
 * @param params 参数
 * @returns url 拼接上 params
 */
export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  // 如果 params 不存在，直接返回 url
  if (!params) return url

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    const parts: string[] = []

    /**
     * 遍历参数 params
     */
    Object.keys(params).forEach(key => {
      // 获取 params 的值 val
      const val = params[key]
      // 如果值 val 为空(null) 或 undefined 跳过本次循环
      if (val === null && typeof val === 'undefined') {
        return
      }

      let values = []
      // 判断值如果为数组，key 拼接上[]。例如 a[]=1,b[]=2
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        // 如果值不是数组，将其转化为数组
        values = [val]
      }

      /**
       * 遍历值 values
       */
      values.forEach(val => {
        if (isDate(val)) {
          // 如果是日期类型
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          // 如果是对象类型
          val = JSON.stringify(val)
        }
        // key val 转义后用等号拼接，然后 push 到 parts 数组中
        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    /**
     * params 连接符 &
     */
    serializedParams = parts.join('&')
  }

  /**
   * 如果 serializedParams 存在，parts 的长度大于0，serializedParams 便存在
   * serializedParams 的大致值为 a&b&c&d
   */
  if (serializedParams) {
    /**
     * 如果 url 中有 # (hash), 则剔除 hash 后面的字符
     */
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

/**
 * 判断传入的 url 是否是绝对路径
 * @param url
 * @returns
 */
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
/**
 * 判断两个 url 是否相同
 *
 * @param reuqestURL 请求 url
 * @returns 判断请求 url 和当前 location.href 是否相同
 */
export function isURLSameOrigin(reuqestURL: string): boolean {
  const parsedOrigin = resolveURL(reuqestURL)

  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

/**
 * 解析 URL
 *
 * @param url
 * @returns 返回 url 的协议和主机名
 */
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return { protocol, host }
}
