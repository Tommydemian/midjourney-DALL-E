"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv = require("dotenv");
var cors_1 = require("cors");
var postRoutes_1 = require("./db/routes/postRoutes");
var dalleRoutes_1 = require("./db/routes/dalleRoutes");
var db_1 = require("./db");
dotenv.config();
var port = process.env.PORT;
var app = (0, express_1["default"])();
app.use(express_1["default"].json({ limit: '50mb' }));
app.use(express_1["default"].urlencoded({ limit: '50mb', extended: true }));
app.use((0, cors_1["default"])());
app.use('/api/posts', postRoutes_1["default"]);
app.use('/api/dalle', dalleRoutes_1["default"]);
(0, db_1.connectDb)(process.env.MONGO_URI);
app.get('/', function (req, res) {
    res.send('Hello from DALL-E 2.whataver');
});
app.listen(port, function () {
    console.log("app running in port ".concat(port));
});
