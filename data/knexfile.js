// Update with your config settings.

const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://fpgsjfegczxxaf:2d3868721debd44fbc01b5d6169a644d06ac2fcedcae6df7c83fd9f21a1f11d9@ec2-54-225-116-36.compute-1.amazonaws.com:5432/d3nsonb4gkpnjb',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }

};
