export default ({ markup, helmet }) => {
  return `<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
<head>
	${helmet.title.toString()}
	${helmet.meta.toString()}
	${helmet.link.toString()}
	<link rel="stylesheet" href="styles.css">
</head>
<body ${helmet.bodyAttributes.toString()}>
	<div id="root">${markup}</div>
	<script src="/static/server.js" async></script>
</body>
</html>`;
};
