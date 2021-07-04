/**
 * 高级类型
 */

/**
 * 合并对象
 * @param first 
 * @param second 
 * @returns 交叉类型 T & U
 */
function extend<T, U>(first: T, second: U): T & U {
  let result = {} as T & U
  for (let id in first) {
    result[id] = first[id] as any
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      result[id] = second[id] as any
    }
  }
  return result
}

class Person {
  constructor(public name: string) {

  }
}

interface Loggable {
  log(): void
}
class ConsoleLogger implements Loggable {
  log() { }
}

// 交叉类型 jim， 拥有 Person 和 ConsoleLogger 类的共同属性
const jim = extend(new Person('jim'), new ConsoleLogger())
console.log(jim.name)
console.log(jim.log())


/**
 * 联合类型
 */
// function padLeft(value: string, padding: any) {
//   if (typeof padding === 'number') {
//     return Array(padding + 1).join('  ') + value
//   } else if (typeof padding === 'string') {
//     return padding + value
//   } else {
//     throw new TypeError(`Expected string or number got ${padding}`)
//   }
// }
// // padLeft('Hello world', true) // error padidng 参数类型不正确
// padLeft('Hello world', '')

interface Bird {
  fly() // 飞
  layEggs() // 产卵
}

interface Fish {
  swim() // 飞
  layEggs() // 产卵
}

function getSmallPet() Fish | Bird{
  // ...
}

const pet = getSmallPet()
pet.layEggs() // right 因为 Fish 和 Bird，都有 layEggs 函数

// pet.swim() // error 因为 不确定 pet 是 Fish 还是 Bird

if ((pet as Fish).swim) {
  (pet as Fish).swim()
} else if ((pet as Bird).fly) {
  (pet as Bird).fly()
}

if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

function isNumber(x: any): x is number {
  return typeof x === 'number'
}
function isString(x: any): x is string {
  return typeof x === 'string'
}
function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value
  } else if (isString(padding)) {
    return padding + value
  } else {
    throw new TypeError(`Expected string or number got ${padding}`)
  }
}

/**
 * TS 的类型保护机制 -- 通过 instanceof 来判断
 */
class Bird {
  fly() { // 飞
    console.log('bird fly')
  }
  layEggs() { // 产卵
    console.log('bird lay eggs')
  }
}

class Fish {
  swim() { // 游泳
    console.log('fish swim')
  }
  layEggs() { // 产卵
    console.log('fish lay eggs')
  }
}

function getRandomPat(): Fish | Bird {
  return Math.random() > 0.5 ? new Bird() : new Fish()
}
const randomPat = getRandomPat()
if (randomPat instanceof Brid) {
  randomPat.fly()
} else {
  randomPat.swim()
}

/**
 * 可以为 null 的类型
 */
let s = 'foo'
s = null
let sn: string | null = 'bar' // 联合类型
sn = null
sn = undefined

function numberAdd(x: number, y?: number) {
  return x + (y || 0)
}
numberAdd(1, 2)
numberAdd(1)
numberAdd(1, undefined)
numberAdd(1, null)

class C {
  a: number
  b?: number
}
const c = new C()
c.a = 12
c.a = undefined // error
c.b = 13
c.b = undefined // error
c.b = null // error

/**
 * 返回字符串
 * @param {string|null} sn sn 加叹号才能正确的推断出 sn 是不是 null
 * @returns string
 */
function returnString(sn: string | null): string {
  return sn! || 'default'
}

/**
 * 返回名字的首字母和全称拼接后的字符串
 * @param name 下面第三行不加叹号! 编译器会报错
 * @returns string
 */
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '. the ' + epithet
  }
  name = name || 'Bob'
  return postfix(name)
}
broken(null)


type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'

class UIElemenet {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') { }
    else if (easing === 'ease-out') { }
    else if (easing === 'ease-in-out') { }
    else { }
  }
}

const button = new UIElemenet()
button.animate(0, 0, 'ease-in')
// button.animate(0,0,'uneasy') // error 因为类型中没有 uneasy
button.animate(0, 0, null) // right