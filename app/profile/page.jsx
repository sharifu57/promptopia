"use client";

import Profile from "@components/Profile";
import { WithUserAuth } from "@components/WithUserAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleDataEdit = async () => {};

  const handleDelete = async (post) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPosts();

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your Personalised Profile"
      data={posts}
      handleEdit={handleDataEdit}
      handleDelete={handleDelete}
    />
  );
};

export default WithUserAuth(MyProfile);
