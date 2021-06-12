let first = [1, 2]
let second = [3, 4]
let bothPlus = [0, ...first, ...second, 5]
console.log(bothPlus)

let defaults = {
  food: 'spicy',
  price: '$10',
  ambiance: 'noisy'
}
let search = { ...defaults, food: 'rich' }
console.log(search)