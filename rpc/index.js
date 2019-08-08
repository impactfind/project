const Service = require("qgrail-broker").Service;
const ProfileService = new Service(process.env.SERVICE_HOST, {
    log: (type, data) => {
        console.log(type, ": ", data);
    }
});


ProfileService.listen();


