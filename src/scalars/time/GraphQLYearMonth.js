import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {throwConversionError} from "../Utilities";
import moment from "moment";

const YEAR_MONTH = 'YearMonth';
const YEAR_MONTH_REGEX = /^-?\d*-(0?[1-9]|1[012])(?:Z|([+-])\d\d:\d\d)?$/;

function validateYearMonth(yearMonth) {
    if (!YEAR_MONTH_REGEX.test(yearMonth)) {
        throw new GraphQLError(`Invalid value for '${YEAR_MONTH}' - '${yearMonth}'`);
    }
}

/**
 * Builds 'yyyy-mm' format for the passed date. If the month is a single digit, to it will be added leading zero.
 *
 * @param value to retrieve the year and the month
 * @returns {string}
 */
function buildOutput(value) {
    let date = moment(value);
    return `${date.format("Y")}-${date.format("MM")}`;
}

/**
 * Defines custom GraphQLScalarType for RFC-3339 compliant year month values.
 */
export default new GraphQLScalarType({
    name: YEAR_MONTH,

    description: `An RFC-3339 compliant Year Month Scalar`,

    serialize(value) {
        if (value instanceof Date) {
            return buildOutput(value);
        } else if (typeof value === 'string' || value instanceof String) {
            if (YEAR_MONTH_REGEX.test(value)) {
                return value;
            }
            if (!isNaN(Date.parse(value))) {
                return buildOutput(value);
            }
        }

        throw new GraphQLError(`Expected '${YEAR_MONTH}' value, but got '${JSON.stringify(value)}'.`);
    },

    parseValue(value) {
        if (typeof value === 'string' || value instanceof String) {
            validateYearMonth(value);
            return value;
        }

        throw new GraphQLError(`Expected value in '${YEAR_MONTH}' format, but got '${JSON.stringify(value)}'.`);
    },

    parseLiteral(node) {
        if (node.kind !== Kind.STRING) {
            throwConversionError(node.kind, YEAR_MONTH);
        }

        let value = node.value;
        validateYearMonth(value);
        return value;
    }
});
