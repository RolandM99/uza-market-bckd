module.exports = (sequelize: any, DataTypes: any) => {
  const User = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    userType: {
      type: DataTypes.ENUM("Vendor", "Buyer"),
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    shopInfo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });

  User.associate = (models: any) => {
    User.hasMany(models.Order, {
      onDelete: "cascade",
    });
    User.hasMany(models.Cart, {
      foreignKey: {
        allowNull: false,
      },
    });
    User.hasMany(models.Payment, {
      onDelete: "cascade",
    });
    User.hasMany(models.Shipment, {
      onDelete: "cascade",
    });
  };

  return User;
};

