import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {throwConversionError} from "../Utilities";
import moment from "moment";

const YEAR = 'Year';
const YEAR_REGEX = /-?\d{4,}(Z|([+-])\d\d:\d\d)?/;

function validateYear(year) {
    if (!YEAR_REGEX.test(year)) {
        throw new GraphQLError(`Invalid value for '${YEAR}' - '${year}'`);
    }
}

function getYearAsStr(year) {
    return moment([year]).year().toString();
}

/**
 * Defines custom GraphQLScalarType for RFC-3339 compliant year values.
 */
export default new GraphQLScalarType({
    name: YEAR,

    description: `An RFC-3339 compliant Year Scalar`,

    serialize(value) {
        if (value instanceof Date) {
            return getYearAsStr(value.getUTCFullYear().toString());
        } else if (typeof value === 'string' || value instanceof String) {
            if (!isNaN(Date.parse(value))) {
                // when the date is in ISO format we need to only the year
                return getYearAsStr(value.match(YEAR_REGEX)[0] || value);
            }

            validateYear(value);
            return getYearAsStr(value.match(YEAR_REGEX)[0] || value);
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
