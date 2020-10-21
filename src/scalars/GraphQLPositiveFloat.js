import {GraphQLFloat, GraphQLScalarType} from "graphql";
import {normalizeFloatingPointNumbers, throwNegativeValueError} from "./Utilities";

const POSITIVE_FLOAT = 'PositiveFloat';

function convert(value) {
    if (value <= 0) {
        throwNegativeValueError(value, POSITIVE_FLOAT);
    }

    return normalizeFloatingPointNumbers(value);
}

/**
 * Defines custom GraphQLScalarType for positive float values.
 */
export default new GraphQLScalarType({
    name: POSITIVE_FLOAT,

    description: `An Float scalar that must be a positive value`,

    serialize(value) {
        return convert(GraphQLFloat.serialize(value));
    },

    parseValue(value) {
        return convert(GraphQLFloat.parseValue(value));
    },

    parseLiteral(node) {
        return convert(GraphQLFloat.parseLiteral(node));
    }
});
