"use strict";
exports.__esModule = true;
exports.connectDb = void 0;
var mongoose_1 = require("mongoose");
function connectDb(url) {
    mongoose_1["default"].connect(url)
        .then(function () { return console.log('db connected'); })["catch"](function (err) { return console.log(err); });
}
exports.connectDb = connectDb;
