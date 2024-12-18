module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
      name: DataTypes.STRING,
      service_image: DataTypes.STRING,
    });
  
    Service.associate = (models) => {
      Service.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Service.hasMany(models.Provider, { foreignKey: 'service_id', as: 'providers' });
    };
  
    return Service;
  };
  