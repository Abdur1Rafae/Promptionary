import { connectToDB } from "@utils/database"
import Prompt from "@models/Prompt"


export const POST = async(req) => {
    const {prompt, userId, tag} = await req.json()

    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            tag: tag,
            prompt: prompt
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch(err) {
        console.log(err)
        return new Response("Failed to create response", {status: 500})
    }
}