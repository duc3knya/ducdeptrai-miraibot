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
 * {@link AbstractCharBuffer} implementation using an {@link Array} of {@link String}s.
 */
var StringArrayBuffer = /** @class */ (function (_super) {
    __extends(StringArrayBuffer, _super);
    function StringArrayBuffer(initCapacity) {
        var _this = _super.call(this, initCapacity) || this;
        initCapacity = initCapacity || 16;
        _this._buffer = new Array(initCapacity);
        return _this;
    }
    Object.defineProperty(StringArrayBuffer, "isSupported", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    StringArrayBuffer.fromString = function (string, transform, thisArg) {
        return _super._fromString.call(this, new this(string.length), string, transform, thisArg);
    };
    /**
     * Write a charCode to the buffer using {@link String#fromCharCode} and {@link Array#push []}.
     *
     * @param charCode The charCode to append.
     * @param offset The zero based offset to write at.
     */
    StringArrayBuffer.prototype.write = function (charCode, offset) {
        if (typeof offset === 'undefined') {
            offset = this._length;
        }
        this._buffer[offset] = String.fromCharCode(charCode);
        this._length = offset + 1 > this._length ? offset + 1 : this._length;
        return this;
    };
    StringArrayBuffer.prototype.charCodeAt = function (offset) {
        return this._buffer[offset].charCodeAt(0);
    };
    StringArrayBuffer.prototype.charAt = function (offset) {
        return this._buffer[offset];
    };
    StringArrayBuffer.prototype.toString = function () {
        return this._buffer.slice(0, this._length).join('');
    };
    return StringArrayBuffer;
}(abstract_char_buffer_1.default));
exports.default = StringArrayBuffer;
//# sourceMappingURL=string-array-buffer.js.map