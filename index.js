const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
// Author/Admin : Nurul Islam , email: nurul.cse7@gmail.com
// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("social media server is running");
});
app.listen(port, () => {
	console.log("Social Media port is running", port);
});


const uri = `mongodb+srv://${process.env.mediaDb}:${process.env.mediaPassword}@cluster0.70yiu6o.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const postCollections = client.db('socialMedia').collection('posts')
    const userCollections = client.db('socialMedia').collection('users')
    const commentCollections = client.db('socialMedia').collection('comments')
    try {
        // post method 
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await userCollections.insertOne(user)
            res.send(result)
        })
        app.post('/posts', async (req, res) => {
            const data = req.body
            const dataPosted = await postCollections.insertOne(data)
            res.send(dataPosted)
        })
        app.post('/comments', async (req, res) => {
            const data = req.body
            const dataPosted = await commentCollections.insertOne(data)
            res.send(dataPosted)
        })

        // get method 
        app.get('/posts', async (req, res) => {
            const query = {}
            const post = await postCollections.find(query).sort({ _id: -1 }).toArray()
            res.send(post)
        })
        app.get('/myPosts', async (req, res) => {
            const email = req.query.email
            const query = { userEmail: email }
            const post = await postCollections.find(query).sort({ _id: -1 }).toArray()
            res.send(post)
        })
        app.get('/comments', async (req, res) => {
            const { id } = req.query
            const query = { postId: id }
            const comment = await commentCollections.find(query).sort({ _id: -1 }).toArray()
            res.send(comment)
        })
        app.get('/popularPosts', async (req, res) => {
            const popularPosts = await postCollections.find({}).limit(3).sort({ loveReact: -1 }).toArray()
            res.send(popularPosts)
        })


        // put method 
        app.put('/posts', async (req, res) => {
            const { id } = req.query
            const data = req.body
            const query = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updateData = {
                $set: {
                    loveReact: data.countLove + 1
                }
            }
            const result = await postCollections.updateOne(query, updateData, options)
            res.send(result)
        })
    }
    catch {
        err => {
            console.log(err);
        }
    }
}
run().catch()