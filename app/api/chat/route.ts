export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Extract the latest message from the user
    const userMessage = messages[messages.length - 1].content;

    // --- MAi's MASSIVE QA DATABASE ---
    // IMPORTANT: Order matters! More specific phrases (like "soft skills") 
    // must be placed BEFORE general words (like "skills").
    const qaDatabase = [
      // 1. GREETINGS
      {
        keywords: ["hi", "hello", "hey", "hola", "greetings", "good morning", "good afternoon", "good evening", "what's up", "wassup", "start"],
        response: "Hello! I'm MAi, Ajay's personal AI assistant. I can tell you about his skills, education, projects, certifications, or career goals. What would you like to know?"
      },
      {
        keywords: ["how are you", "how do you do", "how have you been"],
        response: "I'm doing great, thank you! I'm here and ready to answer any questions you have about Ajay."
      },
      
      // 2. MAI'S IDENTITY & NAME
      {
        keywords: ["what does mai mean", "meaning of mai", "why mai", "mai stand for", "full form of mai", "explain mai"],
        response: "\"MAi\" simply stands for \"My AI\"! I am Ajay's custom-built personal artificial intelligence."
      },
      {
        keywords: ["who are you", "what are you", "are you ai", "are you human", "bot", "who built you", "what is your name", "your name", "who am i talking to"],
        response: "I am MAi, a custom-built virtual assistant designed specifically to help you learn more about Ajay R S and his professional portfolio."
      },
      
      // 3. PERSONAL BACKGROUND
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
      
      // 4. EDUCATION
      {
        keywords: ["ug studies", "ug", "undergrad", "undergraduate", "education", "college", "degree", "study", "studying", "b.tech", "btech", "university", "graduation", "graduate", "major", "bachelor of technology", "bachelor"],
        response: "Ajay is pursuing his Bachelor of Technology (B.Tech) in Information Technology at K. Ramakrishnan College of Technology, expected to graduate in 2027."
      },
      {
        keywords: ["school", "hslc", "sslc", "high school", "10th", "12th", "secondary"],
        response: "Before college, Ajay completed his Higher Secondary (HSLC) and Secondary School (SSLC) education at Sribala Vidya Mandhir Matric Hr. Sec. School."
      },

      // 5. SOFT SKILLS (Must be placed BEFORE Technical Skills)
      {
        keywords: ["soft skills", "soft skill", "non-technical skills", "non technical", "personality", "character", "strengths", "learning", "learner", "work ethic"],
        response: "Ajay is highly dedicated, disciplined, and supportive. He is a hands-on, self-paced learner who isn't afraid to troubleshoot complex problems, and he actively helps his peers with their technical projects."
      },
      
      // 6. BEST SKILL / SERVICENOW
      {
        keywords: ["best skill", "top skill", "strongest skill", "best at", "core competency", "specialty", "servicenow", "snow", "csa", "cad", "creator studio", "app engine", "workflow"],
        response: "ServiceNow is one of Ajay's strongest areas! He is CSA certified, holds a Creator Studio Delivery Accreditation, and has hands-on experience with Workflow Automation, Incident Management, and the Service Catalog. He is currently preparing for his CAD certification."
      },
      
      // 7. TECHNICAL SKILLS
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
      
      // 8. CERTIFICATIONS
      {
        keywords: ["certification", "certifications", "certificate", "certified", "credentials", "badges", "courses"],
        response: "Ajay holds over 20 professional certifications! Some of his proudest achievements include his ServiceNow CSA, Google AI Essentials, and Associate-level Cloud training for both Azure and AWS."
      },
      
      // 9. PROJECTS
      {
        keywords: ["project", "projects", "built", "work", "developed", "created"],
        response: "Ajay has built several impressive technical projects, including a Python-based Color Detection System, a Machine Learning Plant Disease Detection tool, and a Land Price Prediction System. You can view them all in the Projects section above!"
      },
      
      // 10. CAREER & GOALS
      {
        keywords: ["goal", "goals", "future", "career", "role", "hire", "job", "position", "looking for", "target", "objective"],
        response: "Ajay's primary goal right after graduation is to secure a role as a Developer (ServiceNow, Software, or Web Developer). He wants to join a company where he can contribute his skills and drive enterprise growth."
      },
      
      // 11. HOBBIES & LIFESTYLE
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
      
      // 12. LINKS & CONTACT
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
      
      // 13. GRATITUDE & CLOSING
      {
        keywords: ["thanks", "thank you", "appreciate", "awesome", "great", "cool", "bye", "goodbye"],
        response: "You're very welcome! Feel free to ask if you need anything else, or use the contact form below to send Ajay a direct message. Have a great day!"
      }
    ];

    // Default fallback response if no keywords match
    let botResponse = "I'm not quite sure about that specific detail! However, you can always email Ajay directly at ajayy.infotechh@gmail.com to find out.";

    // --- THE MATCHING ENGINE ---
    for (const qa of qaDatabase) {
      const matchFound = qa.keywords.some(keyword => {
        // Create a regex for the exact keyword to match whole words only. 
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(userMessage);
      });
      
      if (matchFound) {
        botResponse = qa.response;
        break; // Stop looking once we find the first match
      }
    }

    // Add a tiny fake delay (500ms) so it feels natural
    await new Promise(resolve => setTimeout(resolve, 500));

    // Send the response back to the frontend
    return new Response(JSON.stringify({ text: botResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Chat Error:", error);
    return new Response(JSON.stringify({ text: "Sorry, my systems are currently offline." }), { status: 500 });
  }
}


// export const dynamic = 'force-dynamic';
// export const maxDuration = 30;

// import { generateText } from 'ai';
// import { google } from '@ai-sdk/google';

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     const systemPrompt = `You are "Mai", the official AI representative and personal assistant for Ajay R S. 
//     "Mai" stands for "My AI". You MUST NOT explain what your name means unless the user explicitly asks "What does Mai mean?" or "Why are you named Mai?".
    
//     Your job is to answer questions about Ajay for recruiters, hiring managers, peers, and friends visiting his portfolio.
    
//     STRICT BEHAVIORAL RULES:
//     1. KEEP IT SHORT: Your responses MUST be incredibly concise, direct, and conversational (1 to 3 sentences maximum). Do NOT write long essays. Use bullet points only if absolutely necessary.
//     2. BEHAVIOR: Be professional, warm, and helpful. Never break character. Never admit you are Google Gemini. You are Mai, Ajay's custom-built AI.
//     3. BOUNDARIES: If asked something not in this prompt, reply exactly with: "I don't have that specific information, but you can email Ajay at ajayy.infotechh@gmail.com to find out!"
//     4. CERTIFICATIONS or SKILLS FORMAT: If asked about his certifications or skills, YOU MUST list his top three exactly as a numbered list for certificates and bullet pointed list for skills.
//     5. LINKS & RESUME: If asked for his LinkedIn ID, GitHub ID, or Resume, reply telling them that it is available in his portfolio.

//     PERSONAL INFO, CHARACTER & LIFESTYLE:
//     - Name: Ajay R S
//     - Date of Birth: 27-08-2005 (He is currently 20 years old and turning 21 later this year).
//     - Location: Tiruchirappalli, Tamil Nadu, India
//     - Personality & Character: Highly dedicated, disciplined, and supportive. He actively helps his juniors and peers with technical projects.
//     - Learning Behavior: Hands-on, resilient, and deeply curious. He learns by doing—whether it's troubleshooting hardware, building ServiceNow databases, or running machine learning epochs overnight on his laptop. He prefers self-paced learning.
//     - Hobbies & Interests: Riding his Yamaha MT-15 motorcycle, listening to music, exploring Generative AI tools, and gaming.
//     - Relationship Status: Single. He is currently heavily prioritizing his Bachelor of Technology degree, upskilling in enterprise tech, and building his career.
//     - Family: He has a very close and respectful relationship with his family.

//     CAREER GOALS & PREFERENCES:
//     - Target Role: Developer (ServiceNow, Software, or Web Developer) right after graduation.
//     - Ideal Workplace: He is open to any company where he can actively contribute his skills and be a driving part of the company's growth.
//     - Preferred Tech Stack (If building an app today): Python (which he relies on for his machine learning and data projects) or modern web technologies like React and Next.js (which he used to build this very AI-powered portfolio!).

//     EDUCATION:
//     - Pursuing Bachelor of Technology in Information Technology: K. Ramakrishnan College of Technology (2023 - 2027)
//     - Higher Secondary (HSLC) & SSLC: Sribala Vidya Mandhir Matric Hr. Sec. School (2020 - 2023)

//     TECHNICAL SKILLS:
//     - Programming: Java, Python, C
//     - Web: HTML, CSS
//     - Database: MySQL
//     - Cloud: AWS, Microsoft Azure
//     - ServiceNow: Administration, Workflow Automation, Incident Management, Service Catalog, Knowledge Management, Creator Studio, App Engine Studio
//     - Data & AI: Data Mining, Data Analytics, Pandas, Generative AI, Prompt Engineering

//     20 CERTIFICATIONS:
//     (Only mention the top 3 using the exact numbered list format required in rule 4, unless they ask for the full list of all 20).
//     1. ServiceNow Certified System Administrator (CSA)
//     2. Google AI Essentials
//     3. Microsoft Azure Administrator Associate Level
//     4. AWS Solutions Architect Associate Level
//     5. Cloud Architect Master's Program
//     6. Python for Data Science (NPTEL IIT Madras)
//     7. Responsive Web Design (freeCodeCamp)
//     8. Design Thinking – A Primer (Elite)
//     9. Creator Studio Delivery Accreditation
//     10. Welcome to ServiceNow Micro-Certification
//     11. Acquiring Data (FutureSkills Prime & NASSCOM)
//     12. Data Mining (Simplilearn)
//     13. Generative AI Literacy (Simplilearn)
//     14. Getting Started with Playwright using TypeScript
//     15. AI Tools & ChatGPT Workshop (Be10X)
//     16. Cyber Warfare & Ethical Hacking
//     17. Internship Common Aptitude Test (ICAT)
//     18. Technical Connection (1st place)
//     19. Technical Symposium (KIT)
//     20. Recent Trend in Graph theory and its application

//     PROJECTS (All on GitHub):
//     - Color Detection System (Python, Image Processing)
//     - Land Price Prediction System (Data Analytics, Predictive Modeling)
//     - Plant Disease Detection (Machine Learning, Python)

//     LEARNING JOURNEYS:
//     - ServiceNow: Welcome to ServiceNow -> Admin Fundamentals -> CSA Prep -> CSA Certified -> Creator Studio Fundamentals & Accreditation -> CAD Prep (Current).
//     - Cloud & AI: AWS & Azure Learning Paths, Cloud Architect Program, Google AI Essentials, GenAI Career Accelerator.`;

//     const { text } = await generateText({
//       model: google('gemini-2.5-flash'),
//       system: systemPrompt,
//       messages: messages,
//     });

//     return new Response(JSON.stringify({ text }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });

//   } catch (error: any) {
//     console.error("CRITICAL ERROR:", error);
//     return new Response(JSON.stringify({ text: "Sorry, my backend is currently undergoing maintenance." }), { status: 500 });
//   }
// }