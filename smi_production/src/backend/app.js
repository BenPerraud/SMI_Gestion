const express = require('express')
const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb')
require("dotenv").config()


/* ----------------------------------------------------------------------------------------------------------------------------------- */
/* CONNEXION MONGOOSE */
const app = express()
mongoose.connect(["mongodb+srv://", process.env.USER_MONGODB, ":", process.env.PASSWORD_MONGODB, process.env.URI_MONGODB].join(""),
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
/* ----------------------------------------------------------------------------------------------------------------------------------- */
/* CONNEXION A LA BASE DE DONNEES MONGODB */
const uri = ["mongodb+srv://", process.env.USER_MONGODB, ":", process.env.PASSWORD_MONGODB, process.env.URI_MONGODB].join("")
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)


/* ----------------------------------------------------------------------------------------------------------------------------------- */
/* APPLICATION EXPRESS */
const operatorRouter = require("./routes/operator")
const productionRouter = require("./routes/production")

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Content-Length, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})


app.use(`/api/operator`, operatorRouter)
app.use(`/api/production`, productionRouter)


module.exports = app