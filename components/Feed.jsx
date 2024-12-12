"use client";

import React, { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import PrompCard from "./PrompCard";

const PromptCardDataList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.slice(-6).map((post) => (
        <PrompCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleTagDataClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="pt-10">
      {/* <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search here.."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form> */}

      <h3 className="head_text text-left" style={{ fontSize: "30px" }}>
        User Reviews
      </h3>
      <p className=" text-left">Users reviews and Recommendations.</p>

      {posts.length ? (
        <div>
          <div className="mt-[-50px]">
            {searchText ? (
              <PromptCardDataList
                data={posts}
                handleTagClick={handleTagDataClick}
              />
            ) : (
              <PromptCardDataList
                data={posts}
                handleTagClick={handleTagDataClick}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="py-10">
          <p className="text-zinc-400">No Reviews and Recommendations....</p>
        </div>
      )}
    </section>
  );
};

export default Feed;
