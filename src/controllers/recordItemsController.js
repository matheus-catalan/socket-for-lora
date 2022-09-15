const RecordItem = require("../models/recordItem")
const { getData, setData } = require("../models/log")

module.exports = {
  async index(req, res) {
    const results = await RecordItem.all()
    return res.json(results)
  },
  async getByRecordId(req, res) {
    const results = await RecordItem.getByRecordId(req.params.record_id)

    return res.json(results)
  },
  async create(req, res) {
    try {
      const record_item = await RecordItem.create(req.body)

      return res.status(201).send({ record_item })
    } catch (error) {
      next(error)
    }
  },
  async update(req, res, next) {
    try {
      const record = await RecordItem.update(req.body, req.params.id)

      return res.status(201).send({ record_item })
    } catch (error) {
      next(error)
    }
  },
  async delete(req, res, next) {
    try {
      RecordItem.delete(req.params.id)
      return res.status(200).send()
    } catch (error) {
      next(error)
    }
  },
}
