## 类

### 基本示例

```ts
class Greeter {
   greeting: string

   constructor(message:string){
     this.greeting = message
   }

   greet(){
     return 'Hello, ' + this.greeting
   }
}

const greeter = new Greeter('world')
greeter.greet()
```

### 继承

```ts
/** 基础的类继承 */
class Animal {
  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m`)
  }
}

class Dog extends Animal {
  back() {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.back()
dog.move(10)


/** 稍微复杂一点的类继承 */

// 基类 -- 动物类
class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`)
  }
}

// 蛇继承动物类
class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }

  move(distance: number = 5) {
    console.log('Slithering......')
    super.move(distance)
  }
}

// 马继承动物类
class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }

  move(distance: number = 45) {
    console.log('Galloping......')
    super.move(distance)
  }
}

const sam = new Snake('Sammy')
const tom: Animal = new Horse('Tommy')

sam.move()
tom.move(50)
// Slithering......
// Sammy moved 5m
// Galloping......
// Tommy moved 50m
```

### 公共，私有与受保护的修饰符

> 类里面的所有方法或变量默认都是公共的(`public`) 

```ts

/**
 * 演示公共，私有修饰符
 */
class Animal {
  private name: string

  constructor(name: stirng){
    this.name = name
  }

  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`)
  }
}

// new Animal('Cat').name // XX name 不能在外部访问，因为它是私有的(`private`)

// Rhino 犀牛
class Rhino extends Animal {
  constructor(){
    super('Rhino')
  }
}

// Employee 雇员
class Employee {
  private name: string

  constructor(name:string){
    this.name = name
  }
}

const animal = new Animal('Goat')
const rhino = new Rhino()
const employee = new Employee('Bob')

animal = rhino // right
// animal = employee // errror 因为 animal 和 employee 没有共同的类


/**
 * 演示受保护的修饰符
 */

class Person {
  protected name: string

  constructor(name:string){
    this.name = name
  }
}

class Employee extends Person {
  private department: string // 职位

  constructor(name:string, department:string){
    super(name)
    this.department = department
  }

  // 获取自我介绍
  getElevatorPitch(){
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}

const howard = new Employee('Howard','Sales')
console.log(howard.getElevatorPitch())
// console.log(howard.name) // howard 无法访问 name，因为 name 是受保护的(`protected`)
// cosnt john = new Person('John') // new Person 无法被实例化，因为它传入了受保护(name)的参数
```

### readonly 修饰符

```ts

/**
 * 演示 readonly 修饰符
 */
// 方法一
class Person {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }
}

const john = new Person('John')
console.log(john.name) // right 可以被读取
// john.name = 'Bob' // error 不能修改

// 方法二
class Person1 {
  constructor(readonly name: string) { }
}

const john1 = new Person1('John')
console.log(john1.name) // right 可以被读取
// john.name = 'Bob' // error 不能修改
```

### 存取器

```ts
// 方法一 简单示例
class Employee {
  fullName: string
}

const employee = new Employee()
employee.fullName = 'Bob Smith'
if(employee.fullName){
  console.log(employee.fullName)
}

// 方法二 tsc examples/TypeScript/class.ts --target es5 需要编译成 es5 以上才能正常执行
let passCode = 'secret passcode'
class Employee {
  private _fullName:string
  
  get fullName():string{
    return this._fullName
  }
  // 如果密码正确可以修改名字，如果密码错误不可以修改名字
  set fullName(newName:string){
    if(passCode && passCode === 'secret passcode'){
      this._fullName = newName
    } else {
      console.log('Error: unauthorized update of employee!')
    }
  }
}

const employee = new Employee()
employee.fullName = 'Bob Smith'
if(employee.fullName){
  console.log(employee.fullName)
}
```

### 静态属性

```ts
// 网格距离原点的距离
class Grid {
  static origin = { x: 0, y: 0 }

  scale: number // 缩放比

  constructor(scale: number) {
    this.scale = scale
  }

  // 计算传入的坐标与原点的距离
  calculateDistanceFromOrigin(point: { x: number, y: number }) {
    const xDist = point.x - Grid.origin.x
    const yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
  }
}

const grid1 = new Grid(1.0)
const grid2 = new Grid(5.0)

console.log(grid1.calculateDistanceFromOrigin({x:3,y:4}))
console.log(grid2.calculateDistanceFromOrigin({x:3,y:4}))
```

### 抽象类

> 抽象类和抽象方法通过 `abstract` 关键字来实现

```ts
// 示例一
abstract class Animal { // 抽象类
  abstract makeSound(): void  // 抽象方法

  move(): void {
    console.log('roaming the earth...')
  }
}

// 示例二
abstract class Department {
  name: string

  constructor(name: string) {
    this.name = name
  }

  printName(): void {
    console.log('Department name ' + this.name)
  }

  abstract printMeeting(): void
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing')
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am')
  }

  genterateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department

department = new AccountingDepartment()
department.printName()
department.printMeeting()
// department.genterateReports() error 因为 department 定义的是 Department，Department 类里没有定义 genterateReports 方法所以这里会报错
```

### 高级技巧

```ts
// 示例一
class Greeter {
  static standardGreeting = 'Hello, world'

  greeting: string

  constructor(message?: string) {
    this.greeting = message
  }

  greet() {
    if (this.greeting) return 'Hello, ' + this.greeting
    else return Greeter.standardGreeting
  }
}

let greeter: Greeter
greeter = new Greeter()
console.log(greeter.greet())

let greeter1: Greeter = new Greeter('there')
console.log(greeter1.greet())

let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey standard there'

let greeter2: Greeter = new Greeter()
console.log(greeter2.greet())

// 示例二 接口继承类
class Point {
  x: number
  y: number
}
interface Point3d extends Point {
  z: number
}

const point3d: Point3d = { x: 1, y: 2, z: 3 }
```
