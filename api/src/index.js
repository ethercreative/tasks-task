const express = require('express')
	, { postgraphile, makePluginHook } = require('postgraphile')
	, { Pool } = require('pg');

const setCors = () => ({
	['postgraphile:http:handler'](req, {res}) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST');
		res.setHeader(
			'Access-Control-Allow-Headers',
			[
				'Origin',
				'X-Requested-With',
				'Accept',
				'Authorization',
				'X-Apollo-Tracing',
				'Content-Type',
				'Content-Length',
				'X-PostGraphile-Explain',
			].join(', '),
		);
		res.setHeader(
			'Access-Control-Expose-Headers',
			['X-GraphQL-Event-Stream'].join(', '),
		);

		return req;
	}
});

const pluginHook = makePluginHook([setCors()]);

const dbPool = new Pool();
const schemas = ['public'];
const postgraphileOptions = {
	pluginHook,
	subscriptions: true,
	simpleSubscriptions: true,
	live: true,
	retryOnInitFail: true,
	dynamicJson: true,
	setofFunctionsContainNulls: false,
	ignoreRBAC: false,
	ignoreIndexes: true,
	watchPg: true,
	appendPlugins: [
		require('@graphile-contrib/pg-simplify-inflector'),
		require('postgraphile-plugin-connection-filter'),
	],
	graphiql: true,
	enhanceGraphiql: true,
	allowExplain: req => true,
	enableQueryBatching: true,
	disableQueryLog: false,
	legacyRelations: 'omit',
	exportGqlSchemaPath: 'schema.graphql',
	sortExport: true,
	pgDefaultRole: 'anonymous',
	ownerConnectionString: process.env.ROOT_DATABASE_URL,
	graphileBuildOptions: {
		connectionFilterAllowEmptyObjectInput: true,
		connectionFilterAllowNullInput: true,
		connectionFilterComputedColumns: true,
		connectionFilterRelations: true,
		connectionFilterSetofFunctions: true,
	},
	handleErrors: errors => errors.map(err => {
		const { originalError } = err;
		const { table, constraint } = originalError || {};
		if (table && constraint) {
			return {
				...err,
				message: `constraint_${constraint}`,
			};
		}

		return err;
	}),
};

const app = express();
app.use(postgraphile(dbPool, schemas, postgraphileOptions));

app.listen(
	5000,
	() => console.log('Listening on port 5000')
);
