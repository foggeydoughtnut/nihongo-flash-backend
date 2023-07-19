const Sequelize = require('sequelize');

const modelName = 'User';
module.exports = sequelize => ({
  modelName,
  associate: ({ User, Deck }) => {
    User.hasMany(Deck);
  },
  model: sequelize
    .define(modelName, {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, unique: true, autoIncrement: true },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
    },
      {
        freezeTableName: true,
        tableName: 'user',
      }),
});