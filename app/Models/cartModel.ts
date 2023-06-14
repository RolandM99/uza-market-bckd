module.exports = (sequelize: any, DataTypes: any) => {
    const Cart = sequelize.define("cart",{
        cartId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true,
        },
    });

    Cart.associate = (models: any) => {
        Cart.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    Cart.associate = (models: any) => {
        Cart.belongsTo(models.Product, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    return Cart;
};