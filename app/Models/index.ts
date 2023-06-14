const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

export const db : any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, DataTypes);
db.product = require("./productModel")(sequelize, DataTypes);
db.order = require("./orderModel")(sequelize, DataTypes);
db.payment = require("./paymentModel")(sequelize, DataTypes);
db.shipment = require("./shipmentModel")(sequelize, DataTypes);
db.whitelist = require("./whitlistModel")(sequelize, DataTypes);
db.cart = require("./cartModel")(sequelize, DataTypes);

module.exports = db;