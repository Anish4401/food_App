const MongoClient = require('mongodb').MongoClient;

async function connectDb() {
  try {
    const client = await MongoClient.connect('mongodb+srv://anishku1686:SXIlaSWGGipJY8z9@cluster0.salw8.mongodb.net/cluster0', {
      dnsTimeout: 3000, // 30 seconds
    });
    // ...
  } catch (err) {
    console.log("Error connectin to MongoDB:", err);
  }
}