module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    title: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    provider_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true
      references: {
        model: 'Providers',
        key: 'id'
      }
    }
  });

  Conversation.associate = (models) => {
    Conversation.hasMany(models.Message, { foreignKey: 'conversation_id', as: 'messages' });
    Conversation.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Conversation.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'provider' });
  };

  return Conversation;
};