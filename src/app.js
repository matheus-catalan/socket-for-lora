const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const routes = require("./routes")
const app = express()

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

module.exports = app
