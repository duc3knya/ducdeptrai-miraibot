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
 * {@link AbstractCharBuffer} implementation using a [Node.js Buffer][1].
 *
 * [1]: http://nodejs.org/api/buffer.html
 */
var NodeBuffer = /** @class */ (function (_super) {
    __extends(NodeBuffer, _super);
    function NodeBuffer(initCapacity) {
        var _this = _super.call(this, initCapacity) || this;
        initCapacity = initCapacity || 16;
        _this.buffer = Buffer.alloc(initCapacity * 2);
        return _this;
    }
    Object.defineProperty(NodeBuffer, "isSupported", {
        get: function () {
            try {
                return Buffer.from('A', 'utf16le').readUInt16LE(0) === 65;
            }
            catch (_) {
                /* istanbul ignore next */
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    NodeBuffer.fromString = function (string, transform, thisArg) {
        return _super._fromString.call(this, new this(string.length), string, transform, thisArg);
    };
    NodeBuffer.prototype.charAt = function (offset) {
        return String.fromCharCode(this.read(offset));
    };
    NodeBuffer.prototype.charCodeAt = function (offset) {
        return this.buffer.readUInt16LE(offset * 2);
    };
    /**
     * Write a charCode to the buffer using {@link Buffer.writeUInt16LE}.
     *
     * @param charCode charCode The charCode to append.
     * @param offset offset The zero based offset to write at.
     */
    NodeBuffer.prototype.write = function (charCode, offset) {
        if (typeof offset === 'undefined') {
            offset = this._length;
        }
        this._ensureCapacity(offset + 1);
        this.buffer.writeUInt16LE(charCode, offset * 2);
        this._length = offset + 1 > this._length ? offset + 1 : this._length;
        return this;
    };
    NodeBuffer.prototype.toString = function () {
        return this.buffer.toString('utf16le', 0, this._length * 2);
    };
    /**
     * Ensures a minimum capacity.
     * @param {Number} minCapacity The minimum capacity (i.e. the expected {@link String#length length} of the {@link String} this buffer may represent).
     */
    NodeBuffer.prototype._ensureCapacity = function (minCapacity) {
        if (this.buffer.length < minCapacity * 2) {
            if (minCapacity < this.buffer.length) {
                minCapacity = this.buffer.length; // I.e. double the capacity (!)
            }
            var buffer = Buffer.alloc(minCapacity * 2);
            this.buffer.copy(buffer);
            this.buffer = buffer;
        }
    };
    return NodeBuffer;
}(abstract_char_buffer_1.default));
exports.default = NodeBuffer;
//# sourceMappingURL=node-buffer.js.map