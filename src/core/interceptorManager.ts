import { RejectedFn, ResolvedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

/**
 * 拦截器管理类
 */
export default class InterceptorManager<T> {
  /**
   * 私有的 储存拦截器数组
   */
  private interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  /**
   * 添加拦截器
   *
   * @param resolved 成功
   * @param rejected 失败
   * @returns 拦截器 id
   */
  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  /**
   * 遍历拦截器
   *
   * @param fn 回调函数
   */
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  /**
   * 删除拦截器
   *
   * @param id 要删除的拦截器 id
   */
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
