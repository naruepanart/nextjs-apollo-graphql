import { gql } from "apollo-server-micro";

const typedefs = gql`
  type Query {
    getAllCount: Count
    getAllTodos(page: Int, limit: Int): [Todos]
    getOneTodo(id: ID!): Todos
    getUser(id: ID): GetUser
  }
  type Todos {
    id: ID
    title: String
    body: String
  }
  type Count {
    count: String
  }
  type GetUser {
    id: String
    pass: String
  }
  type LoginUser {
    token: String
  }
  type Mutation {
    loginUser(id: String, pass: String): LoginUser
    createUser(title: String, body: String): Todos
    deleteUser(id: ID!): String
    updateUser(id: ID!, title: String, body: String): Todos
  }
`;

export default typedefs;
