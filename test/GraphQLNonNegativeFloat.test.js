import {describe, expect, test} from "@jest/globals";
import GraphQLNonNegativeFloat from "../src/scalars/GraphQLNonNegativeFloat";
import {Kind} from "graphql";

describe(`GraphQLNonNegativeFloat`, () => {

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLNonNegativeFloat.parseLiteral({
                kind: Kind.INT,
                value: 123
            })).toEqual('123'));

            test(`float`, () => expect(GraphQLNonNegativeFloat.parseLiteral({
                kind: Kind.FLOAT,
                value: 123.123
            })).toEqual('123.123'));

            test(`zero`, () => expect(GraphQLNonNegativeFloat.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toEqual('0'));
        });

        describe(`invalid`, () => {

            test(`negative string`, () => expect(() => GraphQLNonNegativeFloat.parseLiteral({
                kind: Kind.STRING,
                value: '-123.123'
            })).toThrow());

            test(`negative int`, () => expect(() => GraphQLNonNegativeFloat.parseLiteral({
                kind: Kind.INT,
                value: -123
            })).toThrow());

            test(`negative float`, () => expect(() => GraphQLNonNegativeFloat.parseLiteral({
                kind: Kind.FLOAT,
                value: -123.123
            })).toThrow());
        });
    });
});
