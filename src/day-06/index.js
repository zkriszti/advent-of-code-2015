const { getData } = require('../utils')

const data = getData(__dirname)

const getUniqueFourLetteredSubstring = (str, messageLength) => {
  const splitString = str.split('')
  let resultString
  const result = splitString.map((letter, index) => {
    const subStr = splitString.slice(index, index + messageLength)
    const reduceSameCharacters = new Set(subStr)
    if (reduceSameCharacters.size === subStr.length) {
      resultString = subStr
      console.log(index + messageLength)
      splitString.splice(index) // don't map on further items once we have a hit
    }
  })
}

// part 1:
getUniqueFourLetteredSubstring(data, 4)

// part 2:
getUniqueFourLetteredSubstring(data, 14)