var express = require('express');
var {
    graphqlHTTP
} = require('express-graphql');
var {
    buildSchema
} = require('graphql');

var schema = buildSchema(`
  type User {
    id: String
    name: String
  }

  type Query {
    user(IDs: String): User
    users:[User]
  }
`);

// Maps id to User object

var fakeDatabase = [{
        id: 'a',
        name: 'alice',
    },
    {
        id: 'b',
        name: 'bob',
    },
    {
        id: 'c',
        name: 'Cynthia',
    },
];

var root = {
    user: ({
        IDs
    }) => {
        const x = fakeDatabase.filter(name => name.id === IDs)
        const {
            0: {
                id,
                name
            }
        } = {
            ...x
        }
        console.log({
            id,
            name
        })
        return {
            id,
            name
        };
    },
    users: () => {
        return fakeDatabase;
    }
};

var app = express();
app.use('/index', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/index');