module.exports = (sequelize: any, DataTypes: any) => {
    const Whitelist = sequelize.define("whitelist", {
        whitelistId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
    });

    Whitelist.associate = (models: any) => {
        Whitelist.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });

    };
    return Whitelist;
};