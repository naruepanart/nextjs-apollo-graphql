import { gql } from "apollo-server-micro";

const typedefs = gql`
  type Query {
    getAllCount: Count
    getAllTodos(page: Int, limit: Int): [Todos]
    getOneTodo(id: ID!): Todos
  }
  type Todos {
    id: ID
    title: String
    body: String
  }
  type Count {
    count: String
  }

  type Mutation {
    createUser(title: String, body: String): Todos
    deleteUser(id: ID!): String
    updateUser(id: ID!, title: String, body: String): Todos
  }
`;

export default typedefs;
