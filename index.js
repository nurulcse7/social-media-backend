const express = require("express");
const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
// Author/Admin : Nurul Islam , email: nurul.cse7@gmail.com
// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("social media server is running now ");
});
app.listen(port, () => {
	console.log("Social Media port is running", port);
});
