module.exports = (sequelize: any, DataTypes: any) => {
    const Staff = sequelize.define("staff", {
        staffName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modulePermission: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Define the association with the User model
    Staff.associate = (models: any) => {
        // Define the association with the User model
        Staff.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
};