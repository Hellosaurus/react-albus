"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _wizardContext = _interopRequireDefault(require("../wizardContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useWizard() {
  return (0, _react.useContext)(_wizardContext.default);
}

var _default = useWizard;
exports.default = _default;