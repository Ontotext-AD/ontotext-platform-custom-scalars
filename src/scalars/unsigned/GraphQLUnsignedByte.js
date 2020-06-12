import {GraphQLScalarType} from "graphql";
import {parseAsInt, parseUnsignedLiteral} from "../Utilities";

// defines max values allowed for the current type
const MAX_VALUE = Math.pow(2, 8);

/**
 * Defines custom GraphQLScalarType for unsigned byte values.
 */
export default new GraphQLScalarType({
    name: `UnsignedByte`,

    description: `Unsigned 8-bit integer`,

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