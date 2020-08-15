const {ApolloServer , gql} = require('apollo-server');

/* type defs */
const typeDefs = gql`
  type Query {
    hello: String!
  }
  type User {
    id: ID!
    username: String!
  }
  type Mutation {
    register: User
  }
`;

/* resolvers  */

const resolvers =  {
  Query : {
    hello : () => "Hola mundo en graph ql"
  },
  Mutation : {
    register: ()=>({
      id: 1,
      username: "bob"
    })
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(
  ({url})=> console.log(`Server running at ${url}`)
);