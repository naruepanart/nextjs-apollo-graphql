import { ApolloServer } from "apollo-server-micro";
import resolvers from "../../graphql/resolvers";
import typeDefs from "../../graphql/typedefs";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
