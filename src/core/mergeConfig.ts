import { deepMerge, isPlainObject } from '../helper/utils'
import { AxiosRequestConfig } from '../types'

// strategy ： 策略
const strats = Object.create(null)
/**
 * 默认合并策略
 * 如果 val2 存在返回 val2，不存在返回 val1
 *
 * @param val1 默认配置
 * @param val2 自定义配置
 * @returns 配置对象
 */
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

/**
 * 自 val2 合并
 * 如果 val2 存在返回 val2
 *
 * @param val1 默认配置
 * @param val2 自定义配置
 * @returns 配置对象
 */
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}

/**
 * 深度合并策略
 * 如果 val2 存在返回 val2
 *
 * @param val1 默认配置
 * @param val2 自定义配置
 * @returns 配置对象
 */
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers', 'auth']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

/**
 * 合并配置信息
 *
 * @kind 此函数运用了设计模式中的策略模式
 * @param config1 默认配置
 * @param config2 自定义配置
 */
export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig) {
  if (!config2) config2 = {}

  const config = Object.create(null)

  for (const key in config2) {
    mergeField(key)
  }

  for (const key in config1) {
    mergeField(key)
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
