const { ApolloServer, gql, PubSub } = require('apollo-server');

/* type defs */
const typeDefs = gql`
  type Query {
    hello(name: String!): String!
    user: User!
  }
  type User {
    id: ID!
    username: String
    firstLetterOfUsername: String
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
  type Subscription {
    newUser: User!
  }
`;

const NEW_USER_KEY = "USER_KEY";
/* resolvers  */

const resolvers = {
  Subscription: {
    newUser: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_USER_KEY)
    }
  },
  User: {
    firstLetterOfUsername: (parent) => {
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
    register: (_, { userInfo: { username } }, { pubsub }) => {
      const user = {
        id: 1,
        username
      };

      pubsub.publish(NEW_USER_KEY, {
        newUser: user
      });

      return {
        user,
        errors: [{
          field: "username",
          message: "Error"
        }, null]
      }
    },
    login: async (parent, { userInfo: { username } }, context, info) => {
      // check auth or password
      // await checkPassword(password)
      return username
    }
  }
}

const pubsub = new PubSub();
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => ({ req, res, pubsub }) });

server.listen().then(
  ({ url }) => console.log(`Server running at ${url}`)
);