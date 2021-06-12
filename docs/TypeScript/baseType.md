## 基础类型

### 布尔值

```ts
const isDone: boolean = true
```

### 数字

```ts
  const decLiteral: number = 20 // 十进制
  const hexLiteral: number = 0x14 // 十六进制 20
  const binaryLiteral: number =  0b10100 // 二进制 20
  const octalLiteral: number =  0o24 // 八进制 20
```

### 字符串

```ts
  const myName: string = 'RoyLau'
  const age: number = 18
  const sentence = `Hello, my name is ${myName},
  I'll be ${age+1} year old next month.`
```

### 数组

```ts
const list1: number[] = [1,2,3]
const list2: Array<number> = [1,2,3]
```

### 元祖 Tuple

```ts
let x: [string, number]
x = ['hello', 10]
x[2] = '越界元素'

let x: [string, number]
x = ['hello', 10]
x[3] = 'world' // Tuple type error
```

### 枚举

```ts
enum Color1 {
  Red,
  Green,
  Blue
}
const greenId: Color1 = Color1.Green // 1

enum Color2 {
  Red = 1,
  Green = 2,
  Blue = 4
}
const greenName: string = Color2[2] // 'Green'
```

### any

```ts
let notSure: any = 5
notSure = 'maybe a string instead'
notsure = false

let list: any[] = [1,true,'free']
list[0] = 100
```

### void

```ts
function warnUser(): viod {
  console.log('This is my waring message')
}

let unusable: void = undefined
let unusable1: void = null
```

### null 和 undefined

```ts
// 新版 TS 将 undefined null 都归为 void
let u: undefined = undefined
let n: null = undefined

let num: undefined | number = undefined
num = 3
```

### never

```ts
function error(message: string): never {
  throw new Error(message)
}

function fail() {
  return error('something faild')
}

// 无限循环函数
function inifiniteLoop(): never {
  while(true){

  }
}
```

### object

```ts
// 声明一个函数
declare function create(o: object | null): void;
// right
create({prop: 0})
create(null)
// error
create(123)
create('string')
create(false)
create(undefined)

```

### 类型断言

```ts
let someValue: any = 'this is a string'
someValue.length // ERROR 找不到 length，因为不是字符串类型
// 下面这两种方法可以找到 length
let strLength: number = (<string>someValue).length
let strLength: number = (someValue as string).length
```

