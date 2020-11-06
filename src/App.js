import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Components
import MainHeader from "./components/MainHeader";

// Apollo Client Setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <MainHeader />
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
