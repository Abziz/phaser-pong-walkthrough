const express = require("express");
const port = 3000;
const server = express();
server.use(express.static("client"));
server.listen(port, () => {
	console.log(`server is running on http://localhost:${port}`);
})