import { ApolloServer, gql } from "apollo-server-micro";
import axios from "axios";

const typeDefs = gql`
  type Query {
    todos: [Todos]
    todo(id: Int): Todos
  }
  type Todos {
    id: Int
    title: String
  }
`;

const resolvers = {
  Query: {
    async todos() {
      const res1 = await axios.get(`http://localhost:3001/posts`);
      return res1.data;
    },
    async todo(parent, args, context, info) {
      const { id } = args;
      const res2 = await axios.get(`http://localhost:3001/posts/${id}`);
      return res2.data;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
