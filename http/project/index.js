const project = require("express").Router();
const Project = require(`${__dirname}/detail`);
const AuthMiddleware = require(`${__root}/http/express-auth-middleware`);
project.get("/", AuthMiddleware("ALL") , Project.list);
project.get("/:id", AuthMiddleware("ALL"), Project.detail)
project.get("/list/all", AuthMiddleware("ALL"), Project.listById);

project.put("/", AuthMiddleware("ALL"), Project.create);
project.post("/:id", AuthMiddleware("ALL"), Project.update);

project.delete("/:id/leave", AuthMiddleware("ALL"), Project.leave);
project.delete('/:id', AuthMiddleware("ADMIN"));
module.exports = project;
