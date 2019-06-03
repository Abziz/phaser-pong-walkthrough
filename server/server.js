const express = require("express");
const uuid = require('uuid/v4');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;

app.use("/assets", express.static("assets"));
// and then our app
if (process.env.NODE_ENV == "production") {
	//production -> serve our app from the dist folder
	app.use("/", express.static("dist"));
} else {
	//development -> let parcel do the work
	const Bundler = require("parcel-bundler");
	const bundler = new Bundler("client/index.html");
	app.use(bundler.middleware());
}
server.listen(port);
/** Socket.io events */

const users = [
	{ id: uuid(), username: "aaaa", password: "1234" },
	{ id: uuid(), username: "bbbb", password: "1234" }
];
const games = {};
io.on('connection', (socket) => {
	console.log(`socket:${socket.id} connected`);
	let currentGame = null;
	socket.on("login", ({ username, password }) => {
		if (!username || !password) {
			socket.emit("login-failed", "username and password fields are required");
			return;
		}
		for (const user of users) {
			if (user.username === username && user.password === password) {
				socket.emit("login-success", user);
				return;
			}
		}
		socket.emit("login-failed", "invalid username or password");
	})
	socket.on("register", ({ username, password }) => {
		if (!username || !password) {
			socket.emit("register-failed", "username and password fields are required");
			return;
		}
		for (const user of users) {
			if (user.username === username) {
				socket.emit("register-failed", "username allready exists");
				return;
			}
		}

		const user = {
			id: uuid(),
			username,
			password
		}
		users.push(user);
		socket.emit("register-success", { username, id: user.id });
	});
	socket.on("join-game", () => {
		for (const id in games) {
			const game = games[id];
			if (game.player2 == null) {
				socket.join(game.id);
				game.player2 = socket.id;
				currentGame = game;
				io.to(game.id).emit("ready", game);
				setTimeout(() => {
					var side = Math.random() < 0.5 ? 1 : -1;
					var angle = (Math.random() * (Math.PI / 2)) - (Math.PI / 4);
					var velocity = 200;
					const velocityX = side * velocity * Math.cos(angle);
					const velocityY = side * velocity * Math.sin(angle);
					io.to(game.id).emit("game-start", velocityX, velocityY);
				}, 3000)
				return;
			}
		}
		const game = {
			id: uuid(),
			player1: socket.id,
			player2: null,
		}
		games[game.id] = game;
		socket.join(game.id);
		currentGame = game;
		socket.on("ball-update", (ball) => {
			socket.to(currentGame.id).emit("ball-update", ball);
		})
	})
	socket.on("update-paddle", (paddleY) => {
		socket.to(currentGame.id).emit("update-paddle", paddleY);
	})

	socket.on('disconnect', () => {
		if (currentGame) {
			socket.to(currentGame.id).emit("player-disconnect");
			delete games[currentGame.id];
		}
		console.log(`socket:${socket.id} disconnected`);
	})
});
