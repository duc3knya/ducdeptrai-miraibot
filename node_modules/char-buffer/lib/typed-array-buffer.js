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
 * {@link AbstractCharBuffer} implementation using a [Typed Array][1] (more precisely an [Uint16Array][2]).
 *
 * [1]: https://www.khronos.org/registry/typedarray/specs/latest/
 * [2]: https://developer.mozilla.org/en-US/docs/Web/API/Uint16Array
 */
var TypedArrayBuffer = /** @class */ (function (_super) {
    __extends(TypedArrayBuffer, _super);
    function TypedArrayBuffer(initCapacity) {
        var _this = _super.call(this, initCapacity) || this;
        initCapacity = initCapacity || 16;
        _this._buffer = new Uint16Array(initCapacity);
        return _this;
    }
    Object.defineProperty(TypedArrayBuffer, "isSupported", {
        get: function () {
            try {
                /* eslint-disable-next-line unicorn/prefer-spread */
                return String.fromCharCode.apply(null, Array.from(new Uint16Array())) === '';
            }
            catch (_) {
                /* istanbul ignore next */
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    TypedArrayBuffer.fromString = function (string, transform, thisArg) {
        return _super._fromString.call(this, new this(string.length), string, transform, thisArg);
    };
    TypedArrayBuffer.prototype.charAt = function (offset) {
        return String.fromCharCode(this.read(offset));
    };
    TypedArrayBuffer.prototype.charCodeAt = function (offset) {
        return this._buffer[offset];
    };
    TypedArrayBuffer.prototype.write = function (charCode, offset) {
        if (offset === undefined) {
            offset = this._length;
        }
        this._ensureCapacity(offset + 1);
        this._buffer[offset] = charCode;
        this._length = offset + 1 > this._length ? offset + 1 : this._length;
        return this;
    };
    // jshint -W101
    /**
     * Returns the {@link String} represented by this buffer using {@link String#fromCharCode}.
     *
     * For details see:
     *
     * - [How to convert ArrayBuffer to and from String][1]
     * - [WebKit Bug 80797 - Argument length limited to 65536 ][2]
     *
     * [1]: http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
     * [2]: https://bugs.webkit.org/show_bug.cgi?id=80797
     *
     * @return {String} The string.
     */
    TypedArrayBuffer.prototype.toString = function () {
        // jshint +W101
        var ARGS_MAX = 65535;
        var len = this._length;
        var buf = '';
        var startPos = 0;
        var endPos = 0;
        if (len <= ARGS_MAX) {
            /* eslint-disable-next-line unicorn/prefer-spread */
            return String.fromCharCode.apply(null, Array.from(this._buffer.subarray(startPos, len)));
        }
        do {
            startPos = endPos;
            endPos += ARGS_MAX;
            if (endPos > len) {
                endPos = len;
            }
            /* eslint-disable-next-line unicorn/prefer-spread */
            buf += String.fromCharCode.apply(null, Array.from(this._buffer.subarray(startPos, endPos)));
        } while (endPos < len);
        return buf;
    };
    /**
     * Ensures a minimum capacity.
     * @param {Number} minCapacity The minimum capacity (i.e. the expected
     *     {@link String#length length} of the {@link String} this buffer may
     *     represent).
     */
    TypedArrayBuffer.prototype._ensureCapacity = function (minCapacity) {
        if (this._buffer.length < minCapacity) {
            if (minCapacity < this._buffer.length * 2) {
                minCapacity = this._buffer.length * 2; // I.e. double the capacity (!)
            }
            var buffer = new Uint16Array(minCapacity);
            buffer.set(this._buffer);
            this._buffer = buffer;
        }
    };
    return TypedArrayBuffer;
}(abstract_char_buffer_1.default));
exports.default = TypedArrayBuffer;
//# sourceMappingURL=typed-array-buffer.js.map