import AbstractCharBuffer from './abstract-char-buffer';
/**
 * {@link AbstractCharBuffer} implementation using a single {@link String}.
 */
export default class StringBuffer extends AbstractCharBuffer {
    private _buffer;
    constructor(initCapacity: number);
    static readonly isSupported: boolean;
    static fromString(string: string, transform?: (value: number, index: number, string: string) => number, thisArg?: any): StringBuffer;
    append(charCode: number): this;
    charAt(offset: number): string;
    charCodeAt(offset: number): number;
    /**
     * Write a charCode to the buffer using {@link String#fromCharCode} and {@link String#concat +}.
     * @param charCode
     * @param offset
     */
    write(charCode: number, offset?: number): this;
    toString(): string;
    protected setLength(newLength: number): void;
}
