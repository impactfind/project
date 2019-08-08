
module.exports = function($) {
  const project = $.import(__dirname+'/project');
  const user = $.import(__dirname+'/user');
  project.belongsToMany(user, {through: 'project_user', as: 'user_data', foreignKey: 'projectId'});
  user.belongsToMany(project, {through: 'project_user', as: 'project_data', foreignKey: 'userId'});
  user.has
  project.sync();
  user.sync();

};
