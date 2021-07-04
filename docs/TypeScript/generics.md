## 泛型

### 基本示例

```ts
function identity<T>(arg:T):T{
  return arg
}

// const output = identity<string>('myString')
const output = identity('myString')


function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
```

### 使用泛型变量

```ts
function identity<T>(arg: T): T {
  return arg
}

const myIdentity: <U>(arg: U) => U = identity
const myIdentity1: { <U>(arg: U): U } = identity
```

### 泛型类型

```ts
function identity<T>(arg: T): T {
  return arg
}

const myIdentity: <U>(arg: U) => U = identity
const myIdentity1: { <U>(arg: U): U } = identity

interface GenericIdentityFn<T> {
  (arg: T): T
}
const myIdentity2: GenericIdentityFn<number> = identity
```

### 泛型类

```ts
class GenericNumber<T>{
  zeroValue: T
  add: (x: T, y: T) => T
}
const myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}

const stringNumberic = new GenericNumber<string>()
stringNumberic.zeroValue = ''
stringNumberic.add = function (x, y) {
  return x + y
}

console.log(stringNumberic.add(stringNumberic.zeroValue, 'test'))
```

### 泛型约束

```ts
/**
 * 设置 length 为 number 类型
 */
interface LengthWise {
  length: number
}
function loggingIdentity<T extends LengthWise>(arg: T): T {
  console.log(arg.length)
  return arg
}
// loggingIdentity(3)
loggingIdentity({ length: 3 })

/**
 * 获取对象中 key 的值
 * @param obj 
 * @param key 
 * @returns 
 */
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

const obj = { a: 1, b: 2, c: 3, d: 4 }

getProperty(obj, 'a') // right
// getProperty(obj,'m') // error m 不在 obj 对象中

/**
 * 在函数中创建返回类
 * @param c 
 * @returns 
 */
function create<T>(c: { new(): T }): T {
  return new c()
}



/**
 * 蜜蜂管理员
 */
class BeeKeeper {
  hasMask: boolean
}

/**
 * 狮子管理员
 */
class LionKeeper {
  nameTag: string
}

class Animal {
  numLengs: number // 动物有几条腿
}

/**
 * 蜜蜂继承动物类，并定义管理员为蜜蜂的管理员
 */
class Bee extends Animal {
  keeper: BeeKeeper
}

/**
 * 狮子继承动物类，并定义管理员为狮子的管理员
 */
class Lion extends Animal {
  keeper: LionKeeper
}

/**
 * 创建实例
 * @param c 
 * @returns 
 */
function createInstance<T extends Animal>(c: new () => T): T {
  return new c()
}

createInstance(Lion).keeper.nameTag
createInstance(Bee).keeper.hasMask
```