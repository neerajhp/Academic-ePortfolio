const mongoose = require("mongoose");
const server = require("../../app");
mongoose.set("useCreateIndex", true);
mongoose.promise = global.Promise;

// async function removeAllCollections () {
//   const collections = Object.keys(mongoose.connection.collections)
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName]
//     await collection.deleteMany()
//   }
// }

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      // if (error.message.includes('a background operation is currently running')) return
      // console.log(error.message)
    }
  }
}

module.exports = {
  async clearDB() {
    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
};
