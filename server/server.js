const express = require("express");
const bodyParser = require('body-parser')
const uuid = require('uuid/v4');

const port = process.env.PORT || 3000;
const users = [];
const app = express();
app.use(bodyParser.json());
app.post("/api/login", (req, res) => {
	const { username, password } = req.body;
	if (!username) {
		return res.status(400).json({ error: "username field is missing" });
	}
	if (!password) {
		return res.status(400).json({ error: "password field is missing" });
	}
	const user = users.find(user => user.username === username && user.password === password);
	if (!user) {
		return res.status(400).json({ error: "wrong username or password" });
	}
	return res.status(200).json({ success: true, id: user.id });
})
app.post("/api/register", (req, res) => {
	const { username, password } = req.body;
	if (!username) {
		return res.status(400).json({ error: "username field is missing" });
	}
	if (!password) {
		return res.status(400).json({ error: "password field is missing" });
	}
	if (users.find(user => user.username === username)) {
		return res.status(400).json({ error: "username allready exists" });
	}
	const id = uuid();
	users.push({ id, username, password });
	return res.status(200).json({ success: true, id });
})

app.use("/assets", express.static("assets"));
if (process.env.NODE_ENV == "production") {
	//production -> serve our app from the dist folder
	app.use("/", express.static("dist"));
} else {
	//development -> let parcel do the work
	const Bundler = require("parcel-bundler");
	const bundler = new Bundler("client/index.html");
	app.use(bundler.middleware());
}



app.listen(port, () => {
	console.log(`server is running on http://localhost:${port}`);
});