import {GraphQLError, GraphQLFloat, GraphQLScalarType} from "graphql";
import {normalizeFloatingPointNumbers} from "./Utilities";

const NON_NEGATIVE_FLOAT = 'NonNegativeFloat';

function convert(value) {
    if (value < 0) {
        throw new GraphQLError(`The value of '${NON_NEGATIVE_FLOAT}' should be positive or zero.`);
    }

    return normalizeFloatingPointNumbers(value);
}

/**
 * Defines custom GraphQLScalarType for non negative float values.
 */
export default new GraphQLScalarType({
    name: NON_NEGATIVE_FLOAT,

    description: `An Float scalar that must be greater than or equal to zero`,

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
