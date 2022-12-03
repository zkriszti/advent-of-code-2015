const { getData } = require('../utils')

const data = getData(__dirname)

const formattedData = data.split('\r\n')

const getLetterValue = (str) => {
  // replace letter with (ASCII codes - 64):
  // ASCII goes for [A-Z] from 65-90, but for our rules: 27-52: deduct 38
  // ASCII goes for [a-z] from 97-122, but for our rules: 1-26: deduct 96
  // const value = intersection.toUpperCase() === intersection ? intersection.charCodeAt(0) - 38 : intersection.charCodeAt(0) - 96
  return str.toUpperCase() === str ? str.charCodeAt(0) - 38 : str.charCodeAt(0) - 96
}

const splitRucksacks = formattedData.map(rs => {
  const rsSize = rs.length
  const part1 = rs.slice(0, rsSize / 2).split('')
  const part2 = rs.slice(rsSize / 2).split('')
  const intersection = part1.filter(x => part2.includes(x))[0];
  return getLetterValue(intersection)
}).reduce((acc, curr) => acc += curr)

console.log(splitRucksacks)

// PART 2:
// group the elves first:
const groupSize = 3
let elvesGrouped = []
for (let i = 0; i < formattedData.length; i += groupSize) {
    elvesGrouped.push(formattedData.slice(i, i + groupSize))
}

// find the one single match for each group respectively
const result = elvesGrouped.map(arr => {
  const splitArrays = arr.map(a => a.split(''))
  const is12 = splitArrays[0].filter(x => splitArrays[1].includes(x))
  const intersection = splitArrays[2].filter(y => (is12.includes(y)))
  return intersection[0]
})
.map(letter => getLetterValue(letter))
.reduce((acc, curr) => acc += curr)

console.log(result)

