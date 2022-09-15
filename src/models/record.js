const knex = require("../../db")

module.exports = {
  async all() {
    return await knex("records")
  },
  async create(params) {
    const { name, description } = params
    try {
      return await knex("records").insert({
        name,
        description,
      })
    } catch (error) {
      return error
    }
  },
  async update(params, record_id) {
    try {
      const { name, description } = params

      return await knex("records")
        .update({ name, description })
        .where({ id })
    } catch (error) {
      return error
    }
  },
  async delete(record_id) {
    try {
      return await knex("records")
        .where({ id })
        .del()
    } catch (error) {
      return error
    }
  },
}
