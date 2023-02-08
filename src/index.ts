import Rest from "./rest";
import mongoose from "mongoose";
import config from "../config.json";


interface ConfigI {
    database: {
        url: string,
        username: string,
        password: string,
        protocol: string
    }
}

async function connect(config: ConfigI){
    console.log(`Connecting to database at ${config.database.url}`);
    mongoose.set("strictQuery", false);
    await mongoose.connect(`${config.database.protocol}${config.database.username}:${config.database.password}@${config.database.url}`, {
        keepAlive: true,
        connectTimeoutMS: 30*1000, // seconds
        socketTimeoutMS: 5*1000,
        serverSelectionTimeoutMS: 0,
    });
    return;
}

mongoose.connection.once("open", () => {
    console.log("Connected to database");
});

connect(config);
const rest = new Rest();
rest.listen("0.0.0.0", 8080);