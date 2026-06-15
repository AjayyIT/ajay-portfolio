export const dynamic = 'force-dynamic';
export const maxDuration = 30;

import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1].content;

    // ==========================================
    // LAYER 1: FAST LOCAL QA DATABASE
    // ==========================================
    const qaDatabase = [
      {
        keywords: ["hi", "hello", "hey", "hola", "greetings", "good morning", "good afternoon", "what's up", "wassup", "start"],
        response: "Hello! I'm MAi, Ajay's personal AI assistant. I can tell you about his skills, education, projects, certifications, or career goals. What would you like to know?"
      },
      {
        keywords: ["how are you", "how do you do", "how have you been"],
        response: "I'm doing great, thank you! I'm here and ready to answer any questions you have about Ajay."
      },
      {
        keywords: ["what does mai mean", "meaning of mai", "why mai", "mai stand for", "full form of mai", "explain mai"],
        response: "\"MAi\" simply stands for \"My AI\"! I am Ajay's custom-built personal artificial intelligence."
      },
      {
        keywords: ["who are you", "what are you", "are you ai", "are you human", "bot", "who built you", "what is your name", "your name", "who am i talking to"],
        response: "I am MAi, a custom-built virtual assistant designed specifically to help you learn more about Ajay R S and his professional portfolio."
      },
      {
        keywords: ["full name", "what is rs", "ajay rs", "ajay full name"],
        response: "His full name is Ajay R S. You can just call him Ajay!"
      },
      {
        keywords: ["about", "who is ajay", "tell me about", "background", "introduce", "bio", "yourself"],
        response: "Ajay R S is a highly dedicated IT student graduating in 2027. He is a ServiceNow Certified System Administrator (CSA) with a strong passion for software development, cloud computing, and AI."
      },
      {
        keywords: ["age", "old", "dob", "born", "birthday", "birth date"],
        response: "Ajay was born on August 27, 2005. He is currently 20 years old and will be turning 21 later this year."
      },
      {
        keywords: ["location", "where", "live", "city", "hometown", "home town", "state", "country", "from", "native"],
        response: "Ajay is based in Tiruchirappalli, Tamil Nadu, India."
      },
      {
        keywords: ["ug studies", "ug", "undergrad", "undergraduate", "education", "college", "degree", "study", "studying", "b.tech", "btech", "university", "graduation", "graduate", "major", "bachelor of technology", "bachelor"],
        response: "Ajay is pursuing his Bachelor of Technology (B.Tech) in Information Technology at K. Ramakrishnan College of Technology, expected to graduate in 2027."
      },
      {
        keywords: ["school", "hslc", "sslc", "high school", "10th", "12th", "secondary"],
        response: "Before college, Ajay completed his Higher Secondary (HSLC) and Secondary School (SSLC) education at Sribala Vidya Mandhir Matric Hr. Sec. School."
      },
      {
        keywords: ["soft skills", "soft skill", "non-technical skills", "non technical", "personality", "character", "strengths", "learning", "learner", "work ethic"],
        response: "Ajay is highly dedicated, disciplined, and supportive. He is a hands-on, self-paced learner who isn't afraid to troubleshoot complex problems, and he actively helps his peers with their technical projects."
      },
      {
        keywords: ["best skill", "top skill", "strongest skill", "best at", "core competency", "specialty", "servicenow", "snow", "csa", "cad", "creator studio", "app engine", "workflow"],
        response: "ServiceNow is one of Ajay's strongest areas! He is CSA certified, holds a Creator Studio Delivery Accreditation, and has hands-on experience with Workflow Automation, Incident Management, and the Service Catalog. He is currently preparing for his CAD certification."
      },
      {
        keywords: ["skills", "technologies", "tech stack", "languages", "programming", "know", "code", "frameworks", "tools", "software", "proficient", "technical skills"],
        response: "Ajay is proficient in Java, Python, and C. He is skilled in Web Development (HTML/CSS), MySQL, Cloud platforms (AWS, Azure), and AI/Data Analytics (Pandas, Prompt Engineering). He is also heavily specialized in the ServiceNow ecosystem."
      },
      {
        keywords: ["cloud", "aws", "azure", "amazon web services", "microsoft azure", "gcp"],
        response: "Ajay has a solid foundation in cloud computing. He holds Associate Level training certifications in both Microsoft Azure Administration and AWS Solutions Architecture."
      },
      {
        keywords: ["ai", "artificial intelligence", "data", "machine learning", "ml", "pandas", "gen ai", "generative ai", "prompt engineering", "data mining"],
        response: "Ajay is very active in the AI space. He has completed the Google AI Essentials program, runs local machine learning models on his hardware, and builds data-driven Python applications."
      },
      {
        keywords: ["certification", "certifications", "certificate", "certified", "credentials", "badges", "courses"],
        response: "Ajay holds over 20 professional certifications! Some of his proudest achievements include his ServiceNow CSA, Google AI Essentials, and Associate-level Cloud training for both Azure and AWS."
      },
      {
        keywords: ["project", "projects", "built", "work", "developed", "created"],
        response: "Ajay has built several impressive technical projects, including a Python-based Color Detection System, a Machine Learning Plant Disease Detection tool, and a Land Price Prediction System. You can view them all in the Projects section above!"
      },
      {
        keywords: ["goal", "goals", "future", "career", "role", "hire", "job", "position", "looking for", "target", "objective"],
        response: "Ajay's primary goal right after graduation is to secure a role as a Developer (ServiceNow, Software, or Web Developer). He wants to join a company where he can contribute his skills and drive enterprise growth."
      },
      {
        keywords: ["hobbies", "fun", "free time", "weekend", "play", "interests", "relax", "music", "read", "books", "reading"],
        response: "Outside of coding, Ajay loves riding his Yamaha MT-15 motorcycle, listening to music, exploring Generative AI art, and gaming. He also enjoys reading personal development books and Tamil fiction."
      },
      {
        keywords: ["bike", "motorcycle", "ride", "riding", "yamaha", "mt-15", "mt15"],
        response: "Yes! Ajay is an avid rider and proudly owns a Yamaha MT-15 motorcycle."
      },
      {
        keywords: ["single", "married", "relationship", "dating", "girlfriend"],
        response: "Ajay is currently single and heavily prioritizing his B.Tech degree, upskilling in enterprise tech, and building a strong foundation for his career."
      },
      {
        keywords: ["family", "father", "parents"],
        response: "Ajay comes from a supportive background and maintains a very close and respectful relationship with his family."
      },
      {
        keywords: ["github", "git", "source code", "repositories", "repo"],
        response: "You can check out all of Ajay's source code on his GitHub! There is a link button in the Home section at the top, and on the individual project cards."
      },
      {
        keywords: ["linkedin", "connection", "network", "profile"],
        response: "Ajay would love to connect! You can find his LinkedIn link in the Home section at the top of the page, or down in the Contact section."
      },
      {
        keywords: ["resume", "cv", "curriculum vitae", "download", "document"],
        response: "You can easily download a PDF copy of Ajay's resume by clicking the 'Download Resume' button at the very top of the Home section."
      },
      {
        keywords: ["contact", "email", "reach", "message", "phone", "call", "number", "get in touch", "mail id", "email id", "gmail"],
        response: "The best way to reach Ajay is by emailing him at ajayy.infotechh@gmail.com, or by using the Contact Form at the bottom of this page!"
      },
      {
        keywords: ["thanks", "thank you", "appreciate", "awesome", "great", "cool", "bye", "goodbye"],
        response: "You're very welcome! Feel free to ask if you need anything else, or use the contact form below to send Ajay a direct message. Have a great day!"
      }
    ];

    let botResponse = "";
    let matchFound = false;

    // Check Local Database First
    for (const qa of qaDatabase) {
      const matched = qa.keywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(userMessage);
      });
      
      if (matched) {
        botResponse = qa.response;
        matchFound = true;
        break; // Stop looking once we find the first match
      }
    }

    // IF A MATCH WAS FOUND LOCALLY -> Return immediately, saving API limits!
    if (matchFound) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Fake typing delay
      return new Response(JSON.stringify({ text: botResponse }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ==========================================
    // LAYER 2: FALLBACK TO GEMINI API
    // ==========================================
    // If the user asks something unique, we forward it to the AI.

    const systemPrompt = `You are "Mai", the official AI representative and personal assistant for Ajay R S. 
    "Mai" stands for "My AI". You MUST NOT explain what your name means unless asked.
    
    Your job is to answer questions about Ajay for recruiters, hiring managers, peers, and friends visiting his portfolio.
    
    STRICT BEHAVIORAL RULES:
    1. KEEP IT SHORT: Your responses MUST be incredibly concise, direct, and conversational (1 to 3 sentences maximum). Do NOT write long essays.
    2. BEHAVIOR: Be professional, warm, and helpful. Never break character. Never admit you are Google Gemini.
    3. BOUNDARIES: If asked something highly inappropriate or completely unrelated to tech/career/Ajay, reply exactly with: "I don't have that specific information, but you can email Ajay at ajayy.infotechh@gmail.com to find out!"

    PERSONAL INFO, CHARACTER & LIFESTYLE:
    - Name: Ajay R S
    - Date of Birth: August 27, 2005 (20 years old, turning 21 later this year)
    - Location: Tiruchirappalli, Tamil Nadu, India
    - Personality & Character: Dedicated, disciplined, supportive, actively helps juniors.
    - Learning Behavior: Hands-on, resilient, self-paced learner.
    - Hobbies: Yamaha MT-15 motorcycle, music, GenAI tools, gaming, reading Tamil fiction.
    - Relationship Status: Single. Prioritizing his career and B.Tech.
    - Family: Close and respectful relationship with his family.

    CAREER GOALS & PREFERENCES:
    - Target Role: Developer (ServiceNow, Software, Web) after graduation.
    - Ideal Workplace: Open to any company where he can contribute to growth.
    - Preferred Tech Stack: Python, modern web technologies (React/Next.js).

    EDUCATION:
    - B.Tech IT: K. Ramakrishnan College of Technology (2023 - 2027)
    - HSLC & SSLC: Sribala Vidya Mandhir Matric Hr. Sec. School (2020 - 2023)

    TECHNICAL SKILLS:
    - Programming: Java, Python, C
    - Web: HTML, CSS
    - Database: MySQL
    - Cloud: AWS, Microsoft Azure
    - ServiceNow: CSA Certified, Creator Studio Accreditation, preparing for CAD.
    - Data & AI: Pandas, Generative AI, Prompt Engineering.
    
    PROJECTS: Color Detection System, Land Price Prediction, Plant Disease Detection.`;

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages: messages,
    });

    return new Response(JSON.stringify({ text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("Chat Error:", error);
    return new Response(JSON.stringify({ text: "I'm having a little trouble connecting to my servers right now, but you can always reach Ajay at ajayy.infotechh@gmail.com!" }), { status: 500 });
  }
}