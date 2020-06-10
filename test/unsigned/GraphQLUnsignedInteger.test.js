import {describe, expect, test} from "@jest/globals";
import GraphQLUnsignedInteger from "../../src/scalars/unsigned/GraphQLUnsignedInteger";
import {Kind} from "graphql";

describe(`GraphQLUnsignedInteger`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedInteger.serialize(100)).toEqual(100));

            test(`string`, () => expect(GraphQLUnsignedInteger.serialize('100')).toEqual(100));

            test(`float`, () => expect(GraphQLUnsignedInteger.serialize(100.11)).toEqual(100));

        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLUnsignedInteger.serialize('string')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLUnsignedInteger.serialize('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLUnsignedInteger.serialize(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLUnsignedInteger.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLUnsignedInteger.serialize(null)).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedInteger.parseValue(100)).toEqual(100));

            test(`string`, () => expect(GraphQLUnsignedInteger.parseValue('100')).toEqual(100));

            test(`float`, () => expect(GraphQLUnsignedInteger.parseValue(100.11)).toEqual(100));

        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLUnsignedInteger.parseValue('string')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLUnsignedInteger.parseValue('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLUnsignedInteger.parseValue(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLUnsignedInteger.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLUnsignedInteger.parseValue(null)).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.INT,
                value: 100
            })).toEqual(100));

            test(`string`, () => expect(GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.STRING,
                value: 100
            })).toEqual(100));

            test(`float`, () => expect(GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.STRING,
                value: '100.12'
            })).toEqual(100));

            test(`max value`, () => expect(GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.INT,
                value: 4294967296
            })).toEqual(4294967296));

            test(`zero`, () => expect(GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.STRING,
                value: '0'
            })).toEqual(0));

        });

        describe(`invalid`, () => {

            test(`wrong node type`, () => expect(() => GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.BOOLEAN,
                value: true
            })).toThrow());

            test(`negative string`, () => expect(() => GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.STRING,
                value: '-10'
            })).toThrow());

            test(`negative int`, () => expect(() => GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.INT,
                value: -10
            })).toThrow());

            test(`over max value`, () => expect(() => GraphQLUnsignedInteger.parseLiteral({
                kind: Kind.INT,
                value: 4294967297
            })).toThrow());

        });
    });
});
