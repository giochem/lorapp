const mongoose = require('mongoose');

var conn;
const connectDB = async () => {
  try {
    var conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: mongodb+srv://<username>:<password>@<username>.dmuqeok.mongodb.net/?retryWrites=true&w=majority`
    );
    return conn;
  } catch (error) {
    console.log('🚀 ~ file: mongodb.js ~ line 10 ~ connectDB ~ error', error);
    process.exit(1);
  }
};

module.exports = connectDB;
