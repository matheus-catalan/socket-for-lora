const { SerialPort } = require("serialport")
let port = null

module.exports = {
  all() {
    let ports = SerialPort.list().finally()

    return ports
  },
  getPort() {
    return port
  },
  setPort(port_ = "/dev/tty.usbmodem14101") {
    port = port_
  },
}
