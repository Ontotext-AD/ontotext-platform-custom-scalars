import {describe, expect, test} from "@jest/globals";
import GraphQLInteger from "../src/scalars/GraphQLInteger";
import {Kind} from "graphql";
import BigNumber from "bignumber.js";

describe(`GraphQLInteger`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLInteger.serialize('123')).toEqual('123'));

            test(`negative string`, () => expect(GraphQLInteger.serialize('-1234141')).toEqual('-1234141'));

            test(`large string`, () => expect(GraphQLInteger.serialize('100000000000000000000000')).toEqual('100000000000000000000000'));

            test(`number`, () => expect(GraphQLInteger.serialize(100000)).toEqual('100000'));

            test(`negative number`, () => expect(GraphQLInteger.serialize(-1234141)).toEqual('-1234141'));

            test(`large number`, () => expect(GraphQLInteger.serialize(100000000000000000000000)).toEqual('100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLInteger.serialize('Am I number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLInteger.serialize('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLInteger.serialize(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLInteger.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLInteger.serialize(null)).toThrow());
        });

    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLInteger.parseValue('123321')).toEqual('123321'));

            test(`negative string`, () => expect(GraphQLInteger.parseValue('-123123')).toEqual('-123123'));

            test(`large string`, () => expect(GraphQLInteger.parseValue('100000000000000000000000')).toEqual('100000000000000000000000'));

            test(`number`, () => expect(GraphQLInteger.parseValue(100000)).toEqual('100000'));

            test(`negative number`, () => expect(GraphQLInteger.parseValue(-123123)).toEqual('-123123'));

            test(`large number`, () => expect(GraphQLInteger.parseValue(100000000000000000000000)).toEqual('100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLInteger.parseValue('Definitely not a number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLInteger.parseValue('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLInteger.parseValue(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLInteger.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLInteger.parseValue(null)).toThrow());
        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLInteger.parseLiteral({
                kind: Kind.STRING,
                value: '123123'
            })).toEqual(BigNumber(123123)));

            test(`integer`, () => expect(GraphQLInteger.parseLiteral({
                kind: Kind.INT,
                value: 123123
            })).toEqual(BigNumber(123123)));
        });

        describe(`invalid`, () => {

            test(`wrong node type`, () => expect(() => GraphQLInteger.parseLiteral({
                kind: Kind.FLOAT,
                value: '123123'
            })).toThrow());

            test(`not integer value`, () => expect(() => GraphQLInteger.parseLiteral({
                kind: Kind.INT,
                value: '123.123'
            })).toThrow());

            test(`alphabetic value`, () => expect(() => GraphQLInteger.parseLiteral({
                kind: Kind.STRING,
                value: 'number'
            })).toThrow());
        });
    });
});
