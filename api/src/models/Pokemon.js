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
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 300
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 300
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 300
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 300
      }
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    }
  }, { timestamps: false })
}
