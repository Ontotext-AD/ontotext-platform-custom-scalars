import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {BigNumber} from "bignumber.js";
import {parseAsBigNumber, throwConversionError} from "./Utilities";

/**
 * Defines custom GraphQLScalarType for non negative Integer values.
 */
export default new GraphQLScalarType({
    name: `NonNegativeInteger`,

    description: `Non-negative integer (>=0), unlimited digits`,

    serialize(value) {
        return parseAsBigNumber(value, this.name);
    },

    parseValue(value) {
        return parseAsBigNumber(value, this.name);
    },

    parseLiteral(node) {
        let kind = node.kind;
        if (Kind.INT !== kind && Kind.STRING !== kind) {
            throwConversionError(kind, this.name);
        }

        let value = new BigNumber(node.value);
        if (!value.isInteger()) {
            throw new GraphQLError(`Expected '${this.name}', but got '${value}'.`);
        }

        if (value.isNegative() && !value.eq(0)) {
            throw new GraphQLError(`The value of '${this.name}' should be positive or zero.`);
        }

        return value;
    }
});
