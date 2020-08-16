const {ApolloServer , gql} = require('apollo-server');

/* type defs */
const typeDefs = gql`
  type Query {
    hello: String!
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
    Login(userInfo: UserInfo!): Boolean!
  }
`;

/* resolvers  */

const resolvers =  {
  Query : {
    hello : () => "Hola mundo en graph ql",
    user : () => ({
      id: 1,
      username: "Bob"
    })
  },
  Mutation : {
    register: ()=>({
      user : {
        id: 1,
        username: "bob"
      },
      errors : [{
        field: "username",
        message : "Error"
      },null]
    })
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(
  ({url})=> console.log(`Server running at ${url}`)
);