import {GraphQLScalarType} from "graphql";
import {parseUnsignedValue, parseUnsignedLiteral} from "../Utilities";

// defines max values allowed for the current type
const MAX_VALUE = Math.pow(2, 16) -1;

/**
 * Defines custom GraphQLScalarType for unsigned short values.
 */
export default new GraphQLScalarType({
    name: `UnsignedShort`,

    description: `Unsigned 16-bit integer`,

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