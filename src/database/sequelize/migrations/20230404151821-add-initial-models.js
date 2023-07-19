'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const shared = {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }
    };

    await queryInterface.createTable("User", {
      ...shared,
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
    });

    await queryInterface.createTable("Card", {
      ...shared,
      term: { type: Sequelize.STRING, allowNull: false },
      definition: { type: Sequelize.STRING, allowNull: false },
      confidence: { type: Sequelize.NUMBER, allowNull: false },
      exampleSentence: { type: Sequelize.STRING, allowNull: true },
    });

    await queryInterface.createTable("Deck", {
      ...shared,
      name: { type: Sequelize.STRING, allowNull: false },
      numCardsPerDay: { type: Sequelize.NUMBER, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Card");
    await queryInterface.dropTable("Deck");
    await queryInterface.dropTable("User");
  }
};
