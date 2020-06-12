import {GraphQLError, GraphQLScalarType, Kind} from "graphql";
import {throwConversionError} from "../Utilities";

const YEAR_MONTH_REGEX = /^-?\d*-(0?[1-9]|1[012])(?:Z|([+-])\d\d:\d\d)?$/;

function validateYearMonth(yearMonth) {
    if (!YEAR_MONTH_REGEX.test(yearMonth)) {
        throw new GraphQLError(`Invalid value for 'YearMonth' - '${yearMonth}'`);
    }
}

/**
 * Defines custom GraphQLScalarType for RFC-3339 compliant year month values.
 */
export default new GraphQLScalarType({
    name: `YearMonth`,

    description: `An RFC-3339 compliant Year Month Scalar`,

    serialize(value) {
        if (value instanceof Date) {
            return value.getFullYear() + '-' + value.getMonth();
        } else if (typeof value === 'string' || value instanceof String) {
            if (!isNaN(Date.parse(value))) {
                let date = new Date(value);
                return date.getFullYear() + '-' + date.getMonth();
            }

            validateYearMonth(value);
            return value;
        }

        throw new GraphQLError(`Expected '${this.name}' value, but got '${JSON.stringify(value)}'.`);
    },

    parseValue(value) {
        if (typeof value === 'string' || value instanceof String) {
            validateYearMonth(value);
            return value;
        }

        throw new GraphQLError(`Expected value in '${this.name}' format, but got '${JSON.stringify(value)}'.`);
    },

    parseLiteral(node) {
        if (node.kind !== Kind.STRING) {
            throwConversionError(node.kind, this.name);
        }

        let value = node.value;
        validateYearMonth(value);
        return value;
    }
});
