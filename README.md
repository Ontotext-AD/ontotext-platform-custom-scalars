# Ontotext Platform Custom GraphQL Scalars
A library providing customized scalars used in Ontotext Platform, written in JavaScript

![CI](https://github.com/Ontotext-AD/platform-custom-scalars/workflows/CI/badge.svg)

## Purpose
The main purpose of the library is to provide JavaScript implementation of the custom GraphQL scalars used in the
Ontotext Platform. This will allow our clients to create compliant schemas, which could be used in the Platform 
services without the need of implementing and supporting their own scalar types.
As the Platform provides federation, the package will be particularly useful for implementations of custom services via
[Apollo Federation](https://www.apollographql.com/docs/apollo-server/federation/introduction/), where the base schema
defined in the Platform could be extended with additional types or properties.

## Installation
### Prerequisites
* Node >= 14.2
* NPM ([npm](https://npmjs.org/))

```
npm install platform-custom-scalars
```

## Usage
To use the scalars after installing the package, you will need to import them in your schema definition and then provide
resolvers for them.
```javascript
import { ApolloServer, gql } from 'apollo-server';
import GraphQLDouble from 'platform-custom-scalars';

// For ES5 projects
// const { GraphQLDouble } = require("platform-custom-scalars");

const schema = gql`
  scalar Double

  type CustomType {
    fieldName: Double
  }

  type Query {
    customType: CustomType
  }
`;

const resolversFunc = {
  Double: GraphQLDouble
};

new ApolloServer({ typeDefs: schema, resolvers: resolversFunc }).listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## Package content
The package contains scalar types for various kinds of numbers and time. The number scalars either extend the standard
scalars provided by `GraphQL` or define completely new one.
Some of the scalars like `GraphQLDecimal`, `GraphQLInteger` and `GraphQLUnsignedLong` support bigger than standard
`JavaScrip` numbers, which is useful in some specific cases.

## Important notes
Although the package is free for the general public, it is intended to be used within the services that Ontotext
Platform provides. If any functionality requires it, the code could be changed to suite the needs of that functionality.

## License
[LICENSE](LICENSE)

## Contributing
TODO guidelines
