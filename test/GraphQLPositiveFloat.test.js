import {describe, expect, test} from "@jest/globals";
import GraphQLPositiveFloat from "../src/scalars/GraphQLPositiveFloat";
import {Kind} from "graphql";

describe(`GraphQLPositiveFloat`, () => {

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLPositiveFloat.parseLiteral({
                kind: Kind.INT,
                value: 123
            })).toEqual('123.0'));

            test(`float`, () => expect(GraphQLPositiveFloat.parseLiteral({
                kind: Kind.FLOAT,
                value: 123.123
            })).toEqual('123.123'));
        });

        describe(`invalid`, () => {

            test(`string`, () => expect(() => GraphQLPositiveFloat.parseLiteral({
                kind: Kind.STRING,
                value: '-123.123'
            })).toThrow());

            test(`negative int`, () => expect(() => GraphQLPositiveFloat.parseLiteral({
                kind: Kind.INT,
                value: -123
            })).toThrow());

            test(`negative float`, () => expect(() => GraphQLPositiveFloat.parseLiteral({
                kind: Kind.FLOAT,
                value: -123.123
            })).toThrow());

            test(`zero`, () => expect(() => GraphQLPositiveFloat.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toThrow());
        });
    });
});
