import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {throwConversionError} from "../Utilities";

const YEAR = 'Year';
const YEAR_REGEX = /-?\d{4,}(Z|([+-])\d\d:\d\d)?/;

function validateYear(year) {
    if (!YEAR_REGEX.test(year)) {
        throw new GraphQLError(`Invalid value for '${YEAR}' - '${year}'`);
    }
}

function getYearAsStr(date) {
    return date.getFullYear().toString();
}

/**
 * Defines custom GraphQLScalarType for RFC-3339 compliant year values.
 */
export default new GraphQLScalarType({
    name: YEAR,

    description: `An RFC-3339 compliant Year Scalar`,

    serialize(value) {
        if (value instanceof Date) {
            return getYearAsStr(value);
        } else if (typeof value === 'string' || value instanceof String) {
            if (!isNaN(Date.parse(value))) {
                return getYearAsStr(new Date(value));
            }

            validateYear(value);
            return value.toString();
        }

        throw new GraphQLError(`Expected '${YEAR}' value, but got '${JSON.stringify(value)}'.`);
    },

    parseValue(value) {
        if (typeof value === 'string' || value instanceof String) {
            validateYear(value);
            return value;
        }

        throw new GraphQLError(`Expected value in '${YEAR}' format, but got '${JSON.stringify(value)}'.`);
    },

    parseLiteral(node) {
        if (node.kind !== Kind.STRING) {
            throwConversionError(node.kind, YEAR);
        }

        let value = node.value;
        validateYear(value);
        return value;
    }
});
