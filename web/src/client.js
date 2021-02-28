import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloLink,
} from '@apollo/client';

const cache = new InMemoryCache({
	dataIdFromObject: object => object.nodeId || null,
});

const client = new ApolloClient({
	link: ApolloLink.from([
		new HttpLink({
			uri: 'http://localhost:5001/graphql',
		}),
	]),
	cache,
	defaultOptions: {
		query: {
			errorPolicy: 'all',
		},
		watchQuery: {
			errorPolicy: 'all',
		},
	},
});

export default client;
