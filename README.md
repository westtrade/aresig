# aresig

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
