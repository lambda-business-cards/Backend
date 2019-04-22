
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {

    tbl.increments();

    tbl.string('username').unique().notNullable();
    tbl.string('password').unique().notNullable();
    tbl.string('email').unique().notNullable();
    tbl.string('phone').unique().notNullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
