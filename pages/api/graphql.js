import { ApolloServer } from "apollo-server-micro";
import resolvers from "../../graphql";
import typeDefs from "../../graphql/typedefs";
import verifyToken from "../../utils/token";

const context = ({ req }) => {
  const token = req.headers.authorization || "";
  const getToken = verifyToken(token);
  return { restoken: getToken };
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
