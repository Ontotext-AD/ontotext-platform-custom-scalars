import {GraphQLError, GraphQLFloat, GraphQLScalarType} from "graphql";

/**
 * Defines custom GraphQLScalarType for non positive float values.
 */
export default new GraphQLScalarType({
    name: `NonPositiveFloat`,

    description: `An Float scalar that must be less than or equal to zero`,

    serialize: GraphQLFloat.serialize,

    parseValue: GraphQLFloat.parseValue,

    parseLiteral(node) {
        let value = GraphQLFloat.parseLiteral(node);
        if (value > 0) {
            throw new GraphQLError(`The value of '${this.name}' should be negative or zero.`);
        }

        return value;
    }
});
