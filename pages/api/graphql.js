import { ApolloServer, gql } from "apollo-server-micro";
import axios from "axios";

const typeDefs = gql`
  type Query {
    getAllTodos: [Todos]
    getOneTodo(id: ID): Todos
  }
  type Todos {
    id: ID
    title: String
  }

  input TodoInput {
    title: String
  }
  type Mutation {
    createUser(posts: TodoInput): Todos
    deleteUser(id: ID): String
    updateUser(id: ID, posts: TodoInput): Todos
  }
`;

const resolvers = {
  Query: {
    async getAllTodos() {
      /*  query {
        getAllTodos {
          id
          title
        }
      } */
      const res1 = await axios.get(`http://localhost:3001/posts`);
      return res1.data;
    },
    async getOneTodo(parent, args, context, info) {
      /*   query {
        getOneTodo(id: 3) {
          id
          title
        }
      } */
      const { id } = args;
      const res2 = await axios.get(`http://localhost:3001/posts/${id}`);
      return res2.data;
    },
  },
  Mutation: {
    async createUser(parent, args, context, info) {
      /*   mutation {
        createUser(posts: { id: 3, title: "Three" }) {
          id
          title
        }
      } */
      const { title } = args.posts;
      const res = await axios.post(`http://localhost:3001/posts`, { title });
      return res.data;
    },

    deleteUser: async (parent, args, context, info) => {
      /*  mutation {
        deleteUser(id: "3")
      } */
      const { id } = args;
      const res = await axios.delete(`http://localhost:3001/posts/${id}`);
      if (res) return "Delete OK";
    },
    updateUser: async (parent, args, context, info) => {
      /* mutation {
        updateUser(id: "2", posts: { title: "Edit test 01" }) {
          id
          title
        }
      } */
      const { id } = args;
      const { title } = args.posts;
      const res = await axios.put(`http://localhost:3001/posts/${id}`, { title });
      return res.data;
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
