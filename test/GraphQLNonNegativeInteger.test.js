import {describe, expect, test} from "@jest/globals";
import GraphQLNonNegativeInteger from "../src/scalars/GraphQLNonNegativeInteger";
import {Kind} from "graphql";
import BigNumber from "bignumber.js";

describe(`GraphQLNonNegativeInteger`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLNonNegativeInteger.serialize('123')).toEqual('123'));

            test(`large string`, () => expect(GraphQLNonNegativeInteger.serialize('100000000000000000000000')).toEqual('100000000000000000000000'));

            test(`number`, () => expect(GraphQLNonNegativeInteger.serialize(100000)).toEqual('100000'));

            test(`large number`, () => expect(GraphQLNonNegativeInteger.serialize(100000000000000000000000)).toEqual('100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLNonNegativeInteger.serialize('Am I number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLNonNegativeInteger.serialize('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLNonNegativeInteger.serialize(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLNonNegativeInteger.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLNonNegativeInteger.serialize(null)).toThrow());
        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLNonNegativeInteger.parseValue('123321')).toEqual('123321'));

            test(`large string`, () => expect(GraphQLNonNegativeInteger.parseValue('100000000000000000000000')).toEqual('100000000000000000000000'));

            test(`number`, () => expect(GraphQLNonNegativeInteger.parseValue(100000)).toEqual('100000'));

            test(`large number`, () => expect(GraphQLNonNegativeInteger.parseValue(100000000000000000000000)).toEqual('100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLNonNegativeInteger.parseValue('Definitely not a number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLNonNegativeInteger.parseValue('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLNonNegativeInteger.parseValue(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLNonNegativeInteger.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLNonNegativeInteger.parseValue(null)).toThrow());
        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLNonNegativeInteger.parseLiteral({
                kind: Kind.STRING,
                value: '123'
            })).toEqual(new BigNumber(123)));

            test(`int`, () => expect(GraphQLNonNegativeInteger.parseLiteral({
                kind: Kind.INT,
                value: 123
            })).toEqual(new BigNumber(123)));

            test(`large number`, () => expect(GraphQLNonNegativeInteger.parseLiteral({
                kind: Kind.INT,
                value: 123123123123123123
            })).toEqual(new BigNumber(123123123123123123)));

            test(`zero`, () => expect(GraphQLNonNegativeInteger.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toEqual(new BigNumber(0)));
        });

        describe(`invalid`, () => {

            test(`negative string`, () => expect(() => GraphQLNonNegativeInteger.parseLiteral({
                kind: Kind.STRING,
                value: '-123.123'
            })).toThrow());

            test(`negative int`, () => expect(() => GraphQLNonNegativeInteger.parseLiteral({
                kind: Kind.INT,
                value: -123
            })).toThrow());

            test(`negative float`, () => expect(() => GraphQLNonNegativeInteger.parseLiteral({
                kind: Kind.FLOAT,
                value: -123.123
            })).toThrow());

            test(`negative float`, () => expect(() => GraphQLNonNegativeInteger.parseLiteral({
                kind: Kind.FLOAT,
                value: -12.3
            })).toThrow());
        });
    });
});
