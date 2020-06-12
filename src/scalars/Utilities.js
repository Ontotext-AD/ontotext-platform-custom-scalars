import {GraphQLError, Kind} from "graphql";
import {BigNumber} from "bignumber.js";

/**
 * Parses the input value as int.
 *
 * @param value which should be parsed
 * @param typeName the expected type of the value
 * @returns {number}
 * @throws GraphQLError when the value is not a number
 */
function parseAsInt(value, typeName) {
    if (isNumber(value)) {
        return parseInt(value);
    }

    throw new GraphQLError(`Expected '${typeName}' value, but got ${_printValueAndType(value)}`);
}

/**
 * Parses the input value as float.
 *
 * @param value which should be parsed
 * @param typeName the expected type of the value
 * @returns {number}
 * @throws GraphQLError when the value is not a number
 */
function parseAsFloat(value, typeName) {
    if (isNumber(value)) {
        return parseFloat(value);
    }

    throw new GraphQLError(`Expected '${typeName}' value, but got ${_printValueAndType(value)}`);
}

/**
 * Parses the input value as big number, which allows correct processing and calculation of numbers bigger than
 * the natively supported by JS.
 *
 * @param value which should be parsed
 * @param typeName the expected type of the value
 * @returns {string} representation of the input value
 * @throws GraphQLError when the input value is not a number
 */
function parseAsBigNumber(value, typeName) {
    if (isNumber(value)) {
        let bigNumber = new BigNumber(value);
        return bigNumber.toPrecision(bigNumber.sd(true));
    }

    throw new GraphQLError(`Expected '${typeName}' value, but got ${_printValueAndType(value)}`);
}

/**
 * Checks whether the input argument is a number or not. The method detects empty string, 'null' values and booleans as
 * not a number values, although in most cases they could be represented as numbers.
 *
 * @param value to be checked
 * @returns {boolean}
 */
function isNumber(value) {
    return value !== ''
        && typeof value !== 'boolean'
        && value !== null
        && !isNaN(value)
        && !Number.isNaN(value)
        && value !== Number.NaN;
}

function _printValueAndType(value) {
    return `Type: '${typeof value}' with value: ${JSON.stringify(value)}`;
}

/**
 * Parses unsigned literals as positive integer values. The logic could process strings and integer AST types.
 *
 * @param node which contains the type of the value and the actual value which should be parsed
 * @param maxValue the maximum value which is allowed to be contained by the scalar, which value should be parsed
 * @param typeName the name of scalar/type, which value is parsed
 * @returns {number}
 */
function parseUnsignedLiteral(node, maxValue, typeName) {
    let kind = node.kind;
    if (Kind.INT !== kind && Kind.STRING !== kind && Kind.FLOAT !== kind) {
        throwConversionError(kind, typeName);
    }

    let value = parseInt(node.value, 10);
    if (value < 0 || value > maxValue) {
        throwOutOfRangeError(value, typeName);
    }

    return value;
}

function throwConversionError(actualType, expectedType) {
    throw new GraphQLError(`AST type of '${actualType}' could not be turned into '${expectedType}'`);
}

function throwNegativeValueError(value, typeName) {
    throw new GraphQLError(`The input value '${value}' for type '${typeName}' should not be negative.`);
}

function throwOutOfRangeError(value, typeName) {
    throw new GraphQLError(`The input value '${value}' is out of the '${typeName}' range.`);
}

export {
    parseAsInt,
    parseAsFloat,
    parseAsBigNumber,
    parseUnsignedLiteral,
    isNumber,
    throwConversionError,
    throwNegativeValueError,
    throwOutOfRangeError
};
