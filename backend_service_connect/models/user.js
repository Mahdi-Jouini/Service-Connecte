module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      phone: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      photo: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('user', 'provider'),
        defaultValue: 'user',
        allowNull: false
      },
      email_verification_code: DataTypes.STRING,
    });
  
    User.associate = (models) => {
      User.hasOne(models.Provider, { foreignKey: 'user_id', as: 'provider' });
    };
  
    return User;
  };