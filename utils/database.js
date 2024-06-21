import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log("MongoDB is Connected")
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "sharePrompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true

        console.log("MongoDB is Connected")
    } catch(err) {
        console.log(err)
    }
}