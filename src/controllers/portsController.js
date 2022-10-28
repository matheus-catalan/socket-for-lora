const Port = require("../models/port")

module.exports = {
  async index(req, res) {
    let ports_a = await Port.all()
    const ports = []

    ports_a.forEach((port) => {
      ports.push(port.path)
    })

    return res.json(ports)
  },
}
