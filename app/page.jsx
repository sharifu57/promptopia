"use client";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <section className="w-full flex-center flex-col md:mt-16">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hiddden" />
        <span className="orange_gradient text-center">AI-Health Corner</span>
      </h1>
      <p className="desc text-center">
        HealthHub is an opent-source AI health tool for modern world to
        discover, create and share Health Research.
      </p>

      <section className="mt-20">
        <button
          type="button"
          className="black_btn"
          onClick={() => router.push("/assistance")}
          disabled={disabled}
        >
          Try Free Now.
        </button>
      </section>
      <Feed />
    </section>
  );
};

export default Home;
