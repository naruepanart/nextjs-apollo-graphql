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
        todo(id: ${ctx.params.id}) {
          id
          title
        }
      }
    `,
  });

  return { props: { todo: data.todo }, revalidate: 60 };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query ExampleQuery {
        todos {
          id
          title
        }
      }
    `,
  });

  const paths = data.todos.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: true };
}

export default PostbyID;
