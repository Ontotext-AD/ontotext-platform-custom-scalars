import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {
    isInteger,
    isNegative,
    isNumber,
    throwConversionError,
    throwNegativeValueError,
    throwOutOfRangeError
} from "../Utilities";

const UNSIGNED_LONG = 'UnsignedLong';

// defines max values allowed for the current type - 2^64 -1
const MAX_VALUE_ARRAY = Array.from('18446744073709551615', Number);


function convert(value) {
    if (!isNumber(value)) {
        throw new GraphQLError(`Expected number, but got '${value}'`);
    }

    let copy = value;
    if (!isInteger(copy)) {
        copy = Math.trunc(copy);
    }

    if (isNegative(copy)) {
        throwNegativeValueError(value, UNSIGNED_LONG);
    }

    if (checkOutOfRange(copy)) {
        throwOutOfRangeError(value, UNSIGNED_LONG);
    }

    return copy + '';
}

function checkOutOfRange(value) {
    let valueArray = Array.from(BigInt(value).toString(), Number);
    if(valueArray.length < MAX_VALUE_ARRAY.length) {
        return false;
    }

    if(valueArray.length > MAX_VALUE_ARRAY.length) {
        return  true;
    }

    // the lengths are equal here so we need to check the actual values
    for (let idx = 0; idx < MAX_VALUE_ARRAY.length; idx++) {
        let maxValueNum = MAX_VALUE_ARRAY[idx];
        let valueNum = valueArray[idx];
        // if the number at that position is less then the max number, the whole value should be OK
        if(maxValueNum > valueNum) {
            return false;
        }

        // if the value number is greater then the max number, the whole value exceeds the limit
        if(maxValueNum < valueNum) {
            return true;
        }

        // continue with the next number as the max number and the value number are equal at this point
    }

    // the value is equal to the max allowed
    return false;
}

/**
 * Defines custom GraphQLScalarType for unsigned Long values.
 */
export default new GraphQLScalarType({
    name: UNSIGNED_LONG,

    description: `Unsigned 64-bit integer`,

    serialize: convert,

    parseValue: convert,

    parseLiteral(node) {
        let type = node.kind;
        if (Kind.INT !== type && Kind.STRING !== type) {
            throwConversionError(type, UNSIGNED_LONG);
        }

        return convert(node.value);
    }
});