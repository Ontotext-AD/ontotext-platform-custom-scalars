import {describe, expect, test} from "@jest/globals";
import GraphQLDate from "../../src/scalars/time/GraphQLDate";
import {Kind} from "graphql";

describe(`GraphQLDate`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`date object`, () => expect(GraphQLDate.serialize(new Date('Wed Jun 10 2020 09:42:45 GMT+0300'))).toEqual('2020-06-10'));

            test(`string`, () => expect(GraphQLDate.serialize('Wed Jun 10 2020 09:42:45 GMT+0300')).toEqual('2020-06-10'));

            test(`string UTC format`, () => expect(GraphQLDate.serialize('Wed, 10 Jun 2020 06:54:06 GMT')).toEqual('2020-06-10'));

        });

        describe(`invalid`, () => {

            test(`not date`, () => expect(() => GraphQLDate.serialize(new Map())).toThrow());

            test(`empty string`, () => expect(() => GraphQLDate.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLDate.serialize(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLDate.serialize(NaN)).toThrow());

            test(`invalid string`, () => expect(() => GraphQLDate.serialize('date')).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDate.parseValue('2020-06-10')).toEqual(new Date('2020-06-10')));

        });

        describe(`invalid`, () => {

            test(`empty string`, () => expect(() => GraphQLDate.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLDate.parseValue(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLDate.parseValue(NaN)).toThrow());

            test(`invalid date string`, () => expect(() => GraphQLDate.parseValue('Wed Jun 10 2020 09:42:45 GMT+0300')).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDate.parseLiteral({
                kind: Kind.STRING,
                value: '2020-06-10'
            })).toEqual(new Date('2020-06-10')));

        });

        describe(`invalid`, () => {

            test(`invalid string date`, () => expect(() => GraphQLDate.parseLiteral({
                kind: Kind.STRING,
                value: 'Wed Jun 10 2020 09:42:45 GMT+0300'
            })).toThrow());

            test(`invalid node type`, () => expect(() => GraphQLDate.parseLiteral({
                kind: Kind.INT,
                value: 1
            })).toThrow());

            test(`NaN`, () => expect(() => GraphQLDate.parseLiteral({
                kind: Kind.STRING,
                value: 'NaN'
            })).toThrow());

            test(`'null'`, () => expect(() => GraphQLDate.parseLiteral({
                kind: Kind.STRING,
                value: 'null'
            })).toThrow());

        });
    });
});
