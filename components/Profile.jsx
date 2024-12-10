import React, { useState } from "react";
import PrompCard from "./PrompCard";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleClickDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");

    if (hasConfirmed) {
      setLoading(true);
      try {
        const response = await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const filteredPosts = myPosts.filter((p) => p._id !== post._id);

          setMyPosts(filteredPosts);

          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (e) {
        console.error("Failed to delete prompt", e);
        alert("Failed to delete prompt. Please try again later.");
        setLoading(false);
        return;
      }
    }
  };
  const handleClickEdit = (post) => {
    if (!post || !post._id) {
      return;
    }

    router.push(`/update-prompt?id=${encodeURIComponent(post._id)}`);
  };
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="mt-10 prompt_layout">
          {data.map((post) => (
            <PrompCard
              key={post._id}
              post={post}
              handleEdit={() => handleClickEdit && handleClickEdit(post)}
              handleDelete={() => handleClickDelete && handleClickDelete(post)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
