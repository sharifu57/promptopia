"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const TruncatedText = ({ text, limit = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const truncatedText =
    text.length > limit && !isExpanded
      ? `${text.substring(0, limit)}...`
      : text;

  return (
    <p className="my-4 font-satoshi text-sm text-gray-700">
      {truncatedText}
      {text.length > limit && (
        <button
          onClick={handleToggle}
          className="text-blue-500 ml-1 hover:underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </p>
  );
};

const StarRating = ({ rating }) => {
  const maxStars = 5;

  return (
    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
      {Array.from({ length: maxStars }, (_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? "text-yellow-300"
              : "text-gray-300 dark:text-gray-500"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );
};

const PrompCard = ({ post, handleTagCLick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 ">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-xs text-gray-500">
              created: {post?.created}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="image"
            height={12}
            width={12}
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      <TruncatedText text={post.prompt} limit={250} />

      <StarRating rating={post.rating} />

      {session?.user?.id === post?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PrompCard;
