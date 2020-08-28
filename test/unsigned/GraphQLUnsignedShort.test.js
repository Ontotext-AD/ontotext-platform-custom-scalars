import {describe, expect, test} from "@jest/globals";
import GraphQLUnsignedShort from "../../src/scalars/unsigned/GraphQLUnsignedShort";
import {Kind} from "graphql";

describe(`GraphQLUnsignedShort`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedShort.serialize(100)).toEqual('100'));

            test(`string`, () => expect(GraphQLUnsignedShort.serialize('100')).toEqual('100'));

            test(`float`, () => expect(GraphQLUnsignedShort.serialize(100.11)).toEqual('100'));

        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLUnsignedShort.serialize('string')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLUnsignedShort.serialize('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLUnsignedShort.serialize(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLUnsignedShort.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLUnsignedShort.serialize(null)).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedShort.parseValue(100)).toEqual('100'));

            test(`string`, () => expect(GraphQLUnsignedShort.parseValue('100')).toEqual('100'));

            test(`float`, () => expect(GraphQLUnsignedShort.parseValue(100.11)).toEqual('100'));

        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLUnsignedShort.parseValue('string')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLUnsignedShort.parseValue('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLUnsignedShort.parseValue(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLUnsignedShort.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLUnsignedShort.parseValue(null)).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedShort.parseLiteral({
                kind: Kind.INT,
                value: 100
            })).toEqual('100'));

            test(`string`, () => expect(GraphQLUnsignedShort.parseLiteral({
                kind: Kind.STRING,
                value: 100
            })).toEqual('100'));

            test(`float`, () => expect(GraphQLUnsignedShort.parseLiteral({
                kind: Kind.STRING,
                value: '100.12'
            })).toEqual('100'));

            test(`max value`, () => expect(GraphQLUnsignedShort.parseLiteral({
                kind: Kind.INT,
                value: 65535
            })).toEqual('65535'));

            test(`zero`, () => expect(GraphQLUnsignedShort.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toEqual('0'));

        });

        describe(`invalid`, () => {

            test(`wrong node type`, () => expect(() => GraphQLUnsignedShort.parseLiteral({
                kind: Kind.BOOLEAN,
                value: true
            })).toThrow());

            test(`negative string`, () => expect(() => GraphQLUnsignedShort.parseLiteral({
                kind: Kind.STRING,
                value: '-10'
            })).toThrow());

            test(`negative int`, () => expect(() => GraphQLUnsignedShort.parseLiteral({
                kind: Kind.INT,
                value: -10
            })).toThrow());

            test(`over max value`, () => expect(() => GraphQLUnsignedShort.parseLiteral({
                kind: Kind.INT,
                value: 65536
            })).toThrow());
        });
    });
});
