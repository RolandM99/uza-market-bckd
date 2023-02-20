module.exports = {
    HOST: "localhost",
    USER: "roland",
    PASSWORD: "1234",
    DB: "game_time_db",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };