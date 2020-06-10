import {describe, expect, test} from "@jest/globals";
import GraphQLUnsignedLong from "../../src/scalars/unsigned/GraphQLUnsignedLong";
import {Kind} from "graphql";
import BigNumber from "bignumber.js";

describe(`GraphQLUnsignedLong`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedLong.serialize(100)).toEqual('100'));

            test(`string`, () => expect(GraphQLUnsignedLong.serialize('100')).toEqual('100'));

            test(`float`, () => expect(GraphQLUnsignedLong.serialize(100.11)).toEqual('100'));

        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLUnsignedLong.serialize('string')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLUnsignedLong.serialize('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLUnsignedLong.serialize(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLUnsignedLong.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLUnsignedLong.serialize(null)).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedLong.parseValue(100)).toEqual('100'));

            test(`string`, () => expect(GraphQLUnsignedLong.parseValue('100')).toEqual('100'));

            test(`float`, () => expect(GraphQLUnsignedLong.parseValue(100.11)).toEqual('100'));

        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLUnsignedLong.parseValue('string')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLUnsignedLong.parseValue('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLUnsignedLong.parseValue(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLUnsignedLong.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLUnsignedLong.parseValue(null)).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedLong.parseLiteral({
                kind: Kind.INT,
                value: 100
            })).toEqual(new BigNumber(100)));

            test(`string`, () => expect(GraphQLUnsignedLong.parseLiteral({
                kind: Kind.STRING,
                value: '100'
            })).toEqual(new BigNumber(100)));

            test(`float`, () => expect(GraphQLUnsignedLong.parseLiteral({
                kind: Kind.STRING,
                value: '100.12'
            })).toEqual(new BigNumber(100)));

            test(`max value`, () => expect(GraphQLUnsignedLong.parseLiteral({
                kind: Kind.INT,
                value: 18446744073709552000
            })).toEqual(new BigNumber(18446744073709552000)));

            test(`zero`, () => expect(GraphQLUnsignedLong.parseLiteral({
                kind: Kind.STRING,
                value: 0
            })).toEqual(new BigNumber(0)));

        });

        describe(`invalid`, () => {

            test(`wrong node type`, () => expect(() => GraphQLUnsignedLong.parseLiteral({
                kind: Kind.BOOLEAN,
                value: true
            })).toThrow());

            test(`negative string`, () => expect(() => GraphQLUnsignedLong.parseLiteral({
                kind: Kind.STRING,
                value: '-10'
            })).toThrow());

            test(`negative int`, () => expect(() => GraphQLUnsignedLong.parseLiteral({
                kind: Kind.INT,
                value: -10
            })).toThrow());

            test(`over max value`, () => expect(() => GraphQLUnsignedLong.parseLiteral({
                kind: Kind.INT,
                value: 28446744073709552000
            })).toThrow());

        });
    });
});
