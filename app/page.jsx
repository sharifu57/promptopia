"use client";
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);
  return (
    <section>
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
          {!session?.user?.email ? (
            <div>
              <button
                className="bg-gray-300 px-4 py-2 rounded-2xl cursor-not-allowed opacity-50"
                disabled
              >
                Please Sign in
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                className="black_btn"
                onClick={() => router.push("/assistance")}
              >
                Try Free Now.
              </button>
            </div>
          )}
        </section>
        <div className="md:pt-20">
          <Feed />
        </div>
      </section>
    </section>
  );
};

export default Home;
