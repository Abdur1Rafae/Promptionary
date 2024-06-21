"use client";

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const fetchPost = async ()=> {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json()

            setPosts(data)
        }

        if(params?.id) {fetchPost()}
        else{
          console.log("User does not exist.")
        }
    },[])


  return (
    <Profile name={posts[0]?.creator.userName} data={posts}/>
  )
}

export default UserProfile