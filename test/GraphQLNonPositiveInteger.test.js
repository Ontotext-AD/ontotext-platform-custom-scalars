import {describe, expect, test} from "@jest/globals";
import GraphQLNonPositiveInteger from "../src/scalars/GraphQLNonPositiveInteger";
import {Kind} from "graphql";

describe(`GraphQLNonPositiveInteger`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLNonPositiveInteger.serialize('-1234141')).toEqual('-1234141'));

            test(`large string`, () => expect(GraphQLNonPositiveInteger.serialize('-100000000000000000000000')).toEqual('-100000000000000000000000'));

            test(`number`, () => expect(GraphQLNonPositiveInteger.serialize(-100000)).toEqual('-100000'));

            test(`large number`, () => expect(GraphQLNonPositiveInteger.serialize(-100000000000000000000000)).toEqual('-100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLNonPositiveInteger.serialize('Am I number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLNonPositiveInteger.serialize('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLNonPositiveInteger.serialize(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLNonPositiveInteger.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLNonPositiveInteger.serialize(null)).toThrow());
        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLNonPositiveInteger.parseValue('-123123')).toEqual('-123123'));

            test(`large string`, () => expect(GraphQLNonPositiveInteger.parseValue('-100000000000000000000000')).toEqual('-100000000000000000000000'));

            test(`number`, () => expect(GraphQLNonPositiveInteger.parseValue(-123123)).toEqual('-123123'));

            test(`large number`, () => expect(GraphQLNonPositiveInteger.parseValue(-100000000000000000000000)).toEqual('-100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLNonPositiveInteger.parseValue('Definitely not a number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLNonPositiveInteger.parseValue('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLNonPositiveInteger.parseValue(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLNonPositiveInteger.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLNonPositiveInteger.parseValue(null)).toThrow());
        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`string`, () => expect(GraphQLNonPositiveInteger.parseLiteral({
                kind: Kind.STRING,
                value: '-1000'
            })).toEqual('-1000'));

            test(`int`, () => expect(GraphQLNonPositiveInteger.parseLiteral({
                kind: Kind.INT,
                value: -123
            })).toEqual('-123'));

            test(`zero`, () => expect(GraphQLNonPositiveInteger.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toEqual('0'));
        });

        describe(`invalid`, () => {

            test(`float string`, () => expect(() => GraphQLNonPositiveInteger.parseLiteral({
                kind: Kind.STRING,
                value: '123.123'
            })).toThrow());

            test(`positive string`, () => expect(() => GraphQLNonPositiveInteger.parseLiteral({
                kind: Kind.STRING,
                value: '123'
            })).toThrow());

            test(`positive int`, () => expect(() => GraphQLNonPositiveInteger.parseLiteral({
                kind: Kind.INT,
                value: 123
            })).toThrow());

            test(`float`, () => expect(() => GraphQLNonPositiveInteger.parseLiteral({
                kind: Kind.FLOAT,
                value: 1.2
            })).toThrow());
        });
    });
});
