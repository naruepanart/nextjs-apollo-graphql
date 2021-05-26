import axios from "axios";

const Query = {
  getAllCount: async (parent, args, context, info) => {
    /*  query {
        getAllCount {
          count
        }
      } */

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
};

export default Query;
