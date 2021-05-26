import axios from "axios";

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
      /*  mutation {
            createUser(posts: { id: 102, title: "102", body: "102" }) {
              id
              title
              body
            }
          } */

      const { id, title, body } = args.posts;
      const res = await axios.post(`http://localhost:3001/posts`, { id, title, body });
      return res.data;
    },

    deleteUser: async (parent, args, context, info) => {
      /*  mutation {
          deleteUser(id: 102)
        } */
      const { id } = args;
      const res = await axios.delete(`http://localhost:3001/posts/${id}`);
      if (res) return "Delete OK";
    },
    updateUser: async (parent, args, context, info) => {
       /*  mutation {
            updateUser(id: 102, posts: { title: "Edit title 102" }) {
              id
              title
              body
            }
          } */
      const { id } = args;
      const { title, body } = args.posts;

      const res = await axios.patch(`http://localhost:3001/posts/${id}`, { title, body });
      return res.data;
    },
  },
};

export default resolvers;
