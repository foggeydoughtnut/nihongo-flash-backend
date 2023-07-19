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

    await queryInterface.createTable("Deck", {
      ...shared,
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'cascade',
      },
      name: { type: Sequelize.STRING, allowNull: false },
      numberOfReviews: { type: Sequelize.NUMBER, allowNull: false },
      numberOfNew: { type: Sequelize.NUMBER, allowNull: false }
    });

    await queryInterface.createTable("Card", {
      ...shared,
      DeckId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Deck',
          key: 'id'
        },
        onUpdate: 'cascade',
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'cascade',
      },
      term: { type: Sequelize.STRING, allowNull: false },
      definition: { type: Sequelize.STRING, allowNull: false },
      confidence: { type: Sequelize.NUMBER, allowNull: false },
      exampleSentence: { type: Sequelize.STRING, allowNull: true },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Card");
    await queryInterface.dropTable("Deck");
    await queryInterface.dropTable("User");
  }
};
