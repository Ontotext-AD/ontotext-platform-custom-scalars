import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {throwConversionError} from "../Utilities";

const RFC_3339_DATETIME_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d+)?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/;

function validateDateTime(dateTime) {
    if (!RFC_3339_DATETIME_REGEX.test(dateTime)) {
        throw new GraphQLError(`Invalid value for 'Date' - '${dateTime}'`);
    }
}

/**
 * Defines custom GraphQLScalarType for RFC-3339 compliant DateTime values.
 */
export default new GraphQLScalarType({
    name: `DateTime`,

    description: `An RFC-3339 compliant DateTime Scalar with an optional timezone.`,

    serialize(value) {
        if (value instanceof Date) {
            return value.toISOString();
        } else if (typeof value === 'string' || value instanceof String) {
            if (!isNaN(Date.parse(value))) {
                return new Date(value).toISOString();
            }
        }

        throw new GraphQLError(`Expected '${this.name}' value, but got '${JSON.stringify(value)}'.`);
    },

    parseValue(value) {
        if (typeof value === 'string' || value instanceof String) {
            validateDateTime(value);
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

        let value = node.value;
        validateDateTime(value);
        return new Date(value);
    }
});
