import {GraphQLError, GraphQLFloat, GraphQLScalarType} from "graphql";
import {normalizeFloatingPointNumbers} from "./Utilities";

const NON_POSITIVE_FLOAT = 'NonPositiveFloat';

function convert(value) {
    if (value > 0) {
        throw new GraphQLError(`The value of '${NON_POSITIVE_FLOAT}' should be negative or zero.`);
    }

    return normalizeFloatingPointNumbers(value);
}

/**
 * Defines custom GraphQLScalarType for non positive float values.
 */
export default new GraphQLScalarType({
    name: NON_POSITIVE_FLOAT,

    description: `An Float scalar that must be less than or equal to zero`,

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
