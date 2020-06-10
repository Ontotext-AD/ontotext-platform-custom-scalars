import {GraphQLError, GraphQLFloat, GraphQLScalarType} from "graphql";

/**
 * Defines custom GraphQLScalarType for non negative float values.
 */
export default new GraphQLScalarType({
    name: `NonNegativeFloat`,

    description: `An Float scalar that must be greater than or equal to zero`,

    serialize: GraphQLFloat.serialize,

    parseValue: GraphQLFloat.parseValue,

    parseLiteral(node) {
        let value = GraphQLFloat.parseLiteral(node);
        if (value < 0) {
            throw new GraphQLError(`The value of '${this.name}' should be positive or zero.`);
        }

        return value;
    }
});
