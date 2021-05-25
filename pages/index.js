import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

function Home({ todos, numberOfPosts }) {
  const [movie, setMovie] = React.useState(todos.getAllTodos);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const fetchData = async () => {
    const { data } = await client.query({
      query: gql`
        query ExampleQuery {
          getAllTodos(page: ${page}, limit: 30) {
            id
            title
          }
          getAllCount {
            count
          }
        }
      `,
    });

    setMovie((movie) => [...movie, ...data.getAllTodos]);
  };

  React.useEffect(() => {
    setHasMore(numberOfPosts > movie.length ? true : false);
    setPage(page + 1);
  }, [movie]);

  return (
    <>
      <InfiniteScroll dataLength={movie.length} next={fetchData} hasMore={hasMore} loader={<h4>Loading...</h4>}>
        {movie.map((x) => (
          <Link href={`/${x.id}`} key={Math.random()}>
            <p>
              {x.id} - {x.title}
            </p>
          </Link>
        ))}
      </InfiniteScroll>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query ExampleQuery {
        getAllTodos(limit: 30) {
          id
          title
        }
        getAllCount {
          count
        }
      }
    `,
  });

  return {
    props: {
      todos: data,
      numberOfPosts: data.getAllCount.count,
    },
  };
}

export default Home;
