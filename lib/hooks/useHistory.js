"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _history = require("history");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useHistory(_ref) {
  var steps = _ref.steps,
      basename = _ref.basename,
      history = _ref.history,
      exactMatch = _ref.exactMatch;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      activePath = _useState2[0],
      setActivePath = _useState2[1];

  var historyRef = (0, _react.useRef)(history || (0, _history.createMemoryHistory)());

  var getPathToStep = function getPathToStep(pathname) {
    var id = pathname.replace("".concat(basename, "/"), "");

    var _steps$filter = steps.filter(function (s) {
      return exactMatch ? s === id : id.startsWith(s);
    }),
        _steps$filter2 = _slicedToArray(_steps$filter, 1),
        step = _steps$filter2[0];

    return step;
  };

  (0, _react.useEffect)(function () {
    var unlisten = historyRef.current.listen(function (_ref2) {
      var pathname = _ref2.pathname;
      var nextPath = getPathToStep(pathname);

      if (steps.includes(nextPath)) {
        setActivePath(nextPath);
      }
    });
    var pathname = historyRef.current.location.pathname;
    var nextPath = getPathToStep(pathname);

    if (steps.includes(nextPath)) {
      setActivePath(nextPath);
    }

    return unlisten;
  });

  var handleNext = function handleNext(onNext) {
    return function (nextPath) {
      var nextStep = nextPath || steps[steps.indexOf(activePath) + 1];
      onNext(nextStep);
    };
  };

  return _objectSpread(_objectSpread({}, historyRef.current), {}, {
    pathname: activePath,
    push: handleNext(historyRef.current.push),
    replace: handleNext(historyRef.current.replace)
  });
}

var _default = useHistory;
exports.default = _default;