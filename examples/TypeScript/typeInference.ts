/**
 * 类型推断
 */

let num = 3

let x = [0, 1, null] // TS 会自定推断数组里的数据类型

class Animal {
  numLegs: number
}

class Bee extends Animal { }

class Lion extends Animal { }

function createZoo(): Animal[] {
  return [new Bee(), new Lion()]
}

window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.clickTime)
}