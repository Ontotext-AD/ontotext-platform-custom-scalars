import {describe, expect, test} from "@jest/globals";
import GraphQLUnsignedByte from "../../src/scalars/unsigned/GraphQLUnsignedByte";
import {Kind} from "graphql";

describe(`GraphQLUnsignedByte`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedByte.serialize(100)).toEqual('100'));

            test(`string`, () => expect(GraphQLUnsignedByte.serialize('100')).toEqual('100'));

            test(`float`, () => expect(GraphQLUnsignedByte.serialize(100.11)).toEqual('100'));

        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLUnsignedByte.serialize('string')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLUnsignedByte.serialize('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLUnsignedByte.serialize(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLUnsignedByte.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLUnsignedByte.serialize(null)).toThrow());

        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedByte.parseValue(100)).toEqual('100'));

            test(`string`, () => expect(GraphQLUnsignedByte.parseValue('100')).toEqual('100'));

            test(`float`, () => expect(GraphQLUnsignedByte.parseValue(100.11)).toEqual('100'));

        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLUnsignedByte.parseValue('string')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLUnsignedByte.parseValue('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLUnsignedByte.parseValue(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLUnsignedByte.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLUnsignedByte.parseValue(null)).toThrow());

        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLUnsignedByte.parseLiteral({
                kind: Kind.INT,
                value: 100
            })).toEqual('100'));

            test(`string`, () => expect(GraphQLUnsignedByte.parseLiteral({
                kind: Kind.STRING,
                value: 100
            })).toEqual('100'));

            test(`float`, () => expect(GraphQLUnsignedByte.parseLiteral({
                kind: Kind.STRING,
                value: '100.12'
            })).toEqual('100'));

            test(`max value`, () => expect(GraphQLUnsignedByte.parseLiteral({
                kind: Kind.INT,
                value: 255
            })).toEqual('255'));

            test(`zero`, () => expect(GraphQLUnsignedByte.parseLiteral({
                kind: Kind.STRING,
                value: '0'
            })).toEqual('0'));

        });

        describe(`invalid`, () => {

            test(`wrong node type`, () => expect(() => GraphQLUnsignedByte.parseLiteral({
                kind: Kind.BOOLEAN,
                value: true
            })).toThrow());

            test(`negative string`, () => expect(() => GraphQLUnsignedByte.parseLiteral({
                kind: Kind.STRING,
                value: '-10'
            })).toThrow());

            test(`negative int`, () => expect(() => GraphQLUnsignedByte.parseLiteral({
                kind: Kind.INT,
                value: -10
            })).toThrow());

            test(`over max value`, () => expect(() => GraphQLUnsignedByte.parseLiteral({
                kind: Kind.INT,
                value: 256
            })).toThrow());
        });
    });
});
