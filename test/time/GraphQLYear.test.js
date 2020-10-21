import {describe, expect, test} from "@jest/globals";
import GraphQLYear from "../../src/scalars/time/GraphQLYear";
import {Kind} from "graphql";

describe(`GraphQLYear`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`date object`, () => expect(GraphQLYear.serialize(new Date('Wed Jun 10 2020 09:42:45 GMT+0300'))).toEqual('2020'));

            test(`string`, () => expect(GraphQLYear.serialize('2020')).toEqual('2020'));

            test(`negative string year`, () => expect(GraphQLYear.serialize('-2020')).toEqual('-2020'));

            test(`string UTC format`, () => expect(GraphQLYear.serialize('Wed, 10 Jun 2020 06:54:06 GMT')).toEqual('2020'));

            test(`string UTC format with negative year`, () => expect(GraphQLYear.serialize('Wed, 10 Jun -2020 06:54:06 GMT')).toEqual('-2020'));

        });

        describe(`invalid`, () => {

            test(`not date`, () => expect(() => GraphQLYear.serialize(new Map())).toThrow());

            test(`empty string`, () => expect(() => GraphQLYear.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLYear.serialize(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLYear.serialize(NaN)).toThrow());

            test(`invalid string`, () => expect(() => GraphQLYear.serialize('date')).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLYear.parseValue('2020')).toEqual('2020'));

            test(`negative string`, () => expect(GraphQLYear.parseValue('-2020')).toEqual('-2020'));

        });

        describe(`invalid`, () => {

            test(`empty string`, () => expect(() => GraphQLYear.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLYear.parseValue(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLYear.parseValue(NaN)).toThrow());

            test(`invalid date string`, () => expect(() => GraphQLYear.parseValue('Wed Jun 21')).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLYear.parseLiteral({
                kind: Kind.STRING,
                value: '2020'
            })).toEqual('2020'));

            test(`negative string`, () => expect(GraphQLYear.parseLiteral({
                kind: Kind.STRING,
                value: '-2020'
            })).toEqual('-2020'));

        });

        describe(`invalid`, () => {

            test(`invalid node type`, () => expect(() => GraphQLYear.parseLiteral({
                kind: Kind.INT,
                value: 1
            })).toThrow());

            test(`NaN`, () => expect(() => GraphQLYear.parseLiteral({
                kind: Kind.STRING,
                value: 'NaN'
            })).toThrow());

            test(`'null'`, () => expect(() => GraphQLYear.parseLiteral({
                kind: Kind.STRING,
                value: 'null'
            })).toThrow());

        });
    });
});
