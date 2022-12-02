const { getData } = require('../utils')

const data = getData(__dirname)

const formattedData = data.split('\n').map(d => d.replace('\r', '')).map(d => d.replace(' ', '')) // each array item represents one round

const drawCases = ['AX', 'BY', 'CZ']
const winCases = ['CX', 'AY', 'BZ']

// Puzzle rules: your score = your choiceScore + your outcomeScore
/**
 * Returns your score for a given round.
 *
 * @param {string} roundData The two-letter string for the given round, composed of opponent's choice + your choice
 * @return {number} yourRoundScore Your score for the given round
 */

const getYourScore = (roundData) => {
  let outcomeScore, choiceScore
  if (drawCases.includes(roundData)) {
    outcomeScore = 3
  } else if (winCases.includes(roundData)) {
    outcomeScore = 6
  } else {
    outcomeScore = 0
  }

  if (roundData[1] === 'X') {
    choiceScore = 1
  } else if (roundData[1] === 'Y') {
    choiceScore = 2
  } else {
    choiceScore = 3
  }
  const yourRoundScore = outcomeScore + choiceScore
  return yourRoundScore
}

const res = formattedData.map(d => getYourScore(d)).reduce((acc, curr) => acc +=curr)
console.log(res)

// second part:
// turns out that last character means desired result: X - you need to lose, Y - draw, Z- win
// first char is still opponent's choice

// ---- solution strategy:
// replace space in the string with your choice (getReplacer) based on desired result
// last character won't be needed anymore

/**
 * Returns your necessary choice for a desired result.
 *
 * @param {string} oppsChoice opponent's choice
 * @param {string} desiredResult the desired result
 * @return {string} myChoice Your necessary choice to get the desired result
 */

const getReplacer = (oppsChoice, desiredResult) => {
  let myChoice
  if (desiredResult === "X") {
    myChoice = oppsChoice === "A" ? "Z" : (oppsChoice === "B" ? "X" : "Y")
  } else if (desiredResult === "Y") {
    myChoice = oppsChoice === "A" ? "X" : (oppsChoice === "B" ? "Y" : "Z")
  } else {
    myChoice = oppsChoice === "A" ? "Y" : (oppsChoice === "B" ? "Z" : "X")
  }
  return myChoice
}

const formattedData2 = data.split('\n').map(d => d.replace('\r', '')).map(d => d.replace(' ', getReplacer(d[0], d[2]))).map(str => str.slice(0, -1))

// now we can reuse our score calculation from Part 1
const res2 = formattedData2.map(d => getYourScore(d)).reduce((acc, curr) => acc +=curr)
console.log(res2)

