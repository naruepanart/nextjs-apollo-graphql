import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";

const PostbyID = ({ todo }) => {
  return (
    <div>
      {todo.id} - {todo.title}
    </div>
  );
};

export async function getStaticProps(ctx) {
  const { data } = await client.query({
    query: gql`
      query ExampleQuery {
        getOneTodo(id: ${ctx.params.id}) {
          id
          title
        }
      }
    `,
  });

  return { props: { todo: data.getOneTodo }, revalidate: 60 };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query ExampleQuery {
        getAllTodos {
          id
          title
        }
      }
    `,
  });

  const paths = data.getAllTodos.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: true };
}

export default PostbyID;
