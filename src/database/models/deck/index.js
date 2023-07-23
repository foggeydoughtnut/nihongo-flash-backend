const Sequelize = require('sequelize');

const modelName = 'Deck';
module.exports = sequelize => ({
  modelName,
  associate: ({Deck, Card, User}) => {
    Deck.hasMany(Card);
    Deck.belongsTo(User);
  },
  model: sequelize
    .define(modelName, {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, unique: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
    },
      {
        freezeTableName: true,
        tableName: 'deck',
      }),
});