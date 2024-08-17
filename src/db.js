const mongoose  = require("mongoose")

let mongoDb='mongodb://anishku1686:SXIlaSWGGipJY8z9@node1.cluster0.salw8.mongodb.net:27017,node2.cluster0.salw8.mongodb.net:27017,node3.cluster0.salw8.mongodb.net:27017/?retryWrites=true&w=majority&appName=Cluster0'

async function connectDb() {
    return mongoose.connect(mongoDb)
    
}
module.exports =connectDb
//here we just connecting to the databas

/**
 * const User = require('../Models/User.model');
const bcrypt = require('bcrypt');

module.exports = {
  async createUser(userData) {
    try {
      let { name, emailValue, password, role } = userData;
      let isUserExists = await User.findOne({ email: emailValue });
      if (isUserExists) {
        console.error("User with this email already exists");
        throw new Error("User with this email already exists");
      }
      password = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email: emailValue,
        password,
        role
      });
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async getUserbyEmail(email) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};
 */