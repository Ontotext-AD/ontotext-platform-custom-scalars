import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {throwConversionError} from "../Utilities";

const TIME_REGEX = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\.\d+)?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/;

function getTimePart(dateTime) {
    return dateTime.substr(dateTime.indexOf('T') + 1);
}

function validateTime(time) {
    if (!TIME_REGEX.test(time)) {
        throw new GraphQLError(`Invalid value for 'Time' - '${time}'`);
    }
}

/**
 * Defines custom GraphQLScalarType for RFC-3339 compliant time values.
 */
export default new GraphQLScalarType({
    name: `Time`,

    description: `An RFC-3339 compliant time scalar with an optional timezone.`,

    serialize(value) {
        if (value instanceof Date) {
            return getTimePart(value.toISOString());
        } else if (typeof value === 'string' || value instanceof String) {
            if (!isNaN(Date.parse(value))) {
                return getTimePart(new Date(value).toISOString());
            }

            validateTime(value);
            return value;
        }

        throw new GraphQLError(`Expected '${this.name}' value, but got '${JSON.stringify(value)}'.`);
    },

    parseValue(value) {
        if (typeof value === 'string' || value instanceof String) {
            validateTime(value);
            return value;
        }

        throw new GraphQLError(`Expected value in '${this.name}' format, but got '${JSON.stringify(value)}'.`);
    },

    parseLiteral(node) {
        let type = node.kind;
        if (type !== Kind.STRING) {
            throwConversionError(type, this.name);
        }

        return this.parseValue(node.value);
    }
});
