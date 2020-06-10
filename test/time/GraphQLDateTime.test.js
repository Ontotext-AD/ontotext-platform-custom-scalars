import {describe, expect, test} from "@jest/globals";
import GraphQLDateTime from "../../src/scalars/time/GraphQLDateTime";
import {Kind} from "graphql";

describe(`GraphQLDateTime`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`date object`, () => expect(GraphQLDateTime.serialize(new Date('Wed Jun 10 2020 09:42:45 GMT+0300'))).toEqual('2020-06-10T06:42:45.000Z'));

            test(`string`, () => expect(GraphQLDateTime.serialize('Wed Jun 10 2020 09:42:45 GMT+0300')).toEqual('2020-06-10T06:42:45.000Z'));

            test(`string UTC format`, () => expect(GraphQLDateTime.serialize('Wed, 10 Jun 2020 06:42:45 GMT')).toEqual('2020-06-10T06:42:45.000Z'));

        });

        describe(`invalid`, () => {

            test(`not date`, () => expect(() => GraphQLDateTime.serialize(new Map())).toThrow());

            test(`empty string`, () => expect(() => GraphQLDateTime.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLDateTime.serialize(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLDateTime.serialize(NaN)).toThrow());

            test(`invalid string`, () => expect(() => GraphQLDateTime.serialize('date')).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDateTime.parseValue('2020-06-10T06:42:45.000Z')).toEqual(new Date('2020-06-10T06:42:45.000Z')));

        });

        describe(`invalid`, () => {

            test(`empty string`, () => expect(() => GraphQLDateTime.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLDateTime.parseValue(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLDateTime.parseValue(NaN)).toThrow());

            test(`invalid date string`, () => expect(() => GraphQLDateTime.parseValue('Wed Jun 10 2020 09:42:45 GMT+0300')).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDateTime.parseLiteral({
                kind: Kind.STRING,
                value: '2020-06-10T06:42:45.000Z'
            })).toEqual(new Date('2020-06-10T06:42:45.000Z')));

        });

        describe(`invalid`, () => {

            test(`invalid string date`, () => expect(() => GraphQLDateTime.parseLiteral({
                kind: Kind.STRING,
                value: 'Wed Jun 10 2020 09:42:45 GMT+0300'
            })).toThrow());

            test(`invalid node type`, () => expect(() => GraphQLDateTime.parseLiteral({
                kind: Kind.INT,
                value: 1
            })).toThrow());

            test(`NaN`, () => expect(() => GraphQLDateTime.parseLiteral({
                kind: Kind.STRING,
                value: 'NaN'
            })).toThrow());

            test(`'null'`, () => expect(() => GraphQLDateTime.parseLiteral({
                kind: Kind.STRING,
                value: 'null'
            })).toThrow());

        });
    });
});
