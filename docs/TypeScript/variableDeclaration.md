## 变量声明

### var 的使用场景

```js

// 闭包
function f() {
  var a = 10
  return function g() {
    var b = a + 1
    return b
  }
}

var g = f()
g() // 11

// 变量提升
function f(shouldInitialize) {
  if (shouldInitialize) {
    var x = 10
  }
  return x
}

f(true) // 10
f(false) // undefined

/**
 * 变量重写
 */

// bed
function sumMatrix(matrix) {
  var sum = 0
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i]
    for (var i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }
  return sum
}

var matrix = [
  [1, 2, 3],
  [4, 5, 6]
]
console.log(sumMatrix(matrix))  // 6

// good
function sumMatrix(matrix) {
  var sum = 0
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i]
    for (var j = 0; j < currentRow.length; j++) {
      sum += currentRow[j]
    }
  }
  return sum
}

var matrix = [
  [1, 2, 3],
  [4, 5, 6]
]
console.log(sumMatrix(matrix))  // 21

// bad
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i)
  }, 100 * i)
}

// good
for (var i = 0; i < 10; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j)
    }, 100 * j)
  })(i)
}
```

### let 的使用场景

```js

/** 
 * 变量作用域
 */

// 内部变量可以访问外部变量，但是外部变量访问不了内部变量
function f(input: boolean) {
  let a = 100

  if (input) {
    let b = a + 1
    return b
  }
  return b
}

try {
  throw "Oh no"
} catch (e) {
  console.log("catch it")
}
console.log(e)

/**
 * 暂时性死区
 */

// 变量未声明前，不能对变量进行操作
a++
let a = 1


function foo() {
  return b
}
foo() // 变量声明前调用这个函数，会报错
let b
foo() // 变量声明后调用这个函数，不会报错

/**
 * 同一变量名不能重复声明
 */

// error
let c = 1
let c = 2

// error
function g1(d) {
  let d = 3
}
function g2() {
  let e = 3
  let e = 3
}

// ok
function f1(condition, x) {
  if (condition) {
    let x = 100
    return x
  }
  return x
}
f1(false, 10)
f1(true, 20)

// ok
// 内层的 i 和外层的 i 可以理解为不是同一个变量，所以这样是正确的，但也应该尽量的避免这样写。
function sumMatrix(matrix: number[][]) {
  let sum = 0
  for (let i = 0; i < matrix.length; i++) {
    let currentRow = matrix[i]
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }
  return sum
}
let matrix = [
  [1, 2, 3],
  [4, 5, 6]
]
console.log(sumMatrix(matrix))
// ok
var h = 1
var h = 2

/**
 * 块级作用域变量
 */

// bad
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i)
  }, 100 * i)
}
// good 
for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i)
  }, 100 * i)
}
```

### const 的使用场景

> 正常情况下，凡是不会改变的使用 const，其他情况下使用 let

```js
const numLivesForCat = 9 // 猫有 9 条命

const kitty = {
  name: 'kitty',
  numLives: numLivesForCat
}

kitty.name = 'Jerry'
kitty.numLives--
```

### 解构

```js

/**
 * 数组解构
 */
let input: [number, number] = [1, 2]

function f([first, second]: [number, number]) {
  console.log(first)
  console.log(second)
}

f(input)


let [first, ...rest] = [1, 2, 3, 4, 5]
console.log(first)
console.log(rest)

let [, second, , fourth] = [1, 2, 3, 4, 5]
console.log(second)
console.log(fourth)

/**
 * 对象结构
 */

let o = {
  a: 'foo',
  b: 18,
  c: 'bar'
}

let { a, ...passthrough } = o
let total = passthrough.b + passthrough.c.length
console.log(total) // 21

let { a: newName1, b: bnewName2 } = o
let { a, b }: { a: string, b: number } = o

function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject
}

type C = { a: string, b?: number }

function f({ a, b = 0 } = { a: '' }): viod {
  console.log(a, b)
}
f({ a: 'yes' })
f()
// f({}) // error
```

### 展开

```js

/**
 * 展开
 */

// 数组展开
let first = [1, 2]
let second = [3, 4]
let bothPlus = [0, ...first, ...second, 5]
console.log(bothPlus) // [ 0, 1, 2, 3, 4, 5 ]
 
// 对象展开
let defaults = {
  food: 'spicy',
  price: '$10',
  ambiance: 'noisy'
}
let search = { ...defaults, food: 'rich' }
console.log(search) // { food: 'rich', price: '$10', ambiance: 'noisy' }
```
