const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const routes = require("./src/routes")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: "*",
  },
})
const { setPort } = require("./src/models/port")

const {
  openPort,
  closePort,
  set_io,
  readSerial,
} = require("./src/services/serial/index")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }))
app.use(express.json())
app.use(express.json({ type: "application/vnd.api+json" }))
app.use(helmet())
app.use(morgan("dev"))

app.use(routes)

app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} on socket`)

  socket.emit("connected", { status: true })

  socket.on("set_port", (port, callback) => {
    console.log(port);
    setPort(port)
    callback({ status: true });
  })

  socket.on("get_data", (callback) => {
    openPort()
      .then((status) => {
        if(!status) {
          throw new Error("Port not supported");
        }
        console.log("Connected on port serial!")
        callback({
          status: true,
          message: "Connected on port serial!",
        });
        set_io(socket)
        readSerial()
      })
      .catch((err) => {
        console.log(`error on Connected port serial: ${err}`)
        // callback({
        //   status: false,
        //   message: `error on Connected port serial: ${err}`,
        // });
      })
  })

  socket.on("disconnect", () => {
    closePort()
    console.log("Disconnected on port serial!")
  })
})

app.set("io", io)

const PORT = process.env.PORT || 3030
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})

module.exports = { app: app, io: io }
