const { ApolloServer, gql } = require('apollo-server');

/* type defs */
const typeDefs = gql`
  type Query {
    hello(name: String!): String!
    user: User!
  }
  type User {
    id: ID!
    username: String!
  }
  type Error {
    field: String!
    message: String!
  }
  type RegisterResponse {
    errors: [Error] 
    user: User!
  }
  input UserInfo {
    username: String!
    password: String!
    age: Int
  }
  type Mutation {
    register(userInfo: UserInfo!): RegisterResponse!
    login(userInfo: UserInfo!): String!
  }
`;

/* resolvers  */

const resolvers = {
  Query: {
    hello: (parent, args,context) => {
      console.log(context);
      return `Hello ${args.name}`
    },
    user: () => ({
      id: 1,
      username: "Bob"
    })
  },
  Mutation: {
    register: () => ({
      user: {
        id: 1,
        username: "bob"
      },
      errors: [{
        field: "username",
        message: "Error"
      }, null]
    }),
    login: (parent, { userInfo: { username } }, context, info) => {
      return username
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers, context: ({req,res})=>({req,res}) });

server.listen().then(
  ({ url }) => console.log(`Server running at ${url}`)
);