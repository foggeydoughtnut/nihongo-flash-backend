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
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

    queryInterface.bulkInsert('Deck', [{
      name: 'Deck 1',
      numberOfReviews: 150,
      numberOfNew: 15,
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
    },
    {
      term: 'term2',
      definition: 'definition2',
      confidence: 0,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      term: 'term3',
      definition: 'definition3',
      confidence: 15,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      term: 'term4',
      definition: 'definition4',
      confidence: 80,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      term: 'term5',
      definition: 'definition5',
      confidence: 110,
      exampleSentence: 'the cat went to the park',
      DeckId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
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
