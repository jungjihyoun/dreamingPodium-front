"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _API = _interopRequireDefault(require("./API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Profile API 관리
var getProfile = function getProfile(user_id, date) {
  return regeneratorRuntime.async(function getProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(user_id); // 작성된 글 불러오기

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_API["default"].get("/profile/read_profile/".concat(user_id)));

        case 4:
          return _context.abrupt("return", _context.sent);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.warn('fail to fetch UserProfile', _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

var postProfileInfo = function postProfileInfo(user_id, name, gender, birthday, team, field) {
  return regeneratorRuntime.async(function postProfileInfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(user_id, name, gender, birthday, team, field);
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_API["default"].post("/profile/create_profile/".concat(user_id, "?name=").concat(name, "&gender=").concat(gender, "&birthday=").concat(birthday, "&team=").concat(team, "&field=").concat(field)).then(function (res) {
            console.log('sucess update profile Info', res);
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          console.warn('fail update profile', _context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

var _default = {
  getProfile: getProfile,
  postProfileInfo: postProfileInfo
};
exports["default"] = _default;