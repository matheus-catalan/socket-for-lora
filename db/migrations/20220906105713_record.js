exports.up = function(knex) {
  return knex.schema.createTable("records", function(table) {
    table.increments()
    table.string("name")
    table.string("description")
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("records")
}
