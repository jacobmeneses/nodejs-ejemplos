// example of graphql
// run node graphql-example.js

var { graphql, buildSchema } = require('graphql');

// build schema (schema) is a string
var schema = buildSchema(`
  type Product {
    id: ID!
    title: String!
  }
  type Query {
    hello: String,
    products: [Product],
  }
`);

var root = { 
  hello: () => 'Hello world!',
  products: () => {
    return [
      {
        id: 1,
        title: 'Computer'
      },
      {
        id: 2,
        title: 'keyboard'
      },
      {
        id: 3,
        title: 'mouse'
      }
    ];
  }
};

// execution 
const query = '{ products{ title } }';

graphql(schema, query, root).then((response) => {
  console.log(JSON.stringify(response));
});


