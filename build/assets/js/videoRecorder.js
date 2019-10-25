"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var recorderContainer = document.getElementById("jsRecordContainer");
var videoPreview = document.getElementById("jsVideoPreview");
var recordBtn = document.getElementById("jsRecordBtn");
var streamObject;
var videoRecorder;

var handleVideoData = function handleVideoData(event) {
  var videoFile = event.data;
  var link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded webm";
  document.body.appendChild(link);
  link.click();
};

var stopRecording =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videoRecorder.stop();
            recordBtn.removeEventListener("click", stopRecording);
            recordBtn.addEventListener("click", getVideo);
            recordBtn.innerHTML = "Start Recording";

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function stopRecording() {
    return _ref.apply(this, arguments);
  };
}();

var startRecording = function startRecording() {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

var getVideo =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var stream;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return navigator.mediaDevices.getUserMedia({
              audio: true,
              video: {
                width: 1280,
                height: 720
              }
            });

          case 3:
            stream = _context2.sent;
            videoPreview.srcObject = stream;
            videoPreview.muted = true;
            videoPreview.play();
            recordBtn.innerHTML = "Stop recording";
            streamObject = stream;
            startRecording();
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            recordBtn.innerHTML = "Cant record";

          case 15:
            _context2.prev = 15;
            recordBtn.removeEventListener("click", getVideo);
            return _context2.finish(15);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12, 15, 18]]);
  }));

  return function getVideo() {
    return _ref2.apply(this, arguments);
  };
}();

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) init();