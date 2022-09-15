const http = require("http")
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const routes = require("./routes")
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }))
// app.use(express.json())
// app.use(express.json({ type: "application/vnd.api+json" }))
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

const onConnection = (socket) => {
  console.log("socket connected!")
  // openPort()
  // should_read_serial(true)
  // // readSerial()
}

io.on("connection", (socket) => {
  console.log("Made socket connection")
  socket.emit("test", `Response to: ${"teste"}`)
})

io.on("getMessage", (socket) => {})

module.exports = app
