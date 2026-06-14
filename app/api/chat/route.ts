export const dynamic = 'force-dynamic';
export const maxDuration = 30;

import { streamText } from 'ai';
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
    console.log("1. API Route hit. User asked:", messages[messages.length - 1].content);

    // Fetch Sanity Data
    const query = `*[_type == "persona"][0]`;
    const personaData = await sanityClient.fetch(query);
    
    if (!personaData) {
      console.warn("WARNING: Sanity returned null. Is the document published?");
    } else {
      console.log("2. Sanity data successfully retrieved for:", personaData.fullName);
    }

    // Fallback prompt in case Sanity data is missing
    const systemPrompt = personaData 
      ? `
          ${personaData.characterAndBehavior || "You are an assistant for Ajay."}
          Name: ${personaData.fullName || "Ajay RS"}
          Role: ${personaData.role || "Developer"}
          Education: ${JSON.stringify(personaData.education || [])}
          Projects: ${JSON.stringify(personaData.projects || [])}
        `
      : "You are Ajay's AI assistant. You don't have his full database yet, but you should be polite and let the user know you are undergoing maintenance.";

    console.log("3. Calling Google Gemini API...");

    // Call Gemini
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages,
    });

    console.log("4. Gemini responded successfully, streaming to frontend.");
    return result.toDataStreamResponse();

  } catch (error: any) {
    // If ANYTHING fails, it will print exactly what went wrong here
    console.error("CRITICAL API ERROR:", error.message || error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}