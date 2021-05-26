import { gql } from "apollo-server-micro";

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

export default typeDefs;
