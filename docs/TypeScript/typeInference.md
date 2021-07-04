## 类型推断

### 基础

```ts
let num = 3 // 默认会将 num 推断为类型 number
```

### 最佳通用类型

```ts
let x = [0, 1, null] // TS 会自定推断数组里的数据类型

class Animal {
  numLegs: number
}

class Bee extends Animal { }

class Lion extends Animal { }

const zoo = [new Bee(), new Lion()] // TS 会自定推断数组里的数据类型
```

### 上下文类型

```ts
window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.clickTime)
}

class Animal {
  numLegs: number
}

class Bee extends Animal { }

class Lion extends Animal { }

function createZoo(): Animal[] {
  return [new Bee(), new Lion()]
}
```
