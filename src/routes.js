const express = require("express")
const routes = express.Router()

const recordsController = require("./controllers/recordsController")
const recordItemsController = require("./controllers/recordItemsController")
const portsController = require("./controllers/portsController")

routes
  .get("/records", recordsController.index)
  .post("/records", recordsController.create)
  .put("/records/:id", recordsController.update)
  .delete("/records/:id", recordsController.delete)

routes
  .get("/record_items", recordItemsController.index)
  .get("/record_items/:record_id", recordItemsController.getByRecordId)
  .post("/record_items", recordItemsController.create)
  .put("/record_items/:id", recordItemsController.update)
  .delete("/record_items/:id", recordItemsController.delete)

routes.get("/ports", portsController.index)

routes.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

module.exports = routes
