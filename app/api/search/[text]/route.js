import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async(req, {params}) => {
    try {
        await connectToDB()
        const searchText = params.text ?? ''

        if(!searchText) {
            return new Response("Search Text not matched", {status: 400})
        }

        const prompt = await Prompt.find({
            $or:[
                {'creator.userName': { $regex: searchText, $options: 'i' }},
                {tag: {$regex: searchText, $options: 'i'}}
            ]
        }).populate('creator');

        if(!prompt || prompt.length == 0) {
            return new Response("Search Text not matched", {status : 404})
        }
        return new Response(JSON.stringify(prompt), {status:200})
    } catch(err) {
        console.log(err)
        return new Response("Failed to fetch prompts", {status:500})
    }
}