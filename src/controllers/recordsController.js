const Record = require("../models/record")

module.exports = {
  async index(req, res) {
    const results = await Record.all()
    return res.json(results)
  },
  async create(req, res) {
    try {
      const record = await Record.create(req.body)

      return res.status(201).send({ record })
    } catch (error) {
      next(error)
    }
  },
  async update(req, res, next) {
    try {
      const record = await Record.update(req.body, req.params.id)

      return res.status(201).send()
    } catch (error) {
      next(error)
    }
  },
  async delete(req, res, next) {
    try {
      Record.delete(req.params.id)
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  },
}
