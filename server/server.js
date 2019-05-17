const express = require("express");
const Bundler = require("parcel-bundler");
const port = 3000;
const server = express();
const bundler = new Bundler("client/index.html");

server.use("/assets", express.static("assets"));
server.use(bundler.middleware());
server.listen(port, () => {
	console.log(`server is running on http://localhost:${port}`);
})