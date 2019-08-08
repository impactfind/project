const {integer} = __lib("validator")

module.exports.list = {
    page: [
        {validator: integer({min: 1, message:"page harus integer >= 1"})},
    ],
    rows: [
        {validator: integer({min: 1, message:"rows harus integer >= 1"})},
    ],
    keyword: [
        {type: "string", min: 3, message: "panjang keyword minimal 3 karakter"}
    ]
}

module.exports.detail = {
    id: [
        {type: "string", len: 30, required: true, message: "id tidak valid"}
    ],
}

module.exports.listById = {
    id: [
        {type: "string", len: 30, required: true, message: "id tidak valid"}
    ],

};
module.exports.create = {
    userId: [
        {type: "string", len: 30, required: true, message: "user ID tidak valid"}
    ],
    name: [
        {type: "string", min: 3, required: true, max: 50, message: "panjang name minimal 3 dan maksimal 50 karakter"}
    ]

};
module.exports.update = {
    id: [
        {type: "string", len: 30, required: true, message: "user ID tidak valid"}
    ],
    name: [
        {type: "string", min: 3, required: true, max: 50, message: "panjang name minimal 3 dan maksimal 50 karakter"}
    ]

};
module.exports.leave = {
    userId: [
        {type: "string", len: 30, required: true, message: "id tidak valid"}
    ],

};



