



const { MongoClient, ServerApiVersion } = require('mongodb');


const uri = "mongodb+srv://<username>:<password>@cluster0.70yiu6o.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


`mongodb+srv://${process.env.mediaDb}:${process.env.mediaPassword}@ccluster0.70yiu6o.mongodb.net/?retryWrites=true&w=majority`;