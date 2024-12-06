import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, rating} = await req.json();

  try {
    await connectToDB();
    const newPrompt = await Prompt.create({
      creator: userId,
      // tag: tag,
      rating: rating,
      prompt: prompt,
    });

    newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(`Failed to Create new prompt: ${error}`, {status: 500})
  }
};
