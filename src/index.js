const {ApolloServer , gql} = require('apollo-server');

/* type defs */
const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

/* resolvers  */

const resolvers =  {
  Query : {
    hello : () => "Hola mundo en graph ql"
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(
  ({url})=> console.log(`Server running at ${url}`)
);