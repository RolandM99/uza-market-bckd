module.exports = (sequelize: any, DataTypes: any) => {
    const Product = sequelize.define("product", {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      productCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reviews: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      productDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Product.associate = (models: any) => {
      // Define the association with the User model
      Product.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
        // Define the association with the Cart model
        Product.hasMany(models.Cart, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
  
    return Product;
  };
  