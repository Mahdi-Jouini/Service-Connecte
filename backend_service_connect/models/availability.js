module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define('Availability', {
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
  });

  Availability.associate = (models) => {
    Availability.belongsTo(models.Provider, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
  };

  return Availability;
};
