module.exports = (sequelize: any, DataTypes: any) => {
    const Shipment = sequelize.define("shipment", {
        shipmentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        shipmentAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipmentCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipmentState: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipmentCountry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipmentZipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Shipment.associate = (models: any) => {
        // Define the association with the Order model
        Shipment.belongsTo(models.Order, {
            foreignKey: {
                allowNull: false,
            },
        });
        // Define the association with the Order model
        Shipment.hasMany(models.Order)
    };

    return Shipment;
};