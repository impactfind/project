const moment = require("moment")
const RandomString = require("randomstring")

module.exports = function ($, DataTypes) {
  const Project = $.define('project', {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      validate: {
        len: [30],
        isAlphanumeric: true
      }
    },
    name: {
      type: DataTypes.STRING(100),
      notNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      notNull: false
    },
    created_at: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    updated_at: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },{
    timestamps: false,
    underscored: true,
    tableName: "project",
    hooks: {
      beforeCreate(project, options) {
        project.id = RandomString.generate({
          length: 30,
          charset: "0123456789abcdefghijklmnopqrstuvwxyz",
        })
        project.created_at = moment().unix()
        project.updated_at = moment().unix()
        project.status = 0
      },
      beforeUpdate(user, options) {
        project.updated_at = moment().unix()
      }
    }

  })

  return Project
}
