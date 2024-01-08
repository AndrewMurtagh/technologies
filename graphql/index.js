import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphql, buildSchema } from 'graphql';

const users = [
    {
        id: 1,
        name: 'Brian',
        age: '21',
        shark: 'Great White Shark'
    },
    {
        id: 2,
        name: 'Kim',
        age: '22',
        shark: 'Whale Shark'
    },
    {
        id: 3,
        name: 'Faith',
        age: '23',
        shark: 'Hammerhead Shark'
    },
    {
        id: 4,
        name: 'Joseph',
        age: '23',
        shark: 'Tiger Shark'
    },
    {
        id: 5,
        name: 'Joy',
        age: '25',
        shark: 'Hammerhead Shark'
    }
];

// Return a single user (based on id)
var getUser = function (args) {
    var userID = args.id;
    return users.filter(user => user.id == userID)[0];
}

// Return a list of users (takes an optional shark parameter)
var retrieveUsers = function (args) {
    if (args.shark) {
        var shark = args.shark;
        return users.filter(user => user.shark === shark);
    } else {
        return users;
    }
}

const schema = buildSchema(`
    type Query {
        user(id: Int!): Person
        users(shark: String): [Person]
    },
    type Person {
        id: Int
        name: String
        age: Int
        shark: String
    }
`);

const root = {
    user: getUser,
    users: retrieveUsers
};


const getSingleUser = `
    query getSingleUser($userID: Int!) {
        user(id: $userID) {
            name
            age
            shark
        }
    }
`

const getAllUserNames = `
    query getAllUsers {
        users {
            name
        }
    }
`

const getAllUserAges = `
    query getAllUsers {
        users {
            age
        }
    }
`

graphql({
    schema,
    source: getSingleUser,
    rootValue: root,
    variableValues: {
        userID: 5
    }
}).then(response => {
    console.log(JSON.stringify(response, null, 4))
});


// const app = express();

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
// }));

// app.listen(3000);