import React from "react";
//2*** Integrate Apollo into frontend
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

const httpLink = createHttpLink({ uri:"http://localhost:3001/graphql", });

const client = new ApolloClient({
	//create a connection to GraphQL api endpoint
	link: httpLink,
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="flex-column justify-flex-start min-100-vh">
				<Header />
				<div className="container">
					<Home />
				</div>
				<Footer />
			</div>
		</ApolloProvider>
	);
}

export default App;
