import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Components
import MainHeader from "./components/MainHeader";
import SummaryStats from "./components/SummaryStats";
import FlightStats from "./components/FlightStats";

// Apollo Client Setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <MainHeader />
        <SummaryStats />
        <FlightStats />
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
