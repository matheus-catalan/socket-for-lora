const knex = require("../../db")

module.exports = {
  async all() {
    return await knex("record_items")
  },
  async getByRecordId(record_id) {
    return await knex("record_items").where({ record_id })
  },
  async create(params) {
    const { value_1, value_2, value_3, value_4, record_id } = params
    try {
      return await knex("record_items").insert({
        value_1,
        value_2,
        value_3,
        value_4,
        record_id,
      })
    } catch (error) {
      return error
    }
  },
  async update(params, record_id) {
    try {
      const { value_1, value_2, value_3, value_4, record_id } = params

      return await knex("record_items")
        .update({ value_1, value_2, value_3, value_4, record_id })
        .where({ id })
    } catch (error) {
      return error
    }
  },
  async delete(id) {
    try {
      return await knex("record_items")
        .where({ id })
        .del()
    } catch (error) {
      return error
    }
  },
}
