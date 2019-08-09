const {Op} = require("sequelize");

const ProjectModel = __model.mysql("project");
const ProjectUserModel = __model.mysql("project_user");
const UserModel = __model.mysql("user");
const CodeError = __lib("code_error");

const list = module.exports.list = function(pages) {
  // ProjectUserModel.hasMany(ProjectModel, {foreignKey: 'id', sourceKey: 'projectId'});
  // ProjectUserModel.hasMany(UserModel, {foreignKey: 'id', sourceKey:'userId'});
  ProjectModel.belongsToMany(UserModel, {through: ProjectUserModel})
  return ProjectModel.findAll({
    include: [
      {
        model: UserModel
      }
    ]
  })
};

const listById = module.exports.listById = function ({id}) {
  ProjectUserModel.hasMany(ProjectModel, {foreignKey: 'id', sourceKey: 'projectId'});
  ProjectUserModel.hasMany(UserModel, {foreignKey: 'id', sourceKey:'userId'});
  return ProjectUserModel.findAll({
    where: {
      userId: {
        [Op.eq]: id
      }
    },
    include: [
      {
        model: ProjectModel,
      },
      {
        model: UserModel
      }
    ]
  })
}

const detail = module.exports.detail = function ({id}) {
  // ProjectUserModel.hasMany(ProjectModel, {foreignKey: 'id', sourceKey: 'projectId'});
  // ProjectUserModel.hasMany(UserModel, {foreignKey: 'id', sourceKey:'userId'});
  ProjectModel.belongsToMany(UserModel, {through: ProjectUserModel})
  return ProjectModel.findOne({
    where: {
      id: {
        [Op.eq]: id
      }
    },
    include: [
      {
        model: UserModel
      }
    ]
  })
    .then((result)=> {
      if(result === null) {
        throw new CodeError("Project tidak ditemukan", 404)
      }
      return result
    })
}

const create = module.exports.create = function (params) {
  return ProjectModel.create({name: params.name})
    .then((result)=> {
      return result
    })
    .then((project)=> {
      return ProjectUserModel.create({userId: params.userId, projectId: project.id })
    })
};


const update = module.exports.update = function ({id, name}) {
  return ProjectModel.update({
    name
  }, {
    where: {
      id
    }
  })
};
const leave = module.exports.leave = function ({id, userId}) {
  return ProjectUserModel.findOne({where: {userId, projectId: id}})
    .then((result)=> {
      if(result === null) {
        throw new CodeError("Project tidak ditemukan", 404)
      }
      return result.destroy()
    })
};
