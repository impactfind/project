const moment = require("moment")

const RandomString = require("randomstring")

module.exports = function ($, DataTypes) {
  const ProjectUser = $.define('project_user', {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      validate: {
        len: [30],
        isAlphanumeric: true
      }
    },
    projectId: {
      type: DataTypes.STRING(100),
      notNull: false
    },
    userId: {
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
    tableName: "project_user",
    indexes: [
      {
        fields: ["created_at"]
      }
    ],
    hooks: {
      beforeCreate(project_user, options) {
        project_user.id = RandomString.generate({
          length: 30,
          charset: "0123456789abcdefghijklmnopqrstuvwxyz",
        })
        project_user.created_at = moment().unix()
        project_user.updated_at = moment().unix()
        project_user.status = 0
      },
      beforeUpdate(project_user, options) {
        project_user.updated_at = moment().unix()
      }
    }
  })
  return ProjectUser
}
