import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {isNumber, throwConversionError} from "./Utilities";

function convert(value) {
    if (isNumber(value)) {
        return value + '';
    }

    throw new GraphQLError(`Expected 'Decimal' value, but got ${value}`);
}

/**
 * Defines custom GraphQLScalarType for Decimal values.
 */
export default new GraphQLScalarType({
    name: `Decimal`,

    description: `Decimal infinite-precision number`,

    serialize: convert,

    parseValue: convert,

    parseLiteral(node) {
        let type = node.kind;
        if (type !== Kind.FLOAT && type !== Kind.INT && type !== Kind.STRING) {
            throwConversionError(type, this.name);
        }

        return convert(node.value);
    }
});
