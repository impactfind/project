const shared = __shared("project");

const Validate = __lib("validator").validate("project")

module.exports.list = function(req, res) {
  return shared.list()
    .then((payload) => {
      console.log('length',payload.length)
      res.success({payload})
    })
    .catch((err)=> {
      console.log(err)
      res.error(err)
    });
};

module.exports.listById = function (req, res) {
  const params = req.token;
  return Validate("listById", params)
    .then(()=> shared.listById(params) )
    .then((payload)=> res.success({payload}))
    .catch(res.error)
}

module.exports.detail = function (req, res) {
  const {params} = req;
  return Validate("detail", params)
    .then(()=> shared.detail(params))
    .then((payload)=> res.success({payload}))
    .catch(res.error)
};

module.exports.create = function (req, res) {
  const params = req.body;
  params.userId = req.token.id;
  return Validate("create", params)
    .then(()=> shared.create(params))
    .then((payload)=>res.success({payload: payload}))
    .catch(res.error)
};

module.exports.update = function (req, res) {
  const params = req.body;
  params.id = req.params.id;
  return Validate("update", params)
    .then(()=> shared.update(params))
    .then((payload)=> res.success({payload, message: 'Berhasil update'}))
    .catch(res.error)
};

module.exports.leave = function (req, res) {
  const {params} = req;
  params.userId = req.token.id;
  return Validate("leave", params)
    .then(()=> shared.leave(params))
    .then((payload)=> res.success({payload}))
    .catch(res.error)
};
