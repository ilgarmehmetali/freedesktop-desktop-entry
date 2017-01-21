'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DesktopEntry = function () {
  function DesktopEntry(value) {
    _classCallCheck(this, DesktopEntry);

    this._regex = {
      comment: /([^#]*)#(.*)/g,
      group: /^\[(.+)\]\s*$/g,
      keyValuePair: /([A-Za-z0-9-]*)\s*(=)\s*(.*);?/g
    };

    if (typeof value === 'string') {
      this._path = value;
      this._rawData = _fs2.default.readFileSync(value, 'utf8');
      this._decode();
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      this._path = null;
      this._data = value;
      this._encode();
    }
  }

  _createClass(DesktopEntry, [{
    key: 'setValue',
    value: function setValue(group, key, value) {
      this._data[group].entries[key].value = value;
    }
  }, {
    key: 'addValue',
    value: function addValue(group, key, value) {
      if (Array.isArray(this._data[group].entries[key].value)) this._data[group].entries[key].value.push(value);else this._data[group].entries[key].value = [this._data[group].entries[key].value, value];
    }
  }, {
    key: 'setComment',
    value: function setComment(group, key, comment) {
      if (arguments.length == 3) {
        var _arguments = Array.prototype.slice.call(arguments),
            _group = _arguments[0],
            _key = _arguments[1],
            _comment = _arguments[2];

        this._data[_group].entries[_key].comment = _comment;
      } else if (arguments.length == 2) {
        var _arguments2 = Array.prototype.slice.call(arguments),
            _group2 = _arguments2[0],
            _comment2 = _arguments2[1];

        this._data[_group2].comment = _comment2;
      }
    }
  }, {
    key: 'setPrecedingComment',
    value: function setPrecedingComment(group, key, comment) {
      if (arguments.length == 3) {
        var _arguments3 = Array.prototype.slice.call(arguments),
            _group3 = _arguments3[0],
            _key2 = _arguments3[1],
            _comment3 = _arguments3[2];

        this._data[_group3].precedingComment = _comment3 + "\n";
      } else if (arguments.length == 2) {
        var _arguments4 = Array.prototype.slice.call(arguments),
            _group4 = _arguments4[0],
            _comment4 = _arguments4[1];

        this._data[_group4].precedingComment = _comment4 + "\n";
      }
    }
  }, {
    key: 'save',
    value: function save() {
      return this.saveTo(this._path);
    }
  }, {
    key: 'saveTo',
    value: function saveTo(path) {
      this._encode();
      var _this = this;
      return new Promise(function (resolve, reject) {
        _fs2.default.writeFileSync(path, _this._rawData, 'utf8', function (err) {
          if (err) reject(err);else resolve();
        });
      });
    }

    /**
    * Encodes this._data to desktop entry this._rawData.
    * this._rawData is
    * @method _encode
    * @private
    */

  }, {
    key: '_encode',
    value: function _encode() {
      var result = '';
      var data = this._data;

      if (!data) {
        data = {};
      }

      // TODO: each group must have name key

      var groups = Object.keys(data);
      for (var i = 0; i < groups.length; i++) {
        var name = groups[i];
        var entries = data[name].entries;
        var groupComment = data[name].precedingComment;
        var inlineComment = data[name].comment;
        var pairs = Object.keys(entries);

        if (inlineComment.length > 0) inlineComment = "#" + inlineComment;

        result += groupComment;
        result += '[' + name + '] ' + inlineComment + '\n';

        for (var j = 0; j < pairs.length; j++) {
          var key = pairs[j];
          var value = entries[key];

          if (Array.isArray(value.value)) {
            value.value = value.value.join(';');
          }

          if (Object.prototype.toString.call(value.value) === '[object Object]' || Object.prototype.toString.call(value.comment) === '[object Object]') {
            continue;
          }

          if (key === "Exec") {
            value.value = '"' + value.value + '"';
          }

          result += value.precedingComment;

          if (value.comment.length > 0) value.comment = "#" + value.comment;
          result += key + ' = ' + value.value + ' ' + value.comment + '\n';
        }
      }

      this._rawData = result;
    }

    /**
    * Decodes this._rawData desktop entry string to this._data.
    *
    * @method decode
    * @private
    */

  }, {
    key: '_decode',
    value: function _decode() {

      var lines = this._rawData.split('\n');

      var groups = {};
      var group = null;
      var precedingComment = "";
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        var comment = "";

        if (line.startsWith("#") || line == "") {
          precedingComment += line + "\n";
          continue;
        }

        var _stripComment2 = this._stripComment(line);

        var _stripComment3 = _slicedToArray(_stripComment2, 2);

        line = _stripComment3[0];
        comment = _stripComment3[1];


        var newGroup = this._getNewGroup(line);
        if (newGroup) {
          group = newGroup;
          groups[group] = {
            comment: comment,
            precedingComment: precedingComment,
            entries: {}
          };
          precedingComment = "";
          continue;
        }

        var pair = new RegExp(this._regex.keyValuePair).exec(line);
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
            this.addToGroup(groups, group, key, value, comment, precedingComment);
          }
          precedingComment = "";
        }
      }

      this._data = groups;
    }
  }, {
    key: 'addToGroup',
    value: function addToGroup(groups, group, key, value, comment, precedingComment) {
      groups[group].entries[key] = { value: value, comment: comment, precedingComment: precedingComment };
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
      var pair = new RegExp(this._regex.comment).exec(line);
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
      var result = new RegExp(this._regex.group).exec(line || '');
      return result && result[1];
    }
  }, {
    key: 'JSON',
    get: function get() {
      return this._data;
    }
  }]);

  return DesktopEntry;
}();

exports.default = DesktopEntry;
module.exports = exports['default'];
