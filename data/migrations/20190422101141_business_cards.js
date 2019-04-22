
exports.up = function(knex, Promise) {
  return knex.schema.createTable('business_cards', tbl => {

    tbl.increments();

    tbl.string('business_name').notNullable();
    tbl.string('contact_name').notNullable();
    tbl.string('email').notNullable();
    tbl.string('phone');
    tbl.string('img_url');
    tbl.string('address');
    tbl.string('fax');
    tbl.string('web_url');
    tbl.string('qr_url');
    tbl.integer('user_id').notNullable();

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('business_cards');
};
