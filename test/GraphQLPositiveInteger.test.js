import {describe, expect, test} from "@jest/globals";
import GraphQLPositiveInteger from "../src/scalars/GraphQLPositiveInteger";
import {Kind} from "graphql";

describe(`GraphQLPositiveInteger`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLPositiveInteger.serialize('123')).toEqual('123'));

            test(`large string`, () => expect(GraphQLPositiveInteger.serialize('100000000000000000000000')).toEqual('100000000000000000000000'));

            test(`number`, () => expect(GraphQLPositiveInteger.serialize(100000)).toEqual('100000'));

            test(`large number`, () => expect(GraphQLPositiveInteger.serialize(100000000000000000000000)).toEqual('100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLPositiveInteger.serialize('batman')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLPositiveInteger.serialize('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLPositiveInteger.serialize(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLPositiveInteger.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLPositiveInteger.serialize(null)).toThrow());
        });

    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLPositiveInteger.parseValue('123321')).toEqual('123321'));

            test(`large string`, () => expect(GraphQLPositiveInteger.parseValue('100000000000000000000000')).toEqual('100000000000000000000000'));

            test(`number`, () => expect(GraphQLPositiveInteger.parseValue(100000)).toEqual('100000'));

            test(`large number`, () => expect(GraphQLPositiveInteger.parseValue(100000000000000000000000)).toEqual('100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLPositiveInteger.parseValue('Definitely')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLPositiveInteger.parseValue('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLPositiveInteger.parseValue(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLPositiveInteger.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLPositiveInteger.parseValue(null)).toThrow());
        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLPositiveInteger.parseLiteral({
                kind: Kind.STRING,
                value: '123123'
            })).toEqual('123123'));

            test(`integer`, () => expect(GraphQLPositiveInteger.parseLiteral({
                kind: Kind.INT,
                value: 123123
            })).toEqual('123123'));
        });

        describe(`invalid`, () => {

            test(`wrong node type`, () => expect(() => GraphQLPositiveInteger.parseLiteral({
                kind: Kind.FLOAT,
                value: 1.2
            })).toThrow());

            test(`not integer value`, () => expect(() => GraphQLPositiveInteger.parseLiteral({
                kind: Kind.INT,
                value: '123.123'
            })).toThrow());

            test(`alphabetic value`, () => expect(() => GraphQLPositiveInteger.parseLiteral({
                kind: Kind.STRING,
                value: 'number'
            })).toThrow());

            test(`negative string`, () => expect(() => GraphQLPositiveInteger.parseLiteral({
                kind: Kind.STRING,
                value: '-123'
            })).toThrow());

            test(`negative int`, () => expect(() => GraphQLPositiveInteger.parseLiteral({
                kind: Kind.INT,
                value: -12
            })).toThrow());

            test(`zero`, () => expect(() => GraphQLPositiveInteger.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toThrow());
        });
    });
});
