const { getData } = require('../utils')

const data = getData(__dirname)

const formattedData = data.split('\r\n').map(row => {
  return row.split(",").map(rs => rs.split("-").map(nr => parseInt(nr)))
})

isThereAFullCover = (arr1, arr2) => {
  if ((arr1[0] <= arr2[0] && arr1[1] >= arr2[1]) || (arr1[0] >= arr2[0] && arr1[1] <= arr2[1])) {
    return true
  }
  return false
}

const result = formattedData.filter(pair => isThereAFullCover(pair[0], pair[1])).length
console.log(result)

// PART 2:
isThereAFullOrPartialCover = (arr1, arr2) => {
  if (
    (arr1[0] <= arr2[0] && arr1[1] >= arr2[1]) || (arr1[0] >= arr2[0] && arr1[1] <= arr2[1]) // full cover
    || (arr1[0] <= arr2[1] && arr1[1] >= arr2[0]) // partial cover
  ) {
    return true
  }
  return false
}

const res2 = formattedData.filter(pair => isThereAFullOrPartialCover(pair[0], pair[1])).length
console.log(res2)
