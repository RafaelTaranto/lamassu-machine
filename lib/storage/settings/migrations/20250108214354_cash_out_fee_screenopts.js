exports.up = function (knex) {
  return knex.schema
    .alterTable('coins', function (table) {
      table.text('cashOutFee').notNullable().defaultTo('0')
    })
    .createTable('screenOptions', function (table) {
      table.boolean('ratesScreenActive').notNullable().defaultTo(false)
    })
}

exports.down = function (knex) {
  return knex.schema
    .table('coins', function (table) {
      table.dropColumn('cashOutFee')
    })
    .dropTable('screenOptions')
} 