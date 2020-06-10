import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {isNumber, throwConversionError} from "./Utilities";
import {BigNumber} from "bignumber.js";

function convert(value) {
    if (isNumber(value)) {
        let bigNumber = new BigNumber(value);
        return bigNumber.toPrecision(bigNumber.sd(true), BigNumber.ROUND_HALF_UP);
    }

    throw new GraphQLError(`Expected 'Decimal' value, but got ${value}`);
}

/**
 * Defines custom GraphQLScalarType for Decimal values.
 */
export default new GraphQLScalarType({
    name: `Decimal`,

    description: `Decimal infinite-precision number`,

    serialize: convert,

    parseValue: convert,

    parseLiteral(node) {
        let type = node.kind;
        if (type !== Kind.FLOAT && type !== Kind.INT && type !== Kind.STRING) {
            throwConversionError(type, this.name);
        }

        let value = node.value;
        if (!isNumber(value)) {
            throw new GraphQLError(`Expected '${this.name}' value, but got '${value}'`);
        }

        return new BigNumber(value);
    }
});
