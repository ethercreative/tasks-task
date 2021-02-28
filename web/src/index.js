import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './client';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
