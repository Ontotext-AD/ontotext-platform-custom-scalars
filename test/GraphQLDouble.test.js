import {describe, expect, test} from "@jest/globals";
import GraphQLDouble from "../src/scalars/GraphQLDouble";
import {Kind} from "graphql";

describe(`GraphQLDouble`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDouble.serialize('1.001')).toEqual(1.001));

            test(`negative string`, () => expect(GraphQLDouble.serialize('-1.001')).toEqual(-1.001));

            test(`large string`, () => expect(GraphQLDouble.serialize('1000.123123')).toEqual(1000.123123));

            test(`number`, () => expect(GraphQLDouble.serialize(1.999)).toEqual(1.999));

            test(`negative number`, () => expect(GraphQLDouble.serialize(-100000.999)).toEqual(-100000.999));

            test(`large number`, () => expect(GraphQLDouble.serialize(1000000000000.999)).toEqual(1000000000000.999));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLDouble.serialize('!Number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLDouble.serialize('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLDouble.serialize(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLDouble.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLDouble.serialize(null)).toThrow());
        });

    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDouble.parseValue('100.33')).toEqual(100.33));

            test(`negative string`, () => expect(GraphQLDouble.parseValue('-100.44')).toEqual(-100.44));

            test(`large string`, () => expect(GraphQLDouble.parseValue('10000000000.12600000000')).toEqual(10000000000.126));

            test(`number`, () => expect(GraphQLDouble.parseValue(100000.999)).toEqual(100000.999));

            test(`negative number`, () => expect(GraphQLDouble.parseValue(-100000.999)).toEqual(-100000.999));

            test(`large number`, () => expect(GraphQLDouble.parseValue(100000000000.000125)).toEqual(100000000000.00012));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLDouble.parseValue('!Number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLDouble.parseValue('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLDouble.parseValue(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLDouble.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLDouble.parseValue(null)).toThrow());
        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDouble.parseLiteral({
                kind: Kind.STRING,
                value: '123123'
            })).toEqual(123123));

            test(`integer`, () => expect(GraphQLDouble.parseLiteral({
                kind: Kind.INT,
                value: 12121212
            })).toEqual(12121212));

            test(`float`, () => expect(GraphQLDouble.parseLiteral({
                kind: Kind.FLOAT,
                value: 123123.3123
            })).toEqual(123123.3123));

            test(`maximum value`, () => expect(GraphQLDouble.parseLiteral({
                kind: Kind.FLOAT,
                value: 9007199254740991
            })).toEqual(9007199254740991));

            test(`minimum value`, () => expect(GraphQLDouble.parseLiteral({
                kind: Kind.FLOAT,
                value: -9007199254740991
            })).toEqual(-9007199254740991));
        });

        describe(`invalid`, () => {

            test(`wrong node type`, () => expect(() => GraphQLDouble.parseLiteral({
                kind: Kind.BOOLEAN,
                value: true
            })).toThrow());

            test(`alphabetic value`, () => expect(() => GraphQLDouble.parseLiteral({
                kind: Kind.STRING,
                value: 'value'
            })).toThrow());

            test(`minimum allowed value -1`, () => expect(() => GraphQLDouble.parseLiteral({
                kind: Kind.INT,
                value: -9007199254740992
            })).toThrow());

            test(`maximum allowed value +1`, () => expect(() => GraphQLDouble.parseLiteral({
                kind: Kind.INT,
                value: 9007199254740992
            })).toThrow());
        });
    });
});
