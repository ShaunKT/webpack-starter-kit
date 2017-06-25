// doctype html
// html(lang="en")
//   head
//     title Campus Connect
//     meta(charset="UTF-8")/
//     meta(name="viewport" content="width=device-width, initial-scale=1")/

//   body
//     main#root#{markup}


export default ({ markup, helmet }) => {
  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
	${helmet.title.toString()}
	${helmet.meta.toString()}
	${helmet.link.toString()}
</head>
<body ${helmet.bodyAttributes.toString()}>
	<div id="root">${markup}</div>
	<script src="/static/server.js" async></script>
</body>
</html>`;
};


