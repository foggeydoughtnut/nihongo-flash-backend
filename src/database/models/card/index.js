const Sequelize = require('sequelize');

const modelName = 'Card';
module.exports = sequelize => ({
  modelName,
  associate: ({Card, Deck }) => {
    Card.belongsTo(Deck);
  },
  model: sequelize
    .define(modelName, {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, unique: true, autoIncrement: true },
      term: { type: Sequelize.STRING, allowNull: false },
      definition: { type: Sequelize.STRING, allowNull: false },
      confidence: { type: Sequelize.NUMBER, allowNull: false },
      exampleSentence: { type: Sequelize.STRING, allowNull: true },
    },
      {
        freezeTableName: true,
        tableName: 'card',
      }),
});