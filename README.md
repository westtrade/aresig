# aresig

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/655e9203a73748488a83d465485fef38)](https://www.codacy.com/app/westtrade/aresig?utm_source=github.com&utm_medium=referral&utm_content=westtrade/aresig&utm_campaign=badger)

Javascript microtemplate with async helpers and data, inspired by
John Resig Micro-Templating library.


## Super simple tempalte engine

```js

const tplString = `
	<div id="<%= id %>" class="<%= (i % 2 == 1 ? "even" : "odd") %>">
		<div>
			<img src="<%= profileImageUrl %>"/>
		</div>
		<div class="contents">
			<p>
				<a href="/<%= fromUser %>">
					<%= fromUser %>
				</a>: <%= text %>
			</p>
		</div>
	</div>
`;

```
