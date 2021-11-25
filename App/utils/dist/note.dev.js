"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _API = _interopRequireDefault(require("./API"));

var _axios = _interopRequireDefault(require("axios"));

var APIURL = _interopRequireWildcard(require("../../config"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 기록 API 관리
var getRecord = function getRecord(user_id, date) {
  return regeneratorRuntime.async(function getRecord$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(user_id, date); // 작성된 글 불러오기

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_API["default"].get("/record/get/".concat(user_id, "?wdate=").concat(date)));

        case 4:
          return _context.abrupt("return", _context.sent);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.warn('기록 불러오기 실패', _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

var postRecord = function postRecord(user_id, wdate, key_type, content) {
  return regeneratorRuntime.async(function postRecord$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(user_id, key_type); // 작성된 글

          console.log(user_id, wdate, key_type, content);
          _context2.next = 4;
          return regeneratorRuntime.awrap(_API["default"].post("/record/write/".concat(user_id, "?wdate=").concat(wdate, "&key_type=").concat(key_type, "&content=").concat(content)).then(function (response) {
            return response.status;
          })["catch"](function (err) {
            return console.war(err);
          }));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var postImage = function postImage(user_id, image_type, wdate, image) {
  return regeneratorRuntime.async(function postImage$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('## 이미지 테스트 ##', user_id, image_type, wdate, image);
          return _context3.abrupt("return", _axios["default"].post("".concat(APIURL.BASE_URL, "/test/uploadfile?user_id=").concat(user_id, "&image_type=").concat(image_type, "&wdate=").concat(wdate), image, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(function (res) {
            return console.log('success image post', res);
          })["catch"](function (err) {
            return console.log('fail image post', err);
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // 목표설정 API


var postObjectInit = function postObjectInit(user_id, objectives, requirements, efforts, routines) {
  return regeneratorRuntime.async(function postObjectInit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(user_id, requirements); // console.log(objectives);
          // console.log(JSON.stringify(objectives));

          _context4.next = 3;
          return regeneratorRuntime.awrap(_API["default"].post("/objective/create_objectives/".concat(user_id, "?objectives=").concat(JSON.stringify(objectives), "&requirements=").concat(JSON.stringify(requirements), "&efforts=").concat(JSON.stringify(efforts), "&routines=").concat(JSON.stringify(routines))).then(function (response) {
            return response.status;
          })["catch"](function (err) {
            return console.warn(err);
          }));

        case 3:
          return _context4.abrupt("return", _context4.sent);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var updateObject = function updateObject(user_id, keyword, content) {
  return regeneratorRuntime.async(function updateObject$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(user_id, keyword, content);
          _context5.next = 3;
          return regeneratorRuntime.awrap(_API["default"].post("/objective/update_objectives/".concat(user_id, "?keyword=").concat(keyword, "&content=").concat(JSON.stringify(content))).then(function (response) {
            return response.status;
          })["catch"](function (err) {
            return console.warn(err);
          }));

        case 3:
          return _context5.abrupt("return", _context5.sent);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var _default = {
  getRecord: getRecord,
  postRecord: postRecord,
  postImage: postImage,
  postObjectInit: postObjectInit,
  updateObject: updateObject
};
exports["default"] = _default;