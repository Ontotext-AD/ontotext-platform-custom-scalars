import {describe, expect, test} from "@jest/globals";
import GraphQLDecimal from "../src/scalars/GraphQLDecimal";
import {Kind} from "graphql";
import BigNumber from "bignumber.js";

describe(`GraphQLDecimal`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDecimal.serialize('100.001')).toEqual('100.001'));

            test(`negative string`, () => expect(GraphQLDecimal.serialize('-100.001')).toEqual('-100.001'));

            test(`large string`, () => expect(GraphQLDecimal.serialize('10000000000.0000123123')).toEqual('10000000000.0000123123'));

            test(`number`, () => expect(GraphQLDecimal.serialize(100000.999)).toEqual('100000.999'));

            test(`negative number`, () => expect(GraphQLDecimal.serialize(-100000.999)).toEqual('-100000.999'));

            test(`large number`, () => expect(GraphQLDecimal.serialize(100000000.000999)).toEqual('100000000.000999'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLDecimal.serialize('!Number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLDecimal.serialize('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLDecimal.serialize(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLDecimal.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLDecimal.serialize(null)).toThrow());
        });

    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDecimal.parseValue('100.33')).toEqual('100.33'));

            test(`negative string`, () => expect(GraphQLDecimal.parseValue('-100.44')).toEqual('-100.44'));

            test(`large string`, () => expect(GraphQLDecimal.parseValue('10000000000.12600000000')).toEqual('10000000000.126'));

            test(`number`, () => expect(GraphQLDecimal.parseValue(100000.999)).toEqual('100000.999'));

            test(`negative number`, () => expect(GraphQLDecimal.parseValue(-100000.999)).toEqual('-100000.999'));

            test(`large number`, () => expect(GraphQLDecimal.parseValue(100000000000.000125)).toEqual('100000000000.00012'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLDecimal.parseValue('!Number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLDecimal.parseValue('false')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLDecimal.parseValue(false)).toThrow());

            test(`empty string`, () => expect(() => GraphQLDecimal.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLDecimal.parseValue(null)).toThrow());
        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLDecimal.parseLiteral({
                kind: Kind.STRING,
                value: '123123'
            })).toEqual(BigNumber(123123)));

            test(`integer`, () => expect(GraphQLDecimal.parseLiteral({
                kind: Kind.INT,
                value: 123123
            })).toEqual(BigNumber(123123)));

            test(`float`, () => expect(GraphQLDecimal.parseLiteral({
                kind: Kind.FLOAT,
                value: 12.3123
            })).toEqual(BigNumber(12.3123)));
        });

        describe(`invalid`, () => {

            test(`wrong node type`, () => expect(() => GraphQLDecimal.parseLiteral({
                kind: Kind.BOOLEAN,
                value: true
            })).toThrow());

            test(`alphabetic value`, () => expect(() => GraphQLDecimal.parseLiteral({
                kind: Kind.STRING,
                value: 'value'
            })).toThrow());
        });
    });
});
