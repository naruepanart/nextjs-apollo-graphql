import axios from "axios";

const Mutation = {
  createUser: async (parent, args, context, info) => {
    /*   mutation {
      createUser(title: "102", body: "102") {
        title
        body
      }
    } */

    const { title, body } = args;
    const res = await axios.post(`http://localhost:3001/posts`, { id: Math.random().toString(36).slice(2), title, body });
    return res.data;
  },

  deleteUser: async (parent, args, context, info) => {
    /*  mutation {
      deleteUser(id: "mtg89tkpxi")
    } */

    const { id } = args;
    const res = await axios.delete(`http://localhost:3001/posts/${id}`);
    if (res) return "Delete OK";
  },
  updateUser: async (parent, args, context, info) => {
    /*  mutation {
      updateUser(id: "mtg89tkpxi", title: "title 102" ) {
        id
        title
        body
      }
    } */
    const { id, title, body } = args;
    const res = await axios.patch(`http://localhost:3001/posts/${id}`, { title, body });
    return res.data;
  },
};

export default Mutation;
