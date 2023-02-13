import mongoose from "mongoose";

export async function initMongoose() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return await mongoose.connect(process.env.MONGODB_URL);
}

// Llamada a initMongoose en el archivo de inicio de la aplicación
initMongoose().then(() => {
  console.log("MongoDB connection established");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});
