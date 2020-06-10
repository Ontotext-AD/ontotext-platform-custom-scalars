import {Kind, GraphQLScalarType, GraphQLError} from 'graphql';
import {isNumber, parseAsFloat, throwConversionError, throwOutOfRangeError} from "./Utilities";

const MAX_SAVE_INT = Math.pow(2, 53) -1;
const MIN_SAVE_INT = -MAX_SAVE_INT;


/**
 * Defines custom GraphQLScalarType for Double values.
 */
export default new GraphQLScalarType({
    name: `Double`,

    description: `Singed double-precision 64-bit floating point (IEEE 754-1985)`,

    serialize(value) {
        return parseAsFloat(value, this.name);
    },

    parseValue(value) {
        return parseAsFloat(value, this.name);
    },

    parseLiteral(node) {
        let valueType = node.kind;
        if (valueType !== Kind.FLOAT && valueType !== Kind.INT && valueType !== Kind.STRING) {
            throwConversionError(valueType, this.name);
        }

        let value = node.value;
        if (!isNumber(value)) {
            throw new GraphQLError(`The expected value should be a number, but got '${JSON.stringify(value)}'`);
        }

        if (value < MIN_SAVE_INT || value > MAX_SAVE_INT) {
            throwOutOfRangeError(value, this.name);
        }

        return parseFloat(value);
    }
});
