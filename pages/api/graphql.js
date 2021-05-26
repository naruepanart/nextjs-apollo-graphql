import { ApolloServer, gql } from "apollo-server-micro";
import axios from "axios";

const typeDefs = gql`
  type Query {
    getAllCount: Count
    getAllTodos(page: Int, limit: Int): [Todos]
    getOneTodo(id: ID): Todos
  }
  type Todos {
    id: Int
    title: String
    body: String
  }
  type Count {
    count: String
  }

  type Mutation {
    createUser(posts: TodoInput): Todos
    deleteUser(id: ID): String
    updateUser(id: ID, posts: TodoInput): Todos
  }
  input TodoInput {
    id: Int
    title: String
    body: String
  }
`;

const resolvers = {
  Query: {
    getAllCount: async (parent, args, context, info) => {
      const { page, limit } = args;

      const res1 = await axios.get(`http://localhost:3001/posts?&_limit=${limit || 5}&_page=${page || 1}`);

      return { count: res1.headers["x-total-count"] };
    },
    getAllTodos: async (parent, args, context, info) => {
      const { page, limit } = args;

      /*   query {
        getAllTodos(limit: 2, page: 2) {
          id
          title
        }
      } */

      const res1 = await axios.get(`http://localhost:3001/posts?&_limit=${limit || 5}&_page=${page || 1}`);

      return res1.data;
    },
    getOneTodo: async (parent, args, context, info) => {
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
    createUser: async (parent, args, context, info) => {
      /*   mutation {
        createUser(posts: { id: 3, title: "Three" }) {
          id
          title
        }
      } */
      const { id, title, body } = args.posts;
      const res = await axios.post(`http://localhost:3001/posts`, { id, title, body });
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
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }

      const res = await axios.put(`http://localhost:3001/posts/${id}`, updates);
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
