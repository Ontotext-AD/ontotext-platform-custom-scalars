import {describe, expect, test} from "@jest/globals";
import GraphQLTime from "../../src/scalars/time/GraphQLTime";
import {Kind} from "graphql";

describe(`GraphQLTime`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`date object`, () => expect(GraphQLTime.serialize(new Date('Wed, 10 Jun 2020 06:54:06 GMT'))).toEqual('06:54:06.000Z'));

            test(`string`, () => expect(GraphQLTime.serialize('Wed, 10 Jun 2020 06:54:06 GMT')).toEqual('06:54:06.000Z'));

        });

        describe(`invalid`, () => {

            test(`not time`, () => expect(() => GraphQLTime.serialize(new Map())).toThrow());

            test(`empty string`, () => expect(() => GraphQLTime.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLTime.serialize(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLTime.serialize(NaN)).toThrow());

            test(`invalid string`, () => expect(() => GraphQLTime.serialize('time')).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLTime.parseValue('06:42:45.000Z')).toEqual('06:42:45.000Z'));

        });

        describe(`invalid`, () => {

            test(`empty string`, () => expect(() => GraphQLTime.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLTime.parseValue(null)).toThrow());

            test(`'NaN' value`, () => expect(() => GraphQLTime.parseValue(NaN)).toThrow());

            test(`invalid time string`, () => expect(() => GraphQLTime.parseValue('Wed Jun 10 2020 09:42:45 GMT+0300')).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLTime.parseLiteral({
                kind: Kind.STRING,
                value: '06:42:45.000Z'
            })).toEqual('06:42:45.000Z'));

        });

        describe(`invalid`, () => {

            test(`invalid time string`, () => expect(() => GraphQLTime.parseLiteral({
                kind: Kind.STRING,
                value: '09:42:45 GMT+0300'
            })).toThrow());

            test(`invalid node type`, () => expect(() => GraphQLTime.parseLiteral({
                kind: Kind.INT,
                value: 1
            })).toThrow());

            test(`NaN`, () => expect(() => GraphQLTime.parseLiteral({
                kind: Kind.STRING,
                value: 'NaN'
            })).toThrow());

            test(`'null'`, () => expect(() => GraphQLTime.parseLiteral({
                kind: Kind.STRING,
                value: 'null'
            })).toThrow());

        });
    });
});
