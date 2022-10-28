const { SerialPort } = require("serialport")
const { getData, setData } = require("../../models/log")
const { getPort, setPort } = require("../../models/port")

let serial = null

let should_read = false
var io = null

export function should_read_serial(should) {
  should_read = should
}

export function set_io(_io) {
  io = _io
}

export function closePort() {
  serial.close()
  serial.write("n")
}

export function openPort() {
  const promise = new Promise((resolve, reject) => {
    let port = getPort()

    if (port == null) {
      reject("Port Serial not selected")
    }
    serial = new SerialPort({
      path: port,
      baudRate: 9600,
      autoOpen: false,
    })

    serial.open((err) => {
      if (err) {
        serial.close()
        reject(err)
      } else {
        serial.flush()
        serial.write("y")
        should_read = true

        resolve(true)
      }
    })
  })
  return promise
}

export function readSerial() {
  if (should_read) {
    const log = serial.read()

    if (log != null) {
      try {
        let data = log.toString()
        console.log(data)
        console.log(typeof data)
        data = data.replace("\n", "")
        data = data.replace("\t", "")
        data = data.replace("   NAN", null)
        data = data.split("/")

        // if (data.length != 11)

        setData(data)
        io.emit("data", getData())
      } catch (err) {
        console.log("connect_serial", {
          status: false,
          message: `error on connection port serial or read serial: ${err}`,
        })
        io.emit("connect_serial", {
          status: false,
          message: "error on connection port serial or read serial!",
        })
      }
    }
  }
  setTimeout(readSerial, 2500)
}
