import {GraphQLScalarType} from "graphql";
import {parseAsInt, parseUnsignedLiteral} from "../Utilities";

// defines max values allowed for the current type
const MAX_VALUE = Math.pow(2, 32);

/**
 * Defines custom GraphQLScalarType for unsigned Integer values.
 */
export default new GraphQLScalarType({
    name: `UnsignedInteger`,

    description: `Unsigned 32-bit integer`,

    serialize(value) {
        return parseAsInt(value, this.name);
    },

    parseValue(value) {
        return parseAsInt(value, this.name);
    },

    parseLiteral(node) {
        return parseUnsignedLiteral(node, MAX_VALUE, this.name);
    }
});