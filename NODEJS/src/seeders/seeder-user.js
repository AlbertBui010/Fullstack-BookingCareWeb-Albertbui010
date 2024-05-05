'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Users', [
			{
				email: 'John@gmail.com',
				password: '123456',
				firstName: 'Albert',
				lastName: 'Bui',
				address: 'HCMC',
				gender: 1,
				typeRole: 'ROLE',
				keyRole: 'R1',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
