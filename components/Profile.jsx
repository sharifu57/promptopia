import React from "react";
import PrompCard from "./PrompCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const handleClickDelete = () => {};
  const handleClickEdit = () => {};
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
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
    </section>
  );
};

export default Profile;
