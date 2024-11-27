import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    if (!params || !params.id) {
      return new Response("Invalid request parameters", { status: 400 });
    }

    await connectToDB();
    const { id } = await params;
    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Data", { status: 500 });
  }
};
