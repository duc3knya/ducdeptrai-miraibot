"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for all CharBuffers.
 */
var AbstractCharBuffer = /** @class */ (function () {
    /**
     * @param initCapacity The initial capacity (i.e. the expected {@link String#length length} of the {@link String} represented by this buffer).
     */
    function AbstractCharBuffer(initCapacity) {
        if (initCapacity < 0) {
            throw new RangeError("initCapacity must be non-negative, " + initCapacity + " given.");
        }
        this._length = 0;
    }
    Object.defineProperty(AbstractCharBuffer, "isSupported", {
        /**
         * Indicates whether this CharBuffer is supported by the current platform.
         */
        get: function () {
            /* istanbul ignore next */
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new CharBuffer from a {@link String}.
     *
     * @param output
     * @param string The string.
     * @param transform Function that produces a charCode for the new CharBuffer from a charCode of the string parameter.
     * @param thisArg
     *
     * ```
     * var charBuffer;
     *
     * charBuffer = CharBuffer.fromString('abc');
     * console.log(charBuffer.toString()); // output: abc
     *
     * charBuffer = CharBuffer.fromString('abc', function (charCode, index){
     *     return charCode + 3;
     * });
     *
     * console.log(charBuffer.toString()); // output: def
     * ```
     */
    AbstractCharBuffer._fromString = function (output, string, transform, thisArg) {
        var len = string.length;
        // Manual loop optimization :-)
        if (transform) {
            for (var i = 0; i < len; i++) {
                output.append(transform.call(thisArg, string.charCodeAt(i), i, string));
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                output.append(string.charCodeAt(i));
            }
        }
        return output;
    };
    Object.defineProperty(AbstractCharBuffer.prototype, "length", {
        /**
         * Length of the {@link String} represented by this buffer.
         */
        get: function () {
            return this._length;
        },
        /**
         * Sets the length of the {@link String} represented by this buffer.
         *
         * @param {Number} newLength The new length.
         * @throws {RangeError} if `newLength < 0 || newLength > this.length`
         */
        set: function (newLength) {
            this.setLength(newLength);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Appends a charCode to the buffer. The length of the buffer increases by 1.
     *
     * @param charCode The charCode to append.
     */
    AbstractCharBuffer.prototype.append = function (charCode) {
        return this.write(charCode);
    };
    /**
     * Reads the charCode at an offset.
     *
     * @param offset The zero based offset.
     * @return The charCode.
     *
     * @throws if offset < 0 or offset >= this.length
     */
    AbstractCharBuffer.prototype.read = function (offset) {
        return this.charCodeAt(offset);
    };
    /**
     * Executes a function once per charCode.
     * See also {@link Array#forEach}
     *
     * @param callback Function to execute for each charCode.
     * @param thisArg Value to use as this when executing callback.
     */
    AbstractCharBuffer.prototype.forEach = function (callback, thisArg) {
        if (typeof callback !== 'function') {
            throw new TypeError(callback + " is not a function");
        }
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this.read(i), i, this);
        }
    };
    /**
     * Creates a new CharBuffer with the results of calling a provided function on every charCode.
     * See also {@link Array#map}
     *
     * @param callback Function to execute for each charCode.
     * @param thisArg Value to use as this when executing callback.
     */
    AbstractCharBuffer.prototype.map = function (callback, thisArg) {
        if (typeof callback !== 'function') {
            throw new TypeError(callback + " is not a function");
        }
        var output = this.clone();
        for (var i = 0; i < this.length; i++) {
            output.append(callback.call(thisArg, this.read(i), i, this));
        }
        return output;
    };
    /**
     * Override this to observe changes.
     * @param newLength
     */
    AbstractCharBuffer.prototype.setLength = function (newLength) {
        if (newLength < 0 || newLength > this.length) {
            throw new RangeError("newLength must be between 0 and " + this.length + ", " + newLength + " given.");
        }
        this._length = newLength;
    };
    AbstractCharBuffer.prototype.clone = function () {
        return new this.constructor(this.length);
    };
    return AbstractCharBuffer;
}());
exports.default = AbstractCharBuffer;
//# sourceMappingURL=abstract-char-buffer.js.map