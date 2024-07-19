const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI_ONLINE;

exports.connectDB = async () => {
    try {
        const connection = await mongoose.connect(uri, {
        });
    
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    };
    

 


if (!uri) {
  throw new Error('MONGODB_URI environment variable is not defined');
}  

exports.connectOnlineDB = async () => {
  try {
      const connection = await mongoose.connect(uri, {
      });
  
      console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
  }
  };
  


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });


// exports.connectOnlineDB = async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       console.log("connected");
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
// //   run().catch(console.dir);

