// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOSTNAME,
      port: process.env.POSTGRES_CONTAINER_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
