'use strict';

const compile = require('../');

const timeout = new Promise((resolve) => setTimeout(() => resolve('Test'), 1500));


async function main () {

	const tplString = `<%

	let test = await data.getData()





%><%= test %>`;

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

	console.log(result);
}

main();
