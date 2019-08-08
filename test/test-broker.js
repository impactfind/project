require("dotenv").config();

const Broker = require("qgrail-broker").Broker;
const broker_config = {
    bind_address: process.env.BROKER_HOST,
    services: [
        {
            name: "address_book",
            upstream: [
                process.env.SERVICE_HOST
            ]
        }
    ],
    log(type, data) {
        console.log(type, ": ", data);
    }
};

const broker = new Broker(broker_config);

broker.listen(() => {
    console.log("Broker Config: ", broker_config.services);
    console.log("Broker listen at port ", process.env.BROKER_HOST);
});
