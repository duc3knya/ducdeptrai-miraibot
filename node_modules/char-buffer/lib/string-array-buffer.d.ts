import AbstractCharBuffer from './abstract-char-buffer';
/**
 * {@link AbstractCharBuffer} implementation using an {@link Array} of {@link String}s.
 */
export default class StringArrayBuffer extends AbstractCharBuffer {
    private _buffer;
    constructor(initCapacity: number);
    static readonly isSupported: boolean;
    static fromString(string: string, transform?: (value: number, index: number, string: string) => number, thisArg?: any): StringArrayBuffer;
    /**
     * Write a charCode to the buffer using {@link String#fromCharCode} and {@link Array#push []}.
     *
     * @param charCode The charCode to append.
     * @param offset The zero based offset to write at.
     */
    write(charCode: number, offset?: number): this;
    charCodeAt(offset: number): number;
    charAt(offset: number): string;
    toString(): string;
}
