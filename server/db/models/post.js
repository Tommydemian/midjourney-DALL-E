"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Post = new mongoose_1["default"].Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});
var PostSchema = mongoose_1["default"].model('Post', Post);
exports["default"] = PostSchema;
