import connectDB from "@/db/db";

async function handler (req,res) {
    if(res.method === "GET")

     await connectDB()
        console.log('connected to db')

await res.status(200).json({message:'successful'})

}

export default handler;