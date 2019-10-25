"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./db");

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./models/Video");

require("./models/Comment");

require("./models/User");

_dotenv["default"].config();

var PORT = process.env.PORT || 400;

var handelListening = function handelListening() {
  return console.log("Listening on: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handelListening);