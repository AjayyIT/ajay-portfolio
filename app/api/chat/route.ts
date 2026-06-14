export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// We use standard generateText instead of streams
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from 'next-sanity';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, 
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const query = `*[_type == "persona"][0]`;
    const personaData = await sanityClient.fetch(query);

    const systemPrompt = personaData 
      ? `Name: ${personaData.fullName}. Background: ${personaData.characterAndBehavior}`
      : "You are Ajay's AI assistant.";

    // Generate the full text response securely on the server
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages: messages,
    });

    // Send it back as a standard, bulletproof JSON object
    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("CRITICAL ERROR:", error);
    return new Response(JSON.stringify({ text: "Sorry, my backend is currently undergoing maintenance." }), { status: 500 });
  }
}