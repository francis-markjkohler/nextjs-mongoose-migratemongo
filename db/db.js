import mongoose from 'mongoose';

const DBUrl = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DBUrl);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;