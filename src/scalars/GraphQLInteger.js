import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {BigNumber} from "bignumber.js";
import {parseAsBigNumber, throwConversionError} from "./Utilities";

/**
 * Defines custom GraphQLScalarType for Integer values.
 */
export default new GraphQLScalarType({
    name: `Integer`,

    description: `Integer, unlimited digits`,

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
        if (value.isInteger()) {
            return value;
        }

        throw new GraphQLError(`Expected '${this.name}' value, but got '${value}'`);
    }
});
