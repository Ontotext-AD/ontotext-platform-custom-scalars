import {GraphQLFloat, GraphQLScalarType} from "graphql";
import {throwNegativeValueError} from "./Utilities";

/**
 * Defines custom GraphQLScalarType for positive float values.
 */
export default new GraphQLScalarType({
    name: `PositiveFloat`,

    description: `An Float scalar that must be a positive value`,

    serialize: GraphQLFloat.serialize,

    parseValue: GraphQLFloat.parseValue,

    parseLiteral(node) {
        let value = GraphQLFloat.parseLiteral(node);
        if (value <= 0) {
            throwNegativeValueError(value, this.name);
        }

        return value;
    }
});
