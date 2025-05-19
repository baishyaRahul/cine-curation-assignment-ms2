'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('movies', {
      id: { type: Sequelize.INTEGER, autoIncrement: false, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false },
      tmdbId: { type: Sequelize.INTEGER, allowNull: false },
      genre: { type: Sequelize.TEXT },
      actors: { type: Sequelize.TEXT },
      releaseYear: { type: Sequelize.INTEGER },
      rating: { type: Sequelize.FLOAT },
      description: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('movies');

  }
};
