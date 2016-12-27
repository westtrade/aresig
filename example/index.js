'use strict';

const compile = require('../');

const timeout = new Promise((resolve) => setTimeout(() => resolve('Test'), 1500));


async function main () {

	const tplString =`
	<%
		let containers = await data.containers({}).limit(100).exec();
		containers = await Promise.all(containers.map(async (container) => {
			const {id} = container;
			container.info = await data.inspect(id);
			return container;
		}))
	%>
	<% containers.forEach(({info}) => { %>
		<% if (info.Id === '2b891592675bae291a85a7636556b450ecdcfcd53705043206cb58a07aef8d4e') { %>
<%= JSON.stringify(info) %>
===========================
		<% } %>
	<% })  %>





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

		array: [1, 2, 3, 4, 5],
		containers() {
			return {
				limit: () => {
					return {
						exec: () => new Promise((resolve, reject) => {
							resolve([
								{ id: 1,},
								{ id: 2,},
								{ id: 3,},
								{ id: 4,},
								{ id: 5,},
								{ id: 6,},
							])
						})
					};
				}
			};

		},
		inspect({}) {
			return new Promise((resolve, reject) => {
				resolve({Id: '2b891592675bae291a85a7636556b450ecdcfcd53705043206cb58a07aef8d4e'})
			});
		}
	};


	//
	const result = await template(data);

	// console.log(result.split('\n').length);
	console.log("'" + result + "'");
}

main();
