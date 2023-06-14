module.exports = (sequelize: any, DataTypes: any) => {
    const Payment = sequelize.define("payment", {
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        paymentAmount: {
            type: DataTypes.DECIMAL(10, 2), // 10 digits in total, 2 after the decimal point
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // paymentStatus: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
    });

    Payment.associate = (models: any) => {
        // Define the association with the Order model
        Payment.belongsTo(models.Order, {
            foreignKey: {
                allowNull: false,
            },
        });
        // Define the association with the payment and shipment model
        Payment.hasMany(models.Shipment);
    };

    return Payment;
};