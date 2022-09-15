const data = []

const setData = (obj) => {
  data.push(obj)
}

const getData = () => {
  return data
}

module.exports = { getData, setData }
