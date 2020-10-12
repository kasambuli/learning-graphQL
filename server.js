const express = require('express'); //require is an inbuilt node module. Node doesn't load ES6 so we can't import... like Angular
const {
    graphqlHTTP
} = require('express-graphql'); //express-graphql is an object- we're
const {
    buildSchema
} = require('graphql');

const schema = buildSchema(`
    type Query{
    hello: String
    age: Int
   
    }
    type Description{
         title: String
         Date: String
         somethingElse: String
    }
`);
//resolver- functions that know where to get the data from
const root = {
    hello: () => {
        return 'Cynthia Kasambuli';
    },
    age: () => {
        return 27
    },

    title: () => {
        return 'example';
    },
    Date: () => {
        return '12/10';
    },

};

//different resolvers are put in different files, then we add to one file bc the root Value can only tae one argument
const app = express(); //initialize express
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('It works!')
    //query- GETting data
    //mutation -POST, PUTting data