import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async(req, {params}) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({creator: params.id}).populate('creator')
        return new Response(JSON.stringify(prompts), {status:200})
    } catch(err) {
        console.log(err)
        return new Response("Failed to fetch posts", {status:500})
    }
}