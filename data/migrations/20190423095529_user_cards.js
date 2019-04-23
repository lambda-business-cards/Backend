
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_cards', tbl => {

    tbl.integer('user_id').notNullable().references('id').inTable('users');
    tbl.integer('card_id').notNullable().references('id').inTable('business_cards');
    tbl.string('comment');

    tbl.primary(['user_id', 'card_id']);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_cards');
};
