const { getData } = require('../utils')

const data = getData(__dirname)

const formattedData = data.split('\r').map(r => r.replace('\n', ''))

// console.log(formattedData)

// get first part, without col nrs:
const colRowIndex = formattedData.findIndex(fd => fd.startsWith(' 1'));
// console.log(colRowIndex)

// const dataWithReplacedSpaces = formattedData.map(row => row.replace('    ', '[-] '))
// const dataWithReplacedSpaces = formattedData.map(row => row.replace('    ', ' '))
// const dataWithReplacedSpaces = formattedData.map(row => row.replace('    ', '   '))
// console.log(dataWithReplacedSpaces)

// get part of formatted data which only contains crates:
const cratesData = formattedData.slice(0, colRowIndex).map(str => str.replace(/[\[\]]/g, '')).map(str => str.replace(/\s{3,}/g, '*')).map(str => str.replace(/\s/g, '')).map(str => str.split(''))
console.log('cratesData:', cratesData)

const transpose = arr => {
  for (let i = 0; i < arr.length; i++) {
     for (let j = 0; j < i; j++) {
        const tmp = arr[i][j];
        arr[i][j] = arr[j][i];
        arr[j][i] = tmp;
     };
  }
  return arr
}

const reversed = transpose([...cratesData]).map(arr => arr.reverse()).map(arr => arr.map(item => {
  if (!item) { item = '*'} // just make *s and undefineds consistent: * is 3 spaces replaced, undefined when there's no item at end
  return item
}))

console.log(reversed)

// get instructions:
const instructions = formattedData.slice(colRowIndex + 2).map(instr => {
  const splitInstruction = instr.split(' ')
  return Object.assign({}, {
    count: parseInt(splitInstruction[1]),
    fromIndex: parseInt(splitInstruction[3] - 1), // keep in mind 0-based array indexing
    toIndex: parseInt(splitInstruction[5] - 1)
  })
})
// console.log(instructions)

instructions.forEach((instr, i) => {
  const sourceStack = instr.fromIndex
  const targetStack = instr.toIndex

  const insertIndex = reversed[targetStack].findIndex(item => item === '*') // we can have * * * at the end...
  // console.log('ii', insertIndex)
  // console.log('icount', instr.count)
  // console.log('reversed[sourceStack]', reversed[sourceStack])
  const itemsToMove = reversed[sourceStack].splice(reversed[sourceStack].length - instr.count) // remove from targetStack, so splice
  const itemsToMoveReversed = itemsToMove.reverse() // reverse itemsToMove, because we can only move one piece at a time, starting w/ the topmost

  if (insertIndex > -1) {
    // insert instead of first star
    reversed[targetStack].splice(insertIndex, instr.count, ...itemsToMoveReversed)
  } else {
    // just push
    reversed[targetStack].push(...itemsToMoveReversed)
  }

  console.log('after step', i, reversed)

  const fullMessage = reversed.map(arr => arr[arr.length - 1]).join('')
  console.log(fullMessage)
})
