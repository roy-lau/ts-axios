## 函数

### 基本示例

```ts
function add(x, y) {
  return x + y
}
```

### 函数类型

```ts
function add(x: number, y: number): number {
  return x + y
}

const myAdd = (x: number, y: number): number => x + y
```

### 可选参数和默认参数

```ts

// base
function buildName(firstName: string, lastName: string): string {
  return firstName + ' ' + lastName
}

// const res1 = buildName('Bob') // error 少参数
// const res1 = buildName('Bob','Adams','Sr.') // error 多参数
const res1 = buildName('Bob', 'Adams') // right result ==> Bob Adams


// 可选参数
function buildName1(firstName: string, lastName?: string): string {
  if (lastName) return firstName + ' ' + lastName
  else return firstName
}

const ret1 = buildName1('Bob') // right ret1 ==> Bob
// const ret2 = buildName('Bob','Adams','Sr.') // error 多参数
const ret3 = buildName('Bob', 'Adams') // right ret3 ==> Bob Adams


// 参数默认值
function buildName2(firstName: string, lastName='Simth'): string {
  if (lastName) return firstName + ' ' + lastName
  else return firstName
}

const ret_1 = buildName2('Bob') // right ret1 ==> Bob Simth
// const ret_2 = buildName2('Bob') // error 多参数
const ret_3 = buildName2('Bob','Adams') // right ret1 ==> Bob Adams

// 多个参数
function buildName3(firstName: string, ...restOfName: string[]): string {
  if (restOfName.length) return firstName + ' ' + restOfName.join()
  else return firstName
}
```

### this

```ts

interface Card {
  suit: string
  card: number
}
interface Deck {
  suits: string[]
  cards: number[]

  createCardPiker(this: Deck): () => Card
}
/**
 * 随机发牌函数，通过 interface 设置 this 指向
 */
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPiker: function (this: Deck) {
    return () => {
      const pickedCard = Math.floor(Math.random() * 52)
      const pickedSuit = Math.floor(pickedCard / 13)
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}
let n = 0
while (n < 100) {
  const cardPicker = deck.createCardPiker()
  const pickedCard = cardPicker()
  console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)
  n++
}


/**
 * 回调函数的 this
 */
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void
}
class Handler {
  type: string

  onClickBad = (e: Event) => {
    this.type = e.type
  }
}
let h = new Handler()
let uiElement: UIElement = {
  addClickListener() {

  }
}
uiElement.addClickListener(h.onClickBad)
```
### 重载

```ts
/**
 * 重载函数示例
 */
let suits = ['hearts', 'spades', 'clubs', 'diamonds']
// - ******* 重载
function pickCard(x: { suit: string, card: number }[]): number
function pickCard(x: number): { suit: string, card: number }

function pickCard(x): any {
  if (Array.isArray(x)) {
    const pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (typeof x === 'number') {
    const pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}
const myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
const pickedCard1 = myDeck[pickCard(myDeck)]
console.log('card: ' + pickedCard1.card + 'of' + pickedCard1.suit)
const pickedCard2 = pickCard(15)
console.log('card: ' + pickedCard2.card + 'of' + pickedCard2.suit)
```
