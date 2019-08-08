const Express = require("express");
const BodyParser = require("body-parser");
const cors = require("cors");

const http = Express();
const port = process.env.HTTP_PORT || 3000;

http.use(cors({
    origin: true
}));

http.use((req, res, next) => {
    res.success = ({message, payload}) => {
        res.status(200).json({
            code: "success",
            message: message || "",
            payload: payload || {}
        });
    };

    res.error = (error) => {
        const errCode = error.code || 400;
        res.status(errCode).json({
            code: error.code_string || "err_general",
            message: error.message || error || "Oops, something wrong",
            payload: error.payload || {}
        });
    };

    next();
})
http.use(BodyParser.json());

http.use("/project", require(`${__dirname}/project`));

http.use((err, req, res, next) => {
    console.log("UNEXPECTED-ERROR: ", err.stack);
    res.error({code: 500, message: "Ooops, something wrong, please contact administrator"});
});

http.listen(port, () => {
    console.log("Service run on port " + port);
});


