const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('User', [{
      username: 'username',
      password: await bcrypt.hash('password', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    queryInterface.bulkInsert('Deck', [{
      name: 'Deck 1',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    await queryInterface.bulkInsert('Card', [{
      term: 'term1',
      definition: 'definition1',
      confidence: 45,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      new: false,
      inProgress: false,
      review: true,
    },
    {
      term: 'term2',
      definition: 'definition2',
      confidence: 0,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      new: true,
      inProgress: false,
      review: false,
    },
    {
      term: 'term3',
      definition: 'definition3',
      confidence: 15,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      new: true,
      inProgress: true,
      review: false,
    },
    {
      term: 'term4',
      definition: 'definition4',
      confidence: 80,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      new: false,
      inProgress: false,
      review: true,
    },
    {
      term: 'term5',
      definition: 'definition5',
      confidence: 110,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      new: false,
      inProgress: false,
      review: false,
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Card', null, {});
    await queryInterface.bulkDelete('Deck', null, {});
    await queryInterface.bulkDelete('User', null, {});
  }
};
