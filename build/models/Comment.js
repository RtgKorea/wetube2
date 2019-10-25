"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var CommentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: "Text is reqqired"
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var model = _mongoose["default"].model("Comment", CommentSchema);

var _default = model;
exports["default"] = _default;