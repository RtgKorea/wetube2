"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var apiRouter = (0, _express["default"])();
apiRouter.post(_routes["default"].registerView, _videoController.postRegisterView);
apiRouter.post(_routes["default"].addCommnet, _videoController.postAddCommnet);
var _default = apiRouter;
exports["default"] = _default;