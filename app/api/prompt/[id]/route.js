import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
//GET

export const GET = async (request, { params }) => {
  try {
    if (!params || !params.id) {
      return new Response("Invalid request parameters", { status: 400 });
    }

    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not founf", { status: 400 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch Data", { status: 500 });
  }
};

//PATCH
export const PATCH = async (request, { params }) => {
  try {
    if (!params || !params.id) {
      return new Response("Failed to get param", { status: 500 });
    }
    const { prompt, tag } = await request.json();
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("No prompt found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: error.status });
  }
};

//DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 204 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: error.status });
  }
};
