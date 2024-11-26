import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log("Already connected to the database.")
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        })

        isConnected=true;
        console.log("MOngo Connected to the database.")
    }catch(error){
        console.error("Failed to connect to the database.")
        console.log(error)
    }
}