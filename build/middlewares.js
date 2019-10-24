"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadAvatar = exports.uploadVideo = exports.onlyPrivate = exports.onlyPublic = exports.localMiddleware = void 0;

var _routes = _interopRequireDefault(require("./routes"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multerVideo = (0, _multer["default"])({
  dest: "uploads/videos/"
});
var multerAvatar = (0, _multer["default"])({
  dest: "uploads/avatar/"
});

var localMiddleware = function localMiddleware(req, res, next) {
  res.locals.siteName = "WeTube";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
};

exports.localMiddleware = localMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  req.user ? res.redirect(_routes["default"].home) : next();
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  req.user ? next() : res.redirect(_routes["default"].home);
};

exports.onlyPrivate = onlyPrivate;
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;