import { gql } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";

function Home({ todos }) {
  return (
    <>
      {todos.map((x) => (
        <Link href={`/${x.id}`} key={x.id}>
          <p>
            {x.id} - {x.title}
          </p>
        </Link>
      ))}
    </>
  );
}

export async function getStaticProps() {
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

  return {
    props: {
      todos: data.getAllTodos,
    },
  };
}

export default Home;
