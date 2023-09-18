import connectDB from "@/db/db";

async function handler (req,res) {
    try{
        await connectDB()
        console.log('connected to db')
    }catch (e) {
        console.log('error')
    }


}

export default handler;