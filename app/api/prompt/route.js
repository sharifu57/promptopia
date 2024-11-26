import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    console.log("-========try 1")
  try {
    await connectToDB();
    console.log("-========try 2")
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("=====try 3")
    console.error(error);
    return new Response("Failed to fetch Data", { status: 500 });
  }
};
