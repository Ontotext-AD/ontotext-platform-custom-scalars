import {describe, expect, test} from "@jest/globals";
import GraphQLNonPositiveFloat from "../src/scalars/GraphQLNonPositiveFloat";
import {Kind} from "graphql";

describe(`GraphQLNonPositiveFloat`, () => {

    describe(`parseLiteral`, () => {

        describe(`valid`, () => {

            test(`int`, () => expect(GraphQLNonPositiveFloat.parseLiteral({
                kind: Kind.INT,
                value: -123
            })).toEqual(-123));

            test(`float`, () => expect(GraphQLNonPositiveFloat.parseLiteral({
                kind: Kind.FLOAT,
                value: -123.123
            })).toEqual(-123.123));

            test(`zero`, () => expect(GraphQLNonPositiveFloat.parseLiteral({
                kind: Kind.INT,
                value: 0
            })).toEqual(0));
        });

        describe(`invalid`, () => {

            test(`string`, () => expect(() => GraphQLNonPositiveFloat.parseLiteral({
                kind: Kind.STRING,
                value: '123.123'
            })).toThrow());

            test(`positive int`, () => expect(() => GraphQLNonPositiveFloat.parseLiteral({
                kind: Kind.INT,
                value: 123
            })).toThrow());

            test(`positive float`, () => expect(() => GraphQLNonPositiveFloat.parseLiteral({
                kind: Kind.FLOAT,
                value: 123.123
            })).toThrow());
        });
    });
});
