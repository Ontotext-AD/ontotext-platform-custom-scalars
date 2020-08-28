import {GraphQLError, GraphQLFloat, GraphQLScalarType} from "graphql";

const NEGATIVE_FLOAT = 'NegativeFloat';

function convert(value) {
    if (value >= 0) {
        throw new GraphQLError(`The value of '${NEGATIVE_FLOAT}' should be negative, below zero.`);
    }

    return value + '';
}

/**
 * Defines custom GraphQLScalarType for negative float values.
 */
export default new GraphQLScalarType({
    name: NEGATIVE_FLOAT,

    description: `An Float scalar that must be a negative value`,

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
