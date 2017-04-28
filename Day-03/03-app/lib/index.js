(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _idSymbol = Symbol();

var Employee = function () {
	function Employee(id, name, salary) {
		_classCallCheck(this, Employee);

		this[_idSymbol] = id;
		this.name = name;
		this.salary = salary;
	}
	/*set id(value){
 	console.log('id setter triggered');
 	if (value < 0) return;
 	this[_idSymbol] = value;
    }*/


	_createClass(Employee, [{
		key: 'display',
		value: function display() {
			console.log('id = ' + this.id + ', name = ' + this.name + ', salary = ' + this.salary);
		}
	}, {
		key: 'id',
		get: function get() {
			console.log('id getter triggered');
			return this[_idSymbol];
		}
	}]);

	return Employee;
}();

exports.default = Employee;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Employee2 = require('./Employee');

var _Employee3 = _interopRequireDefault(_Employee2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullTimeEmployee = function (_Employee) {
	_inherits(FullTimeEmployee, _Employee);

	function FullTimeEmployee(id, name, salary, benefits) {
		_classCallCheck(this, FullTimeEmployee);

		var _this = _possibleConstructorReturn(this, (FullTimeEmployee.__proto__ || Object.getPrototypeOf(FullTimeEmployee)).call(this, id, name, salary));

		_this.benefits = benefits;
		return _this;
	}

	_createClass(FullTimeEmployee, [{
		key: 'display',
		value: function display() {
			console.log('id = ' + this.id + ', name = ' + this.name + ', salary = ' + this.salary + ', benefits = ' + this.benefits);
		}
	}]);

	return FullTimeEmployee;
}(_Employee3.default);

exports.default = FullTimeEmployee;

},{"./Employee":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function add() {
	var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

	return x + y;
}
exports.default = add;

},{}],4:[function(require,module,exports){
'use strict';

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _FullTimeEmployee = require('./FullTimeEmployee');

var _FullTimeEmployee2 = _interopRequireDefault(_FullTimeEmployee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log((0, _add2.default)(100, 200));
var ft = new _FullTimeEmployee2.default(100, 'Magesh', 10000, 'Food');
ft.display();
console.log('assigning id');
ft.id = 200;
console.log(ft.id);

},{"./FullTimeEmployee":2,"./add":3}]},{},[4]);
