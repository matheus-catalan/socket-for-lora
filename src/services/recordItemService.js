module.exports = (io) => {
  const pushData = function(payload) {
    const socket = this // hence the 'function' above, as an arrow function will not work
    console.log(socket)
  }

  return {
    pushData,
  }
}
