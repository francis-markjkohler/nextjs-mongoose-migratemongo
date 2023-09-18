import mongoose from 'mongoose';
import connectDB from "@/db/db";

export const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

const handler = async (req, res) => {
    await connectDB();

    switch (req.method) {
        case "GET":
            try {
                const User = await UserModel.find({});
                return res.status(200).json({ status: 'success', User, count: User.length });
            } catch (e) {
                console.error(e);
                return res.status(500).json({ status: 'error', message: 'Server Error' });
            }
        case "POST":
            try {
                const { email, password, userName } = req.body;

                const newUser = await UserModel.create({
                    userName,
                    email,
                    password,
                });

                return res.status(201).json({ status: 'success', newUser });
            } catch (e) {
                console.error(e);
                return res.status(500).json({ status: 'error', message: 'Server Error' });
            }
        default:
            return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
    }
};

export default handler;
