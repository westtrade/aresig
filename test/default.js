import test from 'ava';

const compile = require('../');
// const tplString = `<% data.array.forEach((current) => { %>
//
//
// <% }) %>`;
// const tplString = `
// 	<%= data %>
// 	<%= data %>
// 	<%= data %>
// `;


const tplString = `
<% data.array.forEach((item) => { %>
	<% data.array.forEach((subItem) => { %>
		<%= data.getData(item, subItem) %>
	<% }); %>
<% }); %>
`;


const timeout = new Promise((resolve) => setTimeout(() => resolve('Test'), 1500));

test(async (t) => {

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
});
