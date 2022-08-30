import {GraphQLError, Kind} from "graphql";

/**
 * Parses the input value as big number. The passed value will be checked, whether it is a number or not and then
 * directly converted to string, skipping the parsing as it will attempt to round the number, if it exceed the limits
 * of the JS primitives.
 *
 * @param value which should be parsed
 * @param typeName the expected type of the value
 * @returns {string} representation of the input value
 * @throws GraphQLError when the input value is not a number
 */
function parseAsBigNumber(value, typeName) {
    if (isNumber(value) && isInteger(value)) {
        return Number(value).toLocaleString('fullwide', {useGrouping:false});
    }

    throw new GraphQLError(`Expected '${typeName}' value, but got ${_printValueAndType(value)}`);
}

/**
 * Checks whether the given value is integer or not.
 *
 * @param value to be checked
 * @returns {boolean}
 */
function isInteger(value) {
    return Number.isInteger(Number(value));
}

/**
 * Checks whether the passed number is positive. Zeros are considered not positive.
 *
 * @param number to be checked
 * @returns {boolean}
 */
function isPositive(number) {
    return Math.sign(number) === 1;
}

/**
 * Checks whether the passed number is negative. Zeros are considered not negative.
 *
 * @param number to be checked
 * @returns {boolean}
 */
function isNegative(number) {
    return Math.sign(number) === -1;
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
        && !Number.isNaN(value);
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
 * @returns {string}
 */
function parseUnsignedLiteral(node, maxValue, typeName) {
    let kind = node.kind;
    if (Kind.INT !== kind && Kind.STRING !== kind && Kind.FLOAT !== kind) {
        throwConversionError(kind, typeName);
    }

    return parseUnsignedValue(node.value, maxValue, typeName);
}

/**
 * Parses unsigned value as positive integer.
 *
 * @param value to be parsed
 * @param maxValue the maximum value which is allowed to be contained by the scalar
 * @param typeName the name of scalar/type, which value is parsed
 * @returns {string}
 */
function parseUnsignedValue(value, maxValue, typeName) {
    if (!isNumber(value)) {
       throw new GraphQLError(`Expected '${typeName}' value, but got ${_printValueAndType(value)}`);
    }

    let parsed = parseInt(value, 10);
    if (parsed < 0 || parsed > maxValue) {
        throwOutOfRangeError(value, typeName);
    }

    return parsed.toLocaleString('fullwide', {useGrouping:false});
}

function normalizeFloatingPointNumbers(value) {
    let asStr = value + '';
    return asStr.includes('.') ? asStr : asStr + '.0';
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
    parseAsBigNumber,
    parseUnsignedLiteral,
    parseUnsignedValue,
    isInteger,
    isPositive,
    isNegative,
    isNumber,
    throwConversionError,
    throwNegativeValueError,
    throwOutOfRangeError,
    normalizeFloatingPointNumbers
};
