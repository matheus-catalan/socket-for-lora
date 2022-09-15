exports.up = function(knex) {
  return knex.schema.createTable("record_items", function(table) {
    table.increments()
    table.float("value_1")
    table.float("value_2")
    table.float("value_3")
    table.float("value_4")
    table
      .integer("record_id")
      .references("records.id")
      .onDelete("CASCADE")

    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable("record_items")
}
