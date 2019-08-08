require("dotenv").config();
const Client = require("qgrail-broker").Client;
const AddressBookClient = new Client(process.env.BROKER_HOST, "address_book");

AddressBookClient.invoke("address_book/detail", {id: 1})
    .then((result) => {
        console.log("RESULT: ", result);
        process.exit(0);
    });


