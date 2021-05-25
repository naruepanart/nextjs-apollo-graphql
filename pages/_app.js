function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

/* 
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
 */
