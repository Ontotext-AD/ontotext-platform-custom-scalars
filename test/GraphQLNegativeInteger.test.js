import {describe, expect, test} from "@jest/globals";
import GraphQLNegativeInteger from "../src/scalars/GraphQLNegativeInteger";
import {Kind} from "graphql";

describe(`GraphQLNegativeInteger`, () => {

    describe(`serialize`, () => {

        describe(`valid`, () => {

            test(`negative string`, () => expect(GraphQLNegativeInteger.serialize('-1234141')).toEqual('-1234141'));

            test(`large string`, () => expect(GraphQLNegativeInteger.serialize('-100000000000000000000000')).toEqual('-100000000000000000000000'));

            test(`number`, () => expect(GraphQLNegativeInteger.serialize(-100000)).toEqual('-100000'));

            test(`negative number`, () => expect(GraphQLNegativeInteger.serialize(-1234141)).toEqual('-1234141'));

            test(`large number`, () => expect(GraphQLNegativeInteger.serialize(-100000000000000000000000)).toEqual('-100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLNegativeInteger.serialize('Am I number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLNegativeInteger.serialize('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLNegativeInteger.serialize(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLNegativeInteger.serialize('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLNegativeInteger.serialize(null)).toThrow());
        });
    });

    describe(`parseValue`, () => {

        describe(`valid`, () => {

            test(`negative string`, () => expect(GraphQLNegativeInteger.parseValue('-123123')).toEqual('-123123'));

            test(`large string`, () => expect(GraphQLNegativeInteger.parseValue('-100000000000000000000000')).toEqual('-100000000000000000000000'));

            test(`negative number`, () => expect(GraphQLNegativeInteger.parseValue(-123123)).toEqual('-123123'));

            test(`large number`, () => expect(GraphQLNegativeInteger.parseValue(-100000000000000000000000)).toEqual('-100000000000000000000000'));
        });

        describe(`invalid`, () => {

            test(`string, which is not a number`, () => expect(() => GraphQLNegativeInteger.parseValue('Definitely not a number')).toThrow());

            test(`boolean value string`, () => expect(() => GraphQLNegativeInteger.parseValue('true')).toThrow());

            test(`boolean value`, () => expect(() => GraphQLNegativeInteger.parseValue(true)).toThrow());

            test(`empty string`, () => expect(() => GraphQLNegativeInteger.parseValue('')).toThrow());

            test(`'null' value`, () => expect(() => GraphQLNegativeInteger.parseValue(null)).toThrow());
        });
    });

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLNegativeInteger.parseLiteral({
                kind: Kind.STRING,
                value: '-123'
            })).toEqual('-123'));

            test(`int`, () => expect(GraphQLNegativeInteger.parseLiteral({
                kind: Kind.INT,
                value: -123
            })).toEqual('-123'));

            test(`large number`, () => expect(GraphQLNegativeInteger.parseLiteral({
                kind: Kind.INT,
                value: '-123123123123123123'
            })).toEqual('-123123123123123123'));
        });

        describe(`invalid`, () => {

            test(`positive string`, () => expect(() => GraphQLNegativeInteger.parseLiteral({
                kind: Kind.STRING,
                value: '123.123'
            })).toThrow());

            test(`positive int`, () => expect(() => GraphQLNegativeInteger.parseLiteral({
                kind: Kind.INT,
                value: 123
            })).toThrow());

            test(`positive float`, () => expect(() => GraphQLNegativeInteger.parseLiteral({
                kind: Kind.FLOAT,
                value: 123.123
            })).toThrow());

            test(`negative float`, () => expect(() => GraphQLNegativeInteger.parseLiteral({
                kind: Kind.FLOAT,
                value: -12.3
            })).toThrow());

            test(`zero`, () => expect(() => GraphQLNegativeInteger.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toThrow());
        });
    });
});
