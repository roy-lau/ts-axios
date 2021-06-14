## 接口

### 接口初探

```ts
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)
```

### 可选属性

```ts
interface Square {
  color: string,
  area: number
}
interface SquareConfig {
  color?: string,
  width?: number
}

function createSquare(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ color: 'black' })
```

### 只读属性

```ts

interface Point {
  readonly x: number,
  readonly y: number
}

let p1: Point = { x: 10, y: 20 }
// p1.x=5  // error

let a: number[] = [1, 2, 3, 4]
// 泛型
let ro: ReadonlyArray<number> = a

// 下面这三种方式都会编译报错
// ro[0] = 12 
// ro.push(5)
// ro.length = 10

// ok
a = ro as number[]
a[1] = 20
```

### 额外属性检查

```ts
// 方法一
interface Square {
  color: string,
  area: number
}
interface SquareConfig {
  color?: string,
  width?: number
}

function createSquare1(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let mySquare1 = createSquare1({ color: 'black', color1: 'yellow' } as SquareConfig)

// 方法二
interface Square {
  color: string,
  area: number
}
interface SquareConfig {
  color?: string,
  width?: number
}

function createSquare1(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}
let squareOpction = { color: 'black', color1: 'yellow' }
let mySquare1 = createSquare1(squareOpction)

// 方法三
interface Square {
  color: string,
  area: number
}
interface SquareConfig {
  color?: string,
  width?: number,
  [propName: string]: any // 额外字符串属性
}

function createSquare1(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare1 = createSquare1({ color: 'black', color1: 'yellow' })
```

### 函数类型

```ts

interface SearchFunc {
  (soucre: string, subString: string): boolean
}
// 全写
let mySearch: SearchFunc
mySearch = function (soucre: string, subString: string): boolean {
  let result = soucre.search(subString)
  return result > -1
}
// 简写
let mySearch1: SearchFunc
mySearch1 = function (src: string, sub: string): boolean {
  let result = src.search(sub)
  return result > -1
}
// 简写+类型推断
let mySearch2: SearchFunc
mySearch2 = function (src, sub) {
  let result = src.search(sub)
  return result > -1
}
```

### 可索引类型

```ts
interface StringArray {
  [index: number]: string
}
let myArray: StringArray
myArray = ['Bob', 'Fred']
let myStr: string = myArray[0]
let myStr1: string = myArray['0'] // 字符串数字皆可


interface StringArray {
  [index: number]: string
}
let myArray: StringArray
myArray = ['Bob', 'Fred']
let myStr: string = myArray[0]
let myStr1: string = myArray['0'] // 字符串数字皆可

class Animal {
  name: string
}
class Dog extends Animal {
  breed: string
}

interface NotOkay {
  [x: number]: Dog
  [x: string]: Animal
}

interface NumberDictionary {
  [index: string]: number
  length: number
  // name: string // error，已经设置为了 number
}

interface ReadonlyStringArray {
  readonly [index: number]: string
}

// 只读，所以下面两种方法会报错
// let myArray: ReadonlyStringArray = ['Alice', 'Bob']
// myArray[2] = 'Mallory'
```

### 类类型

```ts

interface ClockInterface {
  currentTime: Date

  setTime(d: Date)
}
class Clock implements ClockInterface {
  currentTime: Date

  constructor(h: number, m: number) {

  }

  setTime(d: Date) {
    this.currentTime = d
  }
}


interface ClockInterface1 {
  tick()
}
interface ClockContructor {
  new(hour: number, minute: number): ClockInterface1
}
function createClock(ctor: ClockContructor, hour: number, minute: number) {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface1 {
  constructor(h: number, m: number) {

  }
  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface1 {
  constructor(h: number, m: number) {

  }
  tick() {
    console.log('tick toc')
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)
```

### 继承接口

```ts
interface Shape {
  color: string
}
interface PenStroke {
  penWidth: number
}
interface Square extends Shape, PenStroke {
  sideLength: number
}
let squre = {} as Square
squre.color = 'blue'
squre.sideLength = 10
squre.penWidth = 5.0
```

### 混合类型

```ts

interface Counter {
  (start: number): string,
  interval: number
  
  reset(): void
}
function getCounter(): Counter {
  let counter = (function (start: number) {

  }) as Counter
  counter.interval = 300
  counter.reset = function () {

  }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

### 接口继承类

```ts

class Control {
  private state:any
}
// 接口继承类
interface SelectableControl extends Control{
  select()
}
// 类继承类工具接口
class Button extends Control implements SelectableControl{
  select(){}
}
// 类继承
class TextBox extends Control{
  select(){}
}
// error
// class Image  implements SelectableControl{
//   select(){}
// }
```
