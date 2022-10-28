const { SerialPort } = require("serialport")

module.exports = {
  all() {
    let ports = SerialPort.list().finally()

    return ports
  },
}
