"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_char_buffer_1 = require("./abstract-char-buffer");
/**
 * {@link AbstractCharBuffer} implementation using a single {@link String}.
 */
var StringBuffer = /** @class */ (function (_super) {
    __extends(StringBuffer, _super);
    function StringBuffer(initCapacity) {
        var _this = _super.call(this, initCapacity) || this;
        _this._buffer = '';
        return _this;
    }
    Object.defineProperty(StringBuffer, "isSupported", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    StringBuffer.fromString = function (string, transform, thisArg) {
        return _super._fromString.call(this, new this(string.length), string, transform, thisArg);
    };
    StringBuffer.prototype.append = function (charCode) {
        this._buffer += String.fromCharCode(charCode);
        this._length = this._buffer.length;
        return this;
    };
    StringBuffer.prototype.charAt = function (offset) {
        return this._buffer.charAt(offset);
    };
    StringBuffer.prototype.charCodeAt = function (offset) {
        return this._buffer.charCodeAt(offset);
    };
    /**
     * Write a charCode to the buffer using {@link String#fromCharCode} and {@link String#concat +}.
     * @param charCode
     * @param offset
     */
    StringBuffer.prototype.write = function (charCode, offset) {
        if (typeof offset === 'undefined' || offset === this._length) {
            return this.append(charCode);
        }
        var pre = this._buffer.slice(0, offset);
        var post = this._buffer.slice(offset + 1);
        this._buffer = pre + String.fromCharCode(charCode) + post;
        this._length = this._buffer.length;
        return this;
    };
    StringBuffer.prototype.toString = function () {
        return this._buffer;
    };
    StringBuffer.prototype.setLength = function (newLength) {
        _super.prototype.setLength.call(this, newLength);
        this._buffer = this._buffer.slice(0, this.length);
    };
    return StringBuffer;
}(abstract_char_buffer_1.default));
exports.default = StringBuffer;
//# sourceMappingURL=string-buffer.js.map