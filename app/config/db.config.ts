module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "man1234",
    DB: "b2b_marketplace_db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };