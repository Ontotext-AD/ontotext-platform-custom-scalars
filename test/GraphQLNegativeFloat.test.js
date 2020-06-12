import {describe, expect, test} from "@jest/globals";
import GraphQLNegativeFloat from "../src/scalars/GraphQLNegativeFloat";
import {Kind} from "graphql";

describe(`GraphQLNegativeFloat`, () => {

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLNegativeFloat.parseLiteral({
                kind: Kind.INT,
                value: -123
            })).toEqual(-123));

            test(`float`, () => expect(GraphQLNegativeFloat.parseLiteral({
                kind: Kind.FLOAT,
                value: -123.123
            })).toEqual(-123.123));
        });

        describe(`invalid`, () => {

            test(`positive string`, () => expect(() => GraphQLNegativeFloat.parseLiteral({
                kind: Kind.STRING,
                value: '123.123'
            })).toThrow());

            test(`positive int`, () => expect(() => GraphQLNegativeFloat.parseLiteral({
                kind: Kind.INT,
                value: 123
            })).toThrow());

            test(`positive float`, () => expect(() => GraphQLNegativeFloat.parseLiteral({
                kind: Kind.FLOAT,
                value: 123.123
            })).toThrow());

            test(`zero`, () => expect(() => GraphQLNegativeFloat.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toThrow());
        });
    });
});
