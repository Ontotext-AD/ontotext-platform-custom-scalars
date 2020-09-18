import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {isInteger, isPositive, parseAsBigNumber, throwConversionError} from "./Utilities";

/**
 * Defines custom GraphQLScalarType for non positive Integer values.
 */
export default new GraphQLScalarType({
    name: `NonPositiveInteger`,

    description: `Non-positive integer (<=0), unlimited digits`,

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

        let value = node.value;
        if (!isInteger(value)) {
            throw new GraphQLError(`Expected '${this.name}', but got '${value}'.`);
        }

        if (isPositive(value) && value !== 0) {
            throw new GraphQLError(`The value of '${this.name}' should be negative or zero.`);
        }

        return value + '';
    }
});
