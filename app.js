const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const app = express();

const MyGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Foo',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve("time's up");
            }, 3000);
          });
        }
      },
      nextNumber: {
        type: GraphQLInt,
        args: {
          num: {
            type: GraphQLInt
          }
        },
        resolve(root, {num}) {
          return num + 1;
        }
      },
      nextFlexibleNumber: {
        args: {
          num: {
          }
        },
        resolve(root, {num}) {
          return num + 1;
        }
      }
    }
  })
});

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(4000);