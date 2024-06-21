"use client";


import { useState, useEffect, useCallback } from "react";
import PromptCard from "./PromptCard"
import { debounce } from "@utils/fetchFunc";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data.map((post) => {
          return (
            <PromptCard key={prompt._id} post={post} handleTagClick={handleTagClick}/>
          )
        })
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [post, setPosts] = useState([])

  useEffect(() => {
    const handleSearch = async () => {
        if (searchText.trim() === '') {
            setPosts([]);
            return;
        }

        try {
          const response = await fetch(`/api/search/${searchText}`);
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          }
        } catch (err) {
          console.log(err)
        }
    };

    const debounceTimeout = setTimeout(() => {
        handleSearch();
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => {
        clearTimeout(debounceTimeout);
    };
  }, [searchText]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(()=>{
    const fetchPost = async ()=> {
      const response = await fetch('/api/prompt');
      const data = await response.json()

      setPosts(data)
    }

    fetchPost()
  },[])
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for tag or username" value={searchText} onChange={handleChange} required className="search_input peer"/>
      </form>
      <PromptCardList
        data={post}
        handleTagClick={setSearchText}
      />
    </section>
  )
}

export default Feed