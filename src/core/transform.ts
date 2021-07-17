import { AxiosTransformer } from '../types'

/**
 * 转化函数
 *
 * @param data 数据
 * @param headers 头信息
 * @param fns 转化函数的回调函数
 * @returns 转化后的 data
 */
export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) return data
  if (!Array.isArray(fns)) fns = [fns]

  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
