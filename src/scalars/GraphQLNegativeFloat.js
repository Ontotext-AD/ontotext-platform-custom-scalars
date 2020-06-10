import {GraphQLError, GraphQLFloat, GraphQLScalarType} from "graphql";

/**
 * Defines custom GraphQLScalarType for negative float values.
 */
export default new GraphQLScalarType({
    name: `NegativeFloat`,

    description: `An Float scalar that must be a negative value`,

    serialize: GraphQLFloat.serialize,

    parseValue: GraphQLFloat.parseValue,

    parseLiteral(node) {
        let value = GraphQLFloat.parseLiteral(node);
        if (value >= 0) {
            throw new GraphQLError(`The value of '${this.name}' should be negative, below zero.`);
        }

        return value;
    }
});
