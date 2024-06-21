"use client";

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
    const router = useRouter()
    const {data: session} = useSession()
    const [submitting, setSubmitting] = useState(false)
    const searchParams = useSearchParams()
    
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const promptId = searchParams.get('id')

    useEffect(()=>{
        const getPromptDetails = async() => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if(promptId) getPromptDetails()
    }, [promptId])

    const updatePrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true)

        if(!promptId) {
            return alert('PromptId not found.')
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/')
            }
        } catch(err) {
            console.log(err)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt