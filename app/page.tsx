'use client';

import ThemeToggle from '@/components/ThemeToggle';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, GraduationCap, Award, Code, Database, Cloud, 
  Terminal, Mail, ChevronRight, X, Download, Menu, MapPin, 
  CheckCircle2, Route, Send, Check
} from 'lucide-react';
import ChatWidget from '@/components/ChatWidget'; 

// --- FAIL-PROOF ICONS ---
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- DATA ARRAYS ---
const educationList = [
  { degree: "B.Tech Information Technology", school: "K. Ramakrishnan College of Technology", year: "2023 - 2027 (Pursuing)" },
  { degree: "Higher Secondary (HSLC)", school: "Sribala Vidya Mandhir Matric Hr. Sec. School", year: "2022 - 2023" },
  { degree: "Secondary School (SSLC)", school: "Sribala Vidya Mandhir Matric Hr. Sec. School", year: "2020 - 2021" }
];

const skills = [
  { category: "Programming", icon: <Code size={20}/>, items: [{ name: "Java" }, { name: "Python" }, { name: "C" }] },
  { category: "Web Development", icon: <Terminal size={20}/>, items: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }] },
  { category: "Database", icon: <Database size={20}/>, items: [{ name: "MySQL" }] },
  { category: "Cloud", icon: <Cloud size={20}/>, items: [{ name: "AWS" }, { name: "Microsoft Azure" }] },
  { category: "ServiceNow", icon: <Briefcase size={20}/>, items: [{ name: "ServiceNow Administration" }, { name: "Workflow Automation" }, { name: "Incident Management" }, { name: "Service Catalog" }, { name: "Knowledge Management" }, { name: "Creator Studio" }, { name: "App Engine Studio" }] },
  { category: "Data & AI", icon: <Cloud size={20}/>, items: [{ name: "Data Mining" }, { name: "Data Analytics" }, { name: "Pandas" }, { name: "Generative AI" }, { name: "Prompt Engineering" }] }
];


const certifications = [
  { title: "ServiceNow Certified System Administrator (CSA)", issuer: "ServiceNow", date: "08 June 2026", img: "/certificates/ServiceNow (CSA).jpg", desc: "Validated skills in ServiceNow platform administration, user management, workflows, service catalog, incident management, and platform configuration." },
  { title: "Google AI Essentials", issuer: "Google & Coursera", date: "20 May 2026", img: "/certificates/Google Ai Essentials.jpg", desc: "Learned AI fundamentals, prompt engineering, responsible AI practices, and practical AI applications for productivity and problem-solving." },
  { title: "Microsoft Azure Administrator Associate Level", issuer: "Simplilearn", date: "03 Apr 2026", img: "/certificates/SIMPLILEARN azure associate.jpg", desc: "Gained knowledge of Azure administration, cloud infrastructure, virtual machines, networking, storage, and identity management." },
  { title: "AWS Solutions Architect Associate Level", issuer: "Simplilearn", date: "29 Oct 2025", img: "/certificates/SIMPLILEARN aws.jpg", desc: "Learned AWS cloud services, architecture principles, deployment strategies, and cloud solution design concepts." },
  { title: "Cloud Architect Master's Program", issuer: "Simplilearn", date: "12 Mar 2026", img: "/certificates/SIMPLILEARN cloud architect.jpg", desc: "Explored cloud architecture, cloud deployment models, cloud security, and enterprise cloud solutions." },
  { title: "GitHub Foundations Part 2 of 2", issuer: "Microsoft", date: "26 Jun 2026", img: "/certificates/GitHub Foundations-2.png", desc: "Advanced knowledge of GitHub tools, including collaborative workflows, project management, and repository security." },
  { title: "GitHub Foundations Part 1 of 2", issuer: "Microsoft", date: "20 Jun 2026", img: "/certificates/GitHub Foundations-1.png", desc: "Learned foundational concepts of version control, repository management, collaboration, and core Git workflows using GitHub." },
  { title: "Samsung Galaxy AI Treasure Hunt 2026", issuer: "Unstop × Samsung", date: "25 Jun 2026", img: "/certificates/Unstop Samsung.jpg", desc: "Participated in the Samsung Galaxy AI Treasure Hunt 2026, exploring Galaxy AI features through an interactive challenge." },
  { title: "Python for Data Science", issuer: "NPTEL (IIT Madras)", date: "Jan 2025", img: "/certificates/Python for Data Science.jpg", desc: "Developed skills in Python programming, data analysis, data visualization, and data-driven problem solving." },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "11 Jul 2025", img: "/certificates/FREE CODE CAMP.png", desc: "Achieved 300+ hours of Learning and Demonstrated the knowledge of HTML, CSS, and JavaScript by building responsive websites." },
  { title: "Design Thinking – A Primer (Elite)", issuer: "NPTEL (IIT Madras)", date: "Jan 2026", img: "/certificates/Design thinking.jpg", desc: "Learned user-centric problem-solving methodologies, innovation frameworks, and creative solution development." },
  { title: "Creator Studio Delivery Accreditation", issuer: "ServiceNow", date: "09 Jun 2026", img: "/certificates/ServiceNow accr.jpg", desc: "Demonstrated knowledge of Creator Studio concepts and low-code application development within the ServiceNow platform." },
  { title: "Welcome to ServiceNow Micro-Certification", issuer: "ServiceNow University", date: "14 Apr 2026", img: "/certificates/Micro-Certification ServiceNow.jpg", desc: "Gained foundational knowledge of ServiceNow platform capabilities, workflows, services, and enterprise applications." },
  { title: "Acquiring Data", issuer: "FutureSkills Prime & NASSCOM", date: "28 May 2026", img: "/certificates/Acquiring Data.jpg", desc: "Learned data acquisition concepts including data types, data warehousing, big data, Hadoop, Hive, metadata, and data validation using Pandas." },
  { title: "Data Mining", issuer: "Simplilearn SkillUp", date: "29 Dec 2025", img: "/certificates/Data Mining.jpg", desc: "Explored data mining concepts, classification, clustering, pattern discovery, and knowledge extraction techniques." },
  { title: "Generative AI Literacy", issuer: "Simplilearn SkillUp", date: "30 Apr 2026", img: "/certificates/Gen Ai quiz.jpg", desc: "Learned the fundamentals of Generative AI, its applications, capabilities, limitations, and responsible AI usage." },
  { title: "Getting Started with Playwright using TypeScript", issuer: "Simplilearn SkillUp", date: "11 Apr 2026", img: "/certificates/playwright & TypeScript.jpg", desc: "Learned browser automation, end-to-end testing, and web application testing using Playwright and TypeScript." },
  { title: "AI Tools & ChatGPT Workshop", issuer: "Be10X", date: "17 May 2026", img: "/certificates/Be10x Ai Workshop.jpg", desc: "Explored AI-powered productivity tools, prompt engineering, automation, coding assistance, and workflow optimization techniques." },
  { title: "Cyber Warfare & Ethical Hacking", issuer: "K. Ramakrishnan College of Technology", date: "4 Apr 2025", img: "/certificates/ETHICAL HACKING.jpg", desc: "Learned cybersecurity fundamentals, ethical hacking concepts, network security, and vulnerability assessment basics." },
  { title: "Internship Common Aptitude Test (ICAT)", issuer: "ICAT", date: "25 May 2026", img: "/certificates/iCAT - Participation Certificate.jpg", desc: "Assessed aptitude, logical reasoning, analytical thinking, and problem-solving abilities for career readiness." },
  { title: "Technical Connection", issuer: "K. Ramakrishnan College of Engineering", date: "17 Mar 2026", img: "/certificates/KRCE IT.jpg", desc: "Secured 1st place in a technical event, demonstrating technical knowledge, communication, and presentation skills." },
  { title: "Technical Symposium", issuer: "Kalaignarkarunanidhi Institute of Technology (KIT)", date: "01 Mar 2025", img: "/certificates/KIT.jpg", desc: "Participated in technical events focused on innovation, emerging technologies, and collaborative learning." },
  { title: "Recent Trend in Graph theory and its application", issuer: "Kongunadu College of Engineering and Technology", date: "07 May 2024", img: "/certificates/KONGUNADU.jpg", desc: "Engaged in the workshop to enhance my skills in problem-solving and mathematical concepts." }
];

const projects = [
  { 
    title: "Color Detection System", 
    domain: "Data Mining Techniques", 
    tech: "Python, Image Processing", 
    desc: "Python-based project that detects colors and identifies the nearest matching color using image processing techniques.",
    github: "https://github.com/AjayyIT/Color-detection-System" 
  },
  { 
    title: "Land Price Prediction System", 
    domain: "Business Intelligence", 
    tech: "Data Analytics, Predictive Modeling", 
    desc: "Predictive analytics project that estimates land prices using data-driven methodologies.",
    github: "https://github.com/AjayyIT/Land-Price-Prediction-System" 
  },
  { 
    title: "Plant Disease Detection", 
    domain: "Design Project", 
    tech: "Machine Learning, Python", 
    desc: "Technology-based solution for identifying plant diseases and assisting in agricultural monitoring.",
    github: "https://github.com/AjayyIT/Plant-Disease-Detection" 
  }
];

const serviceNowJourney = [
  "Welcome to ServiceNow (Zurich)",
  "ServiceNow Administration Fundamentals",
  "CSA Certification Preparation",
  "ServiceNow Certified System Administrator (CSA)",
  "Creator Studio Fundamentals",
  "Creator Studio Delivery Accreditation",
  "Preparing for Certified Application Developer (CAD)"
];

const cloudAiJourney = [
  { category: "Cloud Architecture Path", items: ["AWS Learning Path", "Azure Learning Path", "Cloud Architect Program"] },
  { category: "AI & GenAI Mastery", items: ["Google AI Essentials", "Generative AI Literacy", "AI Tools & ChatGPT Workshop", "FutureSkills Prime GenAI Career Accelerator"] }
];

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificates', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journeys' },
  { name: 'Contact', href: '#contact' }
];

// --- MAIN COMPONENT ---
export default function Portfolio() {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const visibleCertifications = showAllCerts ? certifications : certifications.slice(0, 9);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 80; 
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 350); 
    } else {
      const element = document.querySelector(href);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 80; 
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "b0e7ff4c-399d-42f9-9f67-1d589f43e2c9");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        mode: "no-cors" 
      });
      setSubmitStatus('success');
      e.currentTarget.reset(); 
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus('success');
      e.currentTarget.reset();
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans selection:bg-[#0A66C2] selection:text-white transition-colors duration-300">
      
      {/* HEADER / NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A66C2] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20 w-full gap-4">
            
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="lg:hidden font-bold text-2xl tracking-tight hover:text-blue-100 transition-colors">
              Home
            </a>
            
            <div className="hidden lg:flex flex-1 items-center justify-between">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-lg font-semibold px-4 py-2 rounded-lg hover:bg-[#004182] transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <ThemeToggle />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white hover:bg-[#004182] rounded-lg transition-colors">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
            
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-[#004182] overflow-hidden shadow-inner">
              <div className="px-6 py-4 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => scrollToSection(e, link.href)} 
                    className="block text-base font-medium text-white px-4 py-3 rounded-lg hover:bg-black/20 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-6 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F6F8]/50 dark:from-slate-800/50 to-white dark:to-slate-900 pointer-events-none transition-colors duration-300" />
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight transition-colors">
              Ajay R S
            </h1>
            <h2 className="text-xl md:text-2xl text-[#0A66C2] dark:text-blue-400 font-semibold mb-6 leading-relaxed">
              Final Year IT Student <br className="hidden md:block" />
              <span className="text-slate-400 mx-2 hidden md:inline">|</span> 
              ServiceNow CSA Certified <br className="hidden md:block" />
              <span className="text-slate-400 mx-2 hidden md:inline">|</span> 
              Aspiring ServiceNow Developer
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed transition-colors">
              Passionate about ServiceNow, Software Development, Cloud Computing, Artificial Intelligence, and Data Analytics. Continuously learning and building practical skills through projects, certifications, and hands-on experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2">
                <Mail size={18} /> Contact Me
              </a>
              <a href="/resume.pdf" download className="bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0A66C2] dark:text-blue-400 border border-[#0A66C2] dark:border-blue-400 px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
                <Download size={18} /> Download Resume
              </a>
              <div className="flex items-center gap-4 ml-2">
                <a href="http://www.linkedin.com/in/ajay-r-s" target="_blank" className="text-slate-400 hover:text-[#0A66C2] dark:hover:text-blue-400 transition-colors"><LinkedinIcon size={28} /></a>
                <a href="https://github.com/AjayyIT" target="_blank" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"><GithubIcon size={28} /></a>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex justify-center">
            <div className="w-64 h-[22rem] md:w-80 md:h-[28rem] rounded-3xl bg-gradient-to-tr from-[#0A66C2] to-blue-300 p-2 shadow-2xl mt-12 md:mt-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="w-full h-full rounded-[1.25rem] border-4 border-white dark:border-slate-800 overflow-hidden bg-slate-200 flex items-center justify-center">
                <img src="/certificates/photo.jpg" alt="Ajay RS" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT ME */}
      <section id="about" className="py-24 px-6 bg-[#F3F6F8] dark:bg-slate-800 transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white transition-colors">About Me</h2>
          <div className="bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 text-left transition-colors">
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 transition-colors">
              I am a Final Year B.Tech Information Technology student with interests in Software Development, ServiceNow, Cloud Computing, and Artificial Intelligence. I enjoy building practical projects, exploring emerging technologies, and continuously improving my technical skills.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 transition-colors">
              I have worked on academic and personal projects using Java, Python, MySQL, HTML, CSS, and ServiceNow. My goal is to build a successful career in enterprise technologies and software development while contributing to impactful solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Final Year Student', 'ServiceNow CSA Certified', 'Preparing for CAD Certification', 'Cloud & AI Enthusiast'].map((badge, i) => (
                <div key={i} className="bg-blue-50 dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-blue-300 px-4 py-3 rounded-xl text-sm font-semibold text-center border border-blue-100 dark:border-[#0A66C2]/30 flex items-center justify-center transition-colors">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. EDUCATION */}
      <section id="education" className="py-24 px-6 bg-white dark:bg-slate-900 transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white flex items-center justify-center gap-3 transition-colors">
            <GraduationCap className="text-[#0A66C2]" /> Education
          </h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
            {educationList.map((edu, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${idx === 0 ? 'bg-[#0A66C2] text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                  <GraduationCap size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
                  <div className={`font-bold text-sm mb-1 ${idx === 0 ? 'text-[#0A66C2]' : 'text-slate-500 dark:text-slate-400'}`}>{edu.year}</div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white transition-colors">{edu.degree}</h3>
                  <p className="text-slate-500 dark:text-slate-400 transition-colors">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. SKILLS */}
      <section id="skills" className="py-24 px-6 bg-[#F3F6F8] dark:bg-slate-800 transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white transition-colors">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-6 text-[#0A66C2] dark:text-blue-400 font-semibold border-b border-slate-100 dark:border-slate-700 pb-4 transition-colors">
                  {skillGroup.icon} <span>{skillGroup.category}</span>
                </div>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0A66C2]"></div>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. CERTIFICATIONS */}
      <section id="certifications" className="py-24 px-6 bg-white dark:bg-slate-900 transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white flex items-center justify-center gap-3 transition-colors">
            <Award className="text-[#0A66C2]" /> Featured Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCertifications.map((cert, idx) => (
              <div key={idx} onClick={() => setSelectedCert(cert)} className="group bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl cursor-pointer hover:border-[#0A66C2] dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col h-full">
                <div className="w-12 h-12 bg-blue-50 dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shrink-0">
                  <Award size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex-1 transition-colors">{cert.title}</h3>
                {/* Replace the old paragraph block with this one to show the date */}
                <p className="text-sm text-slate-500 dark:text-slate-400 flex flex-col mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 transition-colors">
                  <span className="font-medium text-slate-700 dark:text-slate-300 mb-1">{cert.issuer}</span>
                  <span className="flex items-center gap-1 text-xs">
                  {cert.date} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform ml-auto text-[#0A66C2] dark:text-blue-400"/>
                  </span>
                </p>
              </div>
            ))}
          </div>

          {certifications.length > 9 && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={() => setShowAllCerts(!showAllCerts)} 
                className="bg-white dark:bg-transparent border-2 border-[#0A66C2] text-[#0A66C2] dark:text-blue-400 hover:bg-[#0A66C2] hover:text-white dark:hover:bg-[#0A66C2] dark:hover:text-white px-8 py-3 rounded-xl font-bold transition-colors"
              >
                {showAllCerts ? "View Less" : "View all"}
              </button>
            </div>
          )}
        </motion.div>
      </section>

      {/* CERTIFICATION MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-colors duration-300">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10 transition-colors">
                <h3 className="font-bold text-xl text-slate-900 dark:text-white pr-8">{selectedCert.title}</h3>
                <button onClick={() => setSelectedCert(null)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 p-2 rounded-full transition-colors"><X size={20} /></button>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 transition-colors">
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden shadow-inner border border-slate-300 dark:border-slate-700 transition-colors">
                  <img src={selectedCert.img} alt={selectedCert.title} className="w-full h-auto object-contain max-h-[50vh]" />
                </div>
                
                {/* 👇 The fixed description block containing both the date AND the text */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</h4>
                    <span className="text-xs font-medium text-[#0A66C2] bg-blue-50 dark:bg-[#0A66C2]/20 dark:text-blue-400 px-2 py-1 rounded-md">{selectedCert.date}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed transition-colors text-sm">
                    {selectedCert.desc}
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-[#F3F6F8] dark:bg-slate-800 transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white transition-colors">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/50 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col h-full hover:-translate-y-2 transition-all duration-300">
                <div className="text-xs font-bold text-[#0A66C2] dark:text-blue-300 bg-blue-50 dark:bg-[#0A66C2]/20 inline-block px-3 py-1 rounded-full w-fit mb-4 transition-colors">
                  {project.domain}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 flex-1 text-sm leading-relaxed transition-colors">{project.desc}</p>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-700 mt-auto transition-colors">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-4">Technologies Used: <span className="text-slate-600 dark:text-slate-300">{project.tech}</span></p>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#0A66C2] dark:hover:bg-[#0A66C2] hover:text-white text-slate-700 dark:text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-700">
                    <GithubIcon size={16} /> View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7 & 8. JOURNEYS */}
      <section id="journeys" className="py-24 px-6 bg-white dark:bg-slate-900 transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* 7. ServiceNow Journey Section */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3 transition-colors">
                <Route className="text-[#0A66C2]" /> ServiceNow Journey
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 relative transition-colors">
                <div className="absolute left-[2.3rem] top-12 bottom-12 w-0.5 bg-blue-200 dark:bg-blue-900/50"></div>
                <ul className="space-y-6 relative">
                  {serviceNowJourney.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-slate-800 shadow flex items-center justify-center shrink-0 z-10 transition-colors ${idx === 3 ? 'bg-green-500' : 'bg-[#0A66C2]'}`}>
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <div className="pt-1">
                        <p className={`font-medium transition-colors ${idx === 3 ? 'text-green-600 dark:text-green-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>{step}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 8. Cloud & AI Learning Journey */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-3 transition-colors">
                <Cloud className="text-[#0A66C2]" /> Cloud & AI Learning Journey
              </h2>
              <div className="space-y-6">
                {cloudAiJourney.map((path, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                    <h3 className="font-bold text-lg text-[#0A66C2] dark:text-blue-400 mb-4 border-b border-slate-100 dark:border-slate-700 pb-3 transition-colors">{path.category}</h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {path.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 text-sm transition-colors">
                          <ChevronRight size={16} className="text-[#0A66C2] dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* 9. ACHIEVEMENTS STATS */}
      <section className="py-16 px-6 bg-[#0A66C2] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-3xl font-bold mb-2">20+</div><div className="text-blue-200 text-xs font-medium uppercase tracking-wide">Certifications</div></div>
          <div><div className="text-3xl font-bold mb-2 flex justify-center"><CheckCircle2 size={36}/></div><div className="text-blue-200 text-xs font-medium uppercase tracking-wide">ServiceNow CSA Certified</div></div>
          <div><div className="text-3xl font-bold mb-2 flex justify-center"><Cloud size={36}/></div><div className="text-blue-200 text-xs font-medium uppercase tracking-wide">Cloud Certifications</div></div>
          <div><div className="text-3xl font-bold mb-2 flex justify-center"><Database size={36}/></div><div className="text-blue-200 text-xs font-medium uppercase tracking-wide">AI & Data Analytics Learning</div></div>
        </div>
      </section>

      {/* 10 & 11. CONTACT & OBJECTIVE */}
      <section id="contact" className="py-24 px-6 bg-[#F3F6F8] dark:bg-slate-800 transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          
          {/* Career Objective */}
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-bold text-[#0A66C2] dark:text-blue-400 uppercase tracking-widest mb-4 transition-colors">Career Objective</h2>
            <p className="text-2xl text-slate-700 dark:text-slate-300 font-medium leading-relaxed transition-colors">
              "I aim to build a successful career in ServiceNow and Software Development by continuously learning, solving real-world problems, and contributing to innovative enterprise solutions."
            </p>
          </div>
          
          {/* Contact Section */}
          <div className="bg-white dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm grid md:grid-cols-2 gap-12 transition-colors">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white transition-colors">Contact</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 transition-colors">Feel free to reach out for collaborations, opportunities, or just a quick chat.</p>
              
              <div className="space-y-6">
                <a href="mailto:ajayy.infotechh@gmail.com" className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-[#0A66C2] dark:hover:text-blue-400 transition-colors group">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-[#0A66C2]/20 rounded-full flex items-center justify-center text-[#0A66C2] dark:text-blue-400 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors"><Mail size={20} /></div>
                  <div><p className="text-sm text-slate-400">Email</p><p className="font-medium">ajayy.infotechh@gmail.com</p></div>
                </a>
                
                <a href="http://www.linkedin.com/in/ajay-r-s" target="_blank" className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-[#0A66C2] dark:hover:text-blue-400 transition-colors group">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-[#0A66C2]/20 rounded-full flex items-center justify-center text-[#0A66C2] dark:text-blue-400 group-hover:bg-[#0A66C2] group-hover:text-white transition-colors"><LinkedinIcon size={20} /></div>
                  <div><p className="text-sm text-slate-400">LinkedIn</p><p className="font-medium">www.linkedin.com/in/ajay-r-s</p></div>
                </a>

                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 transition-colors">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"><MapPin size={20} /></div>
                  <div><p className="text-sm text-slate-400">Location</p><p className="font-medium">Tiruchirappalli, Tamil Nadu, India</p></div>
                </div>
              </div>
            </div>

            {/* Contact Form UI */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-700 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white transition-colors">Send a Message</h3>
              
              {submitStatus === 'success' ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400 p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-3 transition-colors">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 transition-colors">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">Message Sent!</h4>
                    <p className="text-sm mt-1">Thank you for reaching out. I'll get back to you soon.</p>
                  </div>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <input type="text" name="name" required placeholder="Your Name" disabled={isSubmitting} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] transition-all disabled:opacity-50" />
                  </div>
                  <div>
                    <input type="email" name="email" required placeholder="Your Email" disabled={isSubmitting} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] transition-all disabled:opacity-50" />
                  </div>
                  <div>
                    <textarea name="message" required placeholder="Your Message" rows={4} disabled={isSubmitting} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0A66C2] focus:ring-1 focus:ring-[#0A66C2] transition-all resize-none disabled:opacity-50"></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </motion.div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-2 font-medium text-slate-300">© 2026 Ajay R S. All Rights Reserved.</p>
          <p className="text-sm">Built with passion for technology and continuous learning.</p>
          <div className="flex justify-center gap-4 mt-6">
            <a href="http://www.linkedin.com/in/ajay-r-s" className="text-slate-500 hover:text-white transition-colors"><LinkedinIcon size={20}/></a>
            <a href="https://github.com/AjayyIT" className="text-slate-500 hover:text-white transition-colors"><GithubIcon size={20}/></a>
          </div>
        </div>
      </footer>

      <ChatWidget />
      
    </div>
  );
}