import mongoose from "mongoose";

interface Settings {
    mongodb_uri: string;
}

export const connectDB = (settings: Settings ): Promise<string> => {

    return new Promise (async(resolve,reject)=>{
        try {
           await mongoose.connect(settings.mongodb_uri);
           resolve('=> Database connected');
            
        } catch (error) {
            reject(error)
            
        }
    })
}


