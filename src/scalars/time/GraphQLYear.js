import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {throwConversionError} from "../Utilities";

const YEAR_REGEX = /-?\d{4,}(Z|([+-])\d\d:\d\d)?/;

function validateYear(year) {
    if (!YEAR_REGEX.test(year)) {
        throw new GraphQLError(`Invalid value for 'Year' - '${year}'`);
    }
}

/**
 * Defines custom GraphQLScalarType for RFC-3339 compliant year values.
 */
export default new GraphQLScalarType({
    name: `Year`,

    description: `An RFC-3339 compliant Year Scalar`,

    serialize(value) {
        if (value instanceof Date) {
            return value.getFullYear();
        } else if (typeof value === 'string' || value instanceof String) {
            if (!isNaN(Date.parse(value))) {
                return new Date(value).getFullYear();
            }

            validateYear(value);
            return value;
        }

        throw new GraphQLError(`Expected '${this.name}' value, but got '${JSON.stringify(value)}'.`);
    },

    parseValue(value) {
        if (typeof value === 'string' || value instanceof String) {
            validateYear(value);
            return value;
        }

        throw new GraphQLError(`Expected value in '${this.name}' format, but got '${JSON.stringify(value)}'.`);
    },

    parseLiteral(node) {
        if (node.kind !== Kind.STRING) {
            throwConversionError(node.kind, this.name);
        }

        let value = node.value;
        validateYear(value);
        return value;
    }
});
