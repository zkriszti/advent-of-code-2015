const { getData } = require('../utils')

const data = getData(__dirname)

const formattedData = data.split('\n').map(str => str.replace("/r", "")).map(str => parseInt(str, 10))

const splitIndexes = formattedData.map((item, index) => {
  if (!item) {
    return index
  }
}).filter(item => !!item)

splitIndexes.push(formattedData.length)

const newArr = []
let startIndex = 0
splitIndexes.forEach(splitIndex => {
  const elf = formattedData.slice(startIndex, splitIndex)
  newArr.push(elf)
  startIndex = splitIndex + 1
})

// PART 1:
// list for each elf's total carried calories: newArr.map(arr => arr.reduce((acc, curr) => acc += curr))
const res = Math.max(...newArr.map(arr => arr.reduce((acc, curr) => acc += curr)))
console.log(res)

// PART 2:
// sum of calories carried by top 3 elves:
const res2 = newArr.map(arr => arr.reduce((acc, curr) => acc += curr)).sort((a,b) => b-a).slice(0,3).reduce((acc, curr) => acc += curr)
console.log(res2)

