'use strict';

const compile = require('../');



const tplString = `
	<% data.array.forEach((item) => { %>
		<%= data.getData(item) %>
	<% }); %>


`;

let template = compile(tplString);
