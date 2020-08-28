import {describe, expect, test} from "@jest/globals";
import GraphQLYearMonth from "../../src/scalars/time/GraphQLYearMonth";
import {Kind} from "graphql";

describe(`GraphQLYearMonth`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`date object`, () => expect(GraphQLYearMonth.serialize(new Date('Wed Jun 10 2020 09:42:45 GMT+0300'))).toEqual('2020-05'));

            test(`string`, () => expect(GraphQLYearMonth.serialize('Wed Jun 10 2020 09:42:45 GMT+0300')).toEqual('2020-05'));

            test(`string UTC format`, () => expect(GraphQLYearMonth.serialize('Wed, 10 Jun 2020 06:54:06 GMT')).toEqual('2020-05'));

            test(`month without leading zero`, () => expect(GraphQLYearMonth.serialize('Wed, 10 Nov 2020 06:54:06 GMT')).toEqual('2020-10'));

        });

        describe(`invalid`, () => {

            test(`not date`, () => expect(() => GraphQLYearMonth.serialize(new Map())).toThrow());

            test(`empty string`, () => expect(() => GraphQLYearMonth.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLYearMonth.serialize(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLYearMonth.serialize(NaN)).toThrow());

            test(`invalid string`, () => expect(() => GraphQLYearMonth.serialize('date')).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLYearMonth.parseValue('2020-5')).toEqual('2020-5'));

        });

        describe(`invalid`, () => {

            test(`empty string`, () => expect(() => GraphQLYearMonth.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLYearMonth.parseValue(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLYearMonth.parseValue(NaN)).toThrow());

            test(`invalid date string`, () => expect(() => GraphQLYearMonth.parseValue('Wed Jun 21')).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLYearMonth.parseLiteral({
                kind: Kind.STRING,
                value: '2020-5'
            })).toEqual('2020-5'));

        });

        describe(`invalid`, () => {

            test(`invalid node type`, () => expect(() => GraphQLYearMonth.parseLiteral({
                kind: Kind.INT,
                value: 1
            })).toThrow());

            test(`NaN`, () => expect(() => GraphQLYearMonth.parseLiteral({
                kind: Kind.STRING,
                value: 'NaN'
            })).toThrow());

            test(`'null'`, () => expect(() => GraphQLYearMonth.parseLiteral({
                kind: Kind.STRING,
                value: 'null'
            })).toThrow());

        });
    });
});
