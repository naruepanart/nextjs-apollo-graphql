import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";

const PostbyID = ({ todo }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
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
        getAllTodos(limit: 50) {
          id
          title
        }
      }
    `,
  });

  const paths = data.getAllTodos.map((post) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: true };
}

export default PostbyID;
