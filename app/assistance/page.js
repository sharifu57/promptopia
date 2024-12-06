"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

const Assistance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [references, setReferences] = useState([]);

  const chatBoxRef = useRef(null); // Ref for the chat box container

  const { data: session } = useSession();
  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  const APIKEY = process.env.NEXT_PUBLIC_APIKEY;

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: searchTerm },
      ],
      temperature: 0.2,
      max_tokens: 2048,
      n: 1,
    };

    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${APIKEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const assistanceMessage = data.choices[0].message.content;

      const newConversation = [
        ...conversation,
        { role: "user", content: searchTerm },
        { role: "assistant", content: assistanceMessage },
      ];

      setConversation(newConversation);
      localStorage.setItem("conversation", JSON.stringify(newConversation));

      const bookReferences = await fetchReferences(searchTerm);
      setReferences(bookReferences);

      setSearchTerm("");
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReferences = async (query) => {
    const referenceAPI = "https://openlibrary.org/search.json?q=";

    try {
      const response = await fetch(
        `${referenceAPI}${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Failed to fetch references");

      const data = await response.json();
      return data.docs.slice(0, 5).map((doc) => ({
        title: doc.title,
        author: doc.author_name?.[0] || "Unknown Author",
        link: doc.key ? `https://openlibrary.org${doc.key}` : null,
      }));
    } catch (error) {
      console.error("Error fetching references:", error);
      return [];
    }
  };

  useEffect(() => {
    const storedConversation = localStorage.getItem("conversation");
    if (storedConversation) setConversation(JSON.parse(storedConversation));
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat box whenever `conversation` updates
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="relative w-full h-screen flex flex-col">
      <div className="w-full mb-10">
        <h1 className="head_text text-center">
            <span className="blue_gradient">AI Assistance Search</span>
        </h1>
      </div>
      {/* Main Section */}
      <section className="grid grid-cols-3 flex-grow border-solid border rounded-lg border-gray-200 overflow-hidden">
        <div className="bg-gray-200 p-4">
          {references.length > 0 && (
            <div className="references mt-4">
              <h3 className="font-semibold">Suggested Books and Authors:</h3>
              <ul className="list-disc ml-5">
                {references.map((ref, index) => (
                  <li key={`${ref.title}-${index}`}>
                    <strong>
                      {ref.link ? (
                        <a
                          href={ref.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {ref.title}
                        </a>
                      ) : (
                        ref.title
                      )}
                    </strong>{" "}
                    by {ref.author}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-blue-300 col-span-2 flex-grow p-4 flex flex-col overflow-y-auto">
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Chat Box */}
          <div
            className="chat-box mt-4 flex-grow overflow-y-auto"
            ref={chatBoxRef} // Attach the ref to the chat box
          >
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.role === "user"
                    ? "text-right bg-blue-200"
                    : "text-left bg-gray-200"
                } p-3 my-2 rounded-lg`}
              >
                <span className="block text-gray-700">{msg.content}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Search Bar */}
      <div className="sticky bottom-0 bg-gray-100 text-black p-2">
        <form
          className="flex items-center justify-center"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-2/3 p-2 rounded-l-md border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 px-4 py-2 rounded-r-md text-white hover:bg-blue-600"
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assistance;
