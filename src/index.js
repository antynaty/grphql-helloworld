const { ApolloServer, gql } = require('apollo-server');

/* type defs */
const typeDefs = gql`
  type Query {
    hello(name: String!): String!
    user: User!
  }
  type User {
    id: ID!
    username: String
    firstLetterOfUsernmae: String
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
  User: {
    firstLetterOfUsernmae: (parent) => {
      return parent.username ? parent.username[0] : null
    } 
  },
  Query: {
    hello: (parent, args, context) => {
      console.log(context);
      return `Hello ${args.name}`
    },
    user: () => ({
      id: 1,
      username: "Tom"
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
    login: async (parent, { userInfo: { username } }, context, info) => {
      // check auth or password
      // await checkPassword(password)
      return username
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res }) });

server.listen().then(
  ({ url }) => console.log(`Server running at ${url}`)
);