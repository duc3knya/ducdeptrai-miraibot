import AbstractCharBuffer from './abstract-char-buffer';
/**
 * {@link AbstractCharBuffer} implementation using a [Typed Array][1] (more precisely an [Uint16Array][2]).
 *
 * [1]: https://www.khronos.org/registry/typedarray/specs/latest/
 * [2]: https://developer.mozilla.org/en-US/docs/Web/API/Uint16Array
 */
export default class TypedArrayBuffer extends AbstractCharBuffer {
    private _buffer;
    constructor(initCapacity: number);
    static readonly isSupported: boolean;
    static fromString(string: string, transform?: (value: number, index: number, string: string) => number, thisArg?: any): TypedArrayBuffer;
    charAt(offset: number): string;
    charCodeAt(offset: number): number;
    write(charCode: number, offset?: number): this;
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
    toString(): string;
    /**
     * Ensures a minimum capacity.
     * @param {Number} minCapacity The minimum capacity (i.e. the expected
     *     {@link String#length length} of the {@link String} this buffer may
     *     represent).
     */
    protected _ensureCapacity(minCapacity: number): void;
}
