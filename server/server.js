const express = require("express");
const port = process.env.PORT || 3000;
const server = express();

server.use("/assets", express.static("assets"));
if (process.env.NODE_ENV == "production") {
	server.use("/", express.static("dist"));
}
else {
	const Bundler = require("parcel-bundler");
	const bundler = new Bundler("client/index.html");
	server.use(bundler.middleware());
}
server.listen(port, () => {
	console.log(`server is running on http://localhost:${port}`);
})