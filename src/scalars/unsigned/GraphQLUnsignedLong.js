import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {isNumber, throwConversionError, throwNegativeValueError, throwOutOfRangeError} from "../Utilities";
import {BigNumber} from "bignumber.js";

// defines max values allowed for the current type
const MAX_VALUE = new BigNumber(Math.pow(2, 64));

function convert(value) {
    if (isNumber(value)) {
        return new BigNumber(value).integerValue(BigNumber.ROUND_HALF_UP).toString();
    }

    throw new GraphQLError(`Expected 'UnsignedLong' value, but got ${JSON.stringify(value)}`);
}

/**
 * Defines custom GraphQLScalarType for unsigned Long values.
 */
export default new GraphQLScalarType({
    name: `UnsignedLong`,

    description: `Unsigned 64-bit integer`,

    serialize: convert,

    parseValue: convert,

    parseLiteral(node) {
        let type = node.kind;
        if (Kind.INT !== type && Kind.STRING !== type) {
            throwConversionError(type, this.name);
        }

        let value = new BigNumber(node.value);
        if (value.isNegative()) {
            throwNegativeValueError(value, this.name);
        }

        if (MAX_VALUE.isLessThan(value)) {
            throwOutOfRangeError(value, this.name);
        }

        return value.integerValue(BigNumber.ROUND_HALF_UP);
    }
});