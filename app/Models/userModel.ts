module.exports = (sequelize : any, DataTypes : any) => {
  const User = sequelize.define("user", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING
      },
    match_earned: {
      type: DataTypes.INTEGER
    },
    match_made: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    problem: {
      type: DataTypes.STRING
    },
  });
 
  return User;
}