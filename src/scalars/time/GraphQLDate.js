import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {throwConversionError} from "../Utilities";

const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))$/;

function validateDate(date) {
    if (!RFC_3339_REGEX.test(date)) {
        throw new GraphQLError(`Invalid value for 'Date' - '${date}'`);
    }
}

/**
 * Defines custom GraphQLScalarType for RFC-3339 compliant Full Date values.
 */
export default new GraphQLScalarType({
    name: `Date`,

    description: `An RFC-3339 compliant Full Date Scalar`,

    serialize(value) {
        if (value instanceof Date) {
            return value.toISOString().split('T')[0];
        } else if (typeof value === 'string' || value instanceof String) {
            if (!isNaN(Date.parse(value))) {
                return new Date(value).toISOString().split('T')[0];
            }
        }

        throw new GraphQLError(`Expected '${this.name}' value, but got '${JSON.stringify(value)}'.`);
    },

    parseValue(value) {
        if (typeof value === 'string' || value instanceof String) {
            validateDate(value);
            if (!isNaN(Date.parse(value))) {
                return new Date(value);
            }
        }

        throw new GraphQLError(`Expected value in '${this.name}' format, but got '${JSON.stringify(value)}'.`);
    },

    parseLiteral(node) {
        let type = node.kind;
        if (type !== Kind.STRING) {
            throwConversionError(type, this.name);
        }

        let dateStr = node.value;
        validateDate(dateStr);
        return new Date(dateStr);
    }
});
