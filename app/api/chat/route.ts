import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { createClient } from 'next-sanity';

// 1. Configure the connection to your Sanity Database
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false so the AI always gets your absolute latest updates
});

// 2. Define the POST request handler
export async function POST(req: Request) {
  // Extract the chat history from the user's request
  const { messages } = await req.json();

  // 3. Fetch your published persona data using GROQ (Sanity's query language)
  const query = `*[_type == "persona"][0]`;
  const personaData = await sanityClient.fetch(query);

  // 4. Construct the Dynamic System Prompt
  const systemPrompt = `
    ${personaData.characterAndBehavior}
    
    Here is the exact, up-to-date knowledge base you must use to answer the visitor's questions:
    
    Name: ${personaData.fullName}
    Role: ${personaData.role}
    Currently Learning: ${personaData.currentlyLearning || 'Not specified'}
    Technical Skills: ${personaData.skills ? personaData.skills.join(', ') : 'Not specified'}
    
    Education History:
    ${JSON.stringify(personaData.education, null, 2)}
    
    Project Portfolio:
    ${JSON.stringify(personaData.projects, null, 2)}
    
    CRITICAL INSTRUCTION: Only answer questions based on the information provided above. If the user asks something not in this data, politely inform them you do not have that specific detail about AJAY RS yet.
  `;

  // 5. Call the AI Model and stream the response
  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: systemPrompt,
    messages,
  });

  // 6. Return the stream to the frontend
  return result.toTextStreamResponse();
}