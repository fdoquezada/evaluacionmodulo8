'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Calificaciones', {
      idpeliculas: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        references: {
          model:"Peliculas",
          key: "id"
        }
      },
      emailUsuario: {
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey: true,
        references: {
          model:"Usuarios",
          key: "email"
        }
      },
      calificacion: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Calificaciones');
  }
};