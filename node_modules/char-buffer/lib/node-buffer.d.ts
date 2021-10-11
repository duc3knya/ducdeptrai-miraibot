/// <reference types="node" />
import AbstractCharBuffer from './abstract-char-buffer';
/**
 * {@link AbstractCharBuffer} implementation using a [Node.js Buffer][1].
 *
 * [1]: http://nodejs.org/api/buffer.html
 */
export default class NodeBuffer extends AbstractCharBuffer {
    protected buffer: Buffer;
    constructor(initCapacity: number);
    static readonly isSupported: boolean;
    static fromString(string: string, transform?: (value: number, index: number, string: string) => number, thisArg?: any): NodeBuffer;
    charAt(offset: number): string;
    charCodeAt(offset: number): number;
    /**
     * Write a charCode to the buffer using {@link Buffer.writeUInt16LE}.
     *
     * @param charCode charCode The charCode to append.
     * @param offset offset The zero based offset to write at.
     */
    write(charCode: number, offset?: number): this;
    toString(): string;
    /**
     * Ensures a minimum capacity.
     * @param {Number} minCapacity The minimum capacity (i.e. the expected {@link String#length length} of the {@link String} this buffer may represent).
     */
    private _ensureCapacity;
}
