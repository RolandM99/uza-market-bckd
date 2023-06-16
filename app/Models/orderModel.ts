module.exports = (sequelize: any, DataTypes: any) => {
    const Order = sequelize.define("order", {
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
            allowNull: false,
        },
    });

    Order.associate = (models: any) => {
        // Define the association with the User model
        Order.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
        // Define the association with the item model
        Order.hasMany(models.OrderItem, {
            onDelete: "cascade",
        });
        // Define the association with the shipment model and the payment model(Order is associated with one shipment and one payment)
        Order.belongsTo(models.Shipment);
        Order.belongsTo(models.Payment);
    };
};