const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlpha: true,
        isLowercase: true
      }
    },
    imagePokedex: {
      type: DataTypes.STRING(255)
    },
    imageDetail: {
      type: DataTypes.STRING(255)
    },
    health: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    }
  })
}
