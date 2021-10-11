/**
 * Base class for all CharBuffers.
 */
export default abstract class AbstractCharBuffer {
    protected _length: number;
    /**
     * Indicates whether this CharBuffer is supported by the current platform.
     */
    static readonly isSupported: boolean;
    /**
     * @param initCapacity The initial capacity (i.e. the expected {@link String#length length} of the {@link String} represented by this buffer).
     */
    protected constructor(initCapacity: number);
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
    protected static _fromString<T extends AbstractCharBuffer>(output: T, string: string, transform?: (value: number, index: number, string: string) => number, thisArg?: any): T;
    /**
     * Length of the {@link String} represented by this buffer.
     */
    /**
    * Sets the length of the {@link String} represented by this buffer.
    *
    * @param {Number} newLength The new length.
    * @throws {RangeError} if `newLength < 0 || newLength > this.length`
    */
    length: number;
    /**
     * Appends a charCode to the buffer. The length of the buffer increases by 1.
     *
     * @param charCode The charCode to append.
     */
    append(charCode: number): this;
    /**
     * Reads the charCode at an offset.
     *
     * @param offset The zero based offset.
     * @return The charCode.
     *
     * @throws if offset < 0 or offset >= this.length
     */
    read(offset: number): number;
    /**
     * Executes a function once per charCode.
     * See also {@link Array#forEach}
     *
     * @param callback Function to execute for each charCode.
     * @param thisArg Value to use as this when executing callback.
     */
    forEach(callback: (value: number, index: number, buffer: this) => void, thisArg?: any): void;
    /**
     * Creates a new CharBuffer with the results of calling a provided function on every charCode.
     * See also {@link Array#map}
     *
     * @param callback Function to execute for each charCode.
     * @param thisArg Value to use as this when executing callback.
     */
    map(callback: (value: number, index: number, buffer: this) => number, thisArg?: any): this;
    /**
     * Override this to observe changes.
     * @param newLength
     */
    protected setLength(newLength: number): void;
    protected clone(): this;
    /**
     * Writes a charCode to the buffer at an offset.
     *
     * @param charCode charCode The charCode to write.
     * @param offset offset The zero based offset to write at.
     *
     * @throws if offset < 0 or offset > this.length
     */
    abstract write(charCode: number, offset?: number): this;
    /**
     * Reads the charCode at an offset.
     *
     * @param offset The zero based offset.
     * @return The charCode.
     *
     * @throws if offset < 0 or offset >= this.length
     */
    abstract charCodeAt(offset: number): number;
    /**
     * Reads the char at an offset.
     *
     * @param offset The zero based offset.
     * @return The char.
     * @throws {Error} if offset < 0 or offset >= this.length
     */
    abstract charAt(offset: number): string;
    /**
     * Returns the {@link String} represented by this buffer.
     */
    abstract toString(): string;
}
