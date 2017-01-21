/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DesktopEntry = function () {
	  function DesktopEntry(value) {
	    _classCallCheck(this, DesktopEntry);

	    this.regex = {
	      comment: /([^#]*)#(.*)/g,
	      group: /^\[(.+)\]\s*$/g,
	      keyValuePair: /([A-Za-z0-9-]*)\s*(=)\s*(.*);?/g
	    };
	    console.log(value);
	    if (typeof value === 'string') {
	      this.path = value;
	      this._decode(fs.readFileSync(value, 'utf8'));
	    } else if (Object.prototype.toString.call(value) === '[object Object]') {
	      this._serialized = this._encode(value);
	    }
	  }

	  /**
	  * Encodes an desktop object into a string that can be written to a file.
	  *
	  * @method _encode
	  * @param [data] {Object} An desktop object.
	  * @returns {string} A valid desktop entry representation of the data.
	  * @private
	  */


	  _createClass(DesktopEntry, [{
	    key: '_encode',
	    value: function _encode(data) {
	      var result = '';

	      if (!data) {
	        data = {};
	      }

	      // TODO: each group must have name key

	      var groups = Object.keys(data);
	      for (var i = 0; i < groups.length; i++) {
	        var name = groups[i];
	        var group = data[name];
	        var pairs = Object.keys(group);

	        result += '[' + name + ']\n';

	        for (var j = 0; j < pairs.length; j++) {
	          var key = pairs[j];
	          var value = group[key];

	          if (Array.isArray(value.value)) {
	            value.value = value.value.join(';');
	          }

	          if (Object.prototype.toString.call(value.value) === '[object Object]' || Object.prototype.toString.call(value.comment) === '[object Object]') {
	            continue;
	          }

	          if (key === "Exec") {
	            value.value = '"' + value.value + '"';
	          }
	          result += key + ' = ' + value.value + ' #' + value.comment + '\n';
	        }
	      }

	      return result;
	    }

	    /**
	    * Decodes an desktop entry string.
	    *
	    * @method decode
	    * @param [data] {String} A string of data to be decoded.
	    * @returns {Object} A new object containing groups.
	    * @private
	    */

	  }, {
	    key: '_decode',
	    value: function _decode(data) {
	      var lines = data.split('\n');

	      var groups = {};
	      var group = null;
	      var precedingComment = "";
	      for (var i = 0; i < lines.length; i++) {
	        var line = lines[i].trim();
	        var comment = "";

	        if (line.startsWith("#")) {
	          precedingComment = precedingComment + "/n";
	          continue;
	        } else {
	          //precedingComment =
	        }

	        var _stripComment2 = _stripComment(line);

	        var _stripComment3 = _slicedToArray(_stripComment2, 2);

	        line = _stripComment3[0];
	        comment = _stripComment3[1];


	        var newGroup = _getNewGroup(line);
	        if (newGroup) {
	          group = newGroup;
	          groups[group] = {};
	          continue;
	        }

	        var pair = new RegExp(this.regex.keyValuePair).exec(line);
	        if (pair) {
	          var key = pair[1].trim();
	          var value = pair[3].trim();

	          if (key === "Exec") {
	            if (value.startsWith("\"") && value.endsWith("\"")) {
	              value = value.substring(1, value.length - 1);
	            }
	          } else {
	            if (value.endsWith(';')) value = value.substr(0, value.length - 1);
	            value = value.split(';');
	            value = value.length > 1 ? value : value[0];
	          }

	          if (group) {
	            addToGroup(groups, group, key, value, comment, precedingComment);
	          }
	        }
	      }

	      return groups;
	    }
	  }, {
	    key: 'addToGroup',
	    value: function addToGroup(groups, group, key, value, comment) {
	      groups[group][key] = { value: value, comment: comment };
	    }

	    /**
	    * Strips comment from rest of the line
	    *
	    * @method _stripComment
	    * @param [line] {String} The line to strip.
	    * @returns {Object}
	    * @private
	    */

	  }, {
	    key: '_stripComment',
	    value: function _stripComment(line) {
	      var pair = new RegExp(this.regex.comment).exec(line);
	      if (pair) {
	        return [pair[1].trim(), pair[2]];
	      }
	      return [line, ""];
	    }

	    /**
	    * Checks whether a line indicates a new group or not.
	    *
	    * @method _getNewGroup
	    * @param [line] {String} The line to check.
	    * @returns {String} The Group name, if found.
	    * @private
	    */

	  }, {
	    key: '_getNewGroup',
	    value: function _getNewGroup(line) {
	      var result = new RegExp(this.regex.group).exec(line || '');
	      return result && result[1];
	    }
	  }]);

	  return DesktopEntry;
	}();

	exports.default = DesktopEntry;

/***/ }
/******/ ]);