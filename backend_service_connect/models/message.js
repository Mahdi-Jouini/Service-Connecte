module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Message.associate = (models) => {
      Message.belongsTo(models.Conversation, { foreignKey: 'conversation_id', as: 'conversation' });
    };
  
    return Message;
  };
  