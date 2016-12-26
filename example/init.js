'use strict';

const compile = require('../');

const timeout = new Promise((resolve) => setTimeout(() => resolve('Test'), 1500));


async function main () {

	const tplString =`
	<%= 1 %>
	<% let test = await data.getData() %>
	<%= 2 %>
	<% test = await data.getData() %>
	<%= 3 %>
	<% test = await data.getData() %>
	`;

	let template = compile(tplString);
	const data = {
		async getData(...args) {
			const additional = await timeout;
			return [additional, ...args].join(', ');
		},

		array: [1, 2, 3, 4, 5]
	};


	//
	const result = await template(data);

	console.log(result.split('\n').length);
	console.log("'" + result + "'");
}

main();
