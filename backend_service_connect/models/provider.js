module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    profession: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    specific_skills: DataTypes.TEXT,
    description: DataTypes.TEXT,
    qualities: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    certification: DataTypes.STRING,
  });

  Provider.associate = (models) => {
    Provider.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Provider.belongsTo(models.Service, { foreignKey: 'service_id', as: 'serviceArea' });
    Provider.hasMany(models.Availability, {
      foreignKey: 'provider_id',
      as: 'availability',
    });
  };

  return Provider;
};
