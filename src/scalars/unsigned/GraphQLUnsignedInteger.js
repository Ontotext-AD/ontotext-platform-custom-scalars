import {GraphQLScalarType} from "graphql";
import {parseUnsignedValue, parseUnsignedLiteral} from "../Utilities";

// defines max values allowed for the current type
const MAX_VALUE = Math.pow(2, 32) -1;

/**
 * Defines custom GraphQLScalarType for unsigned Integer values.
 */
export default new GraphQLScalarType({
    name: `UnsignedInteger`,

    description: `Unsigned 32-bit integer`,

    serialize(value) {
        return parseUnsignedValue(value, MAX_VALUE, this.name);
    },

    parseValue(value) {
        return parseUnsignedValue(value, MAX_VALUE, this.name);
    },

    parseLiteral(node) {
        return parseUnsignedLiteral(node, MAX_VALUE, this.name);
    }
});