'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { 
  Briefcase, GraduationCap, Award, Code, Database, Cloud, 
  Terminal, Mail, ChevronRight, ChevronLeft, X, Download, Menu, MapPin, 
  CheckCircle2, Route, Send, Check, CalendarDays, Share2, Sun, Moon 
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

const eventsList = [
  {
    title: "ServiceNow AI Skills Summit",
    organizer: "ServiceNow University & NASSCOM",
    date: "July 2026",
    location: "Coimbatore",
    images: [
      "/events/summit-1.jpg", 
      "/events/summit-2.jpg"
    ],
    desc: `Had an amazing experience attending the ServiceNow AI Skills Summit – Coimbatore!\n\nIt was a great opportunity to learn from industry leaders and understand how AI is transforming enterprise workflows and shaping the future of work. The event was led by Mr. Bhaskar G, Senior Director, ServiceNow University, whose enthusiasm set the tone for an insightful day of learning.\n\nSome of the highlights included:\n• Mr. Naveen Kaushik (Managing Director, ServiceNow Practice, Accenture) sharing valuable insights into the ServiceNow ecosystem and enterprise transformation.\n• Mr. Ilango AP (Vice President - HR, ServiceNow) discussing opportunities and the growing demand for ServiceNow professionals.\n• An inspiring keynote by Mr. Udaya Shankar (Head - Talent Council, NASSCOM) on preparing ourselves for the future of technology and careers.\n• An impactful session, "AI + Workflows: Why Enterprises Need Both," by Ms. Neethi Upadhya (VP - Digital Transformation, Capgemini). One statement from her really stayed with me: "Will AI replace your job? No. People with AI will replace your job." This completely changed my perspective. It reinforced that AI isn't reducing opportunities—it is creating new ones for those who are willing to learn and adapt.\n• Ms. Triveni Bonthu (Director, ServiceNow Practice, LTM) shared valuable insights on Student Readiness for the ServiceNow Platform and how students can prepare for careers in the ServiceNow ecosystem.\n\nOne of the most exciting sessions was a live demonstration of "ServiceNow AI Agents: Configure an Agent" by Mr. Akash Kumar and Ms. Anshita Shrivastava from ServiceNow, where we got to see an AI Agent being configured on the platform in real time.\n\nApart from the technical sessions, it was also a wonderful opportunity to connect with fellow learners, interact with industry professionals, and even take home some exciting goodies! 🎁\n\nEvents like these motivate me even more to continue my journey in ServiceNow, AI, and enterprise application development.`
  }
];

const certifications = [
  { title: "ServiceNow Certified System Administrator (CSA)", issuer: "ServiceNow", date: "08 June 2026", img: "/certificates/ServiceNow (CSA).jpg", desc: "Validated skills in ServiceNow platform administration, user management, workflows, service catalog, incident management, and platform configuration." },
  { title: "Google AI Essentials", issuer: "Google & Coursera", date: "20 May 2026", img: "/certificates/Google Ai Essentials.jpg", desc: "Learned AI fundamentals, prompt engineering, responsible AI practices, and practical AI applications for productivity and problem-solving." },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "11 Jul 2025", img: "/certificates/FREE CODE CAMP.png", desc: "Achieved 300+ hours of Learning and Demonstrated the knowledge of HTML, CSS, and JavaScript by building responsive websites." },
  { title: "Microsoft Azure Administrator Associate Level", issuer: "Simplilearn", date: "03 Apr 2026", img: "/certificates/SIMPLILEARN azure associate.jpg", desc: "Gained knowledge of Azure administration, cloud infrastructure, virtual machines, networking, storage, and identity management." },
  { title: "Cloud Architect Master's Program", issuer: "Simplilearn", date: "12 Mar 2026", img: "/certificates/SIMPLILEARN cloud architect.jpg", desc: "Explored cloud architecture, cloud deployment models, cloud security, and enterprise cloud solutions." },
  { title: "GitHub Foundations Part 2 of 2", issuer: "Microsoft", date: "26 Jun 2026", img: "/certificates/GitHub Foundations-2.png", desc: "Advanced knowledge of GitHub tools, including collaborative workflows, project management, and repository security." },
  { title: "GitHub Foundations Part 1 of 2", issuer: "Microsoft", date: "20 Jun 2026", img: "/certificates/GitHub Foundations-1.png", desc: "Learned foundational concepts of version control, repository management, collaboration, and core Git workflows using GitHub." },
  { title: "AWS Solutions Architect Associate Level", issuer: "Simplilearn", date: "29 Oct 2025", img: "/certificates/SIMPLILEARN aws.jpg", desc: "Learned AWS cloud services, architecture principles, deployment strategies, and cloud solution design concepts." },
  { title: "Bano Job Ready", issuer: "YuWaah (Generation Unlimited) – UNICEF", date: "19 Jul 2026", img: "/certificates/bano-job-ready.jpg", desc: "Successfully completed the Bano Job Ready program by YuWaah (Generation Unlimited) – UNICEF, gaining practical knowledge of workplace readiness, professional communication, career planning, employability skills, and essential competencies required to transition from academics to the professional world."},
  { title: "Python for Data Science", issuer: "NPTEL (IIT Madras)", date: "Jan 2025", img: "/certificates/Python for Data Science.jpg", desc: "Developed skills in Python programming, data analysis, data visualization, and data-driven problem solving." },
  { title: "Design Thinking – A Primer (Elite)", issuer: "NPTEL (IIT Madras)", date: "Jan 2026", img: "/certificates/Design thinking.jpg", desc: "Learned user-centric problem-solving methodologies, innovation frameworks, and creative solution development." },
  { title: "Creator Studio Delivery Accreditation", issuer: "ServiceNow", date: "09 Jun 2026", img: "/certificates/ServiceNow accr.jpg", desc: "Demonstrated knowledge of Creator Studio concepts and low-code application development within the ServiceNow platform." },
  { title: "Welcome to ServiceNow Micro-Certification", issuer: "ServiceNow University", date: "14 Apr 2026", img: "/certificates/Micro-Certification ServiceNow.jpg", desc: "Gained foundational knowledge of ServiceNow platform capabilities, workflows, services, and enterprise applications." },
  { title: "Samsung Galaxy AI Treasure Hunt 2026", issuer: "Unstop × Samsung", date: "25 Jun 2026", img: "/certificates/Unstop Samsung.jpg", desc: "Participated in the Samsung Galaxy AI Treasure Hunt 2026, exploring Galaxy AI features through an interactive challenge." },
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
  "Attended ServiceNow AI Skills Summit",
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
  { name: 'Events', href: '#events' },
  { name: 'Certificates', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journeys' },
  { name: 'Contact', href: '#contact' }
];

// --- MAIN COMPONENT ---
export default function Portfolio() {
  
  // Theme & Mode States
  const [appTheme, setAppTheme] = useState<'linkedin' | 'servicenow'>('linkedin');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load custom color theme
    const savedTheme = localStorage.getItem('appTheme') as 'linkedin' | 'servicenow';
    if (savedTheme) setAppTheme(savedTheme);

    // Force Dark Mode on first visit if no preference is set in local storage
    if (!localStorage.getItem('theme')) {
      setTheme('dark');
    }
  }, [setTheme]);

  const handleThemeChange = (theme: 'linkedin' | 'servicenow') => {
    setAppTheme(theme);
    localStorage.setItem('appTheme', theme);
  };

  // Generate EXACT ServiceNow Brand CSS Variables
  const isSN = appTheme === 'servicenow';
  const themeStyles = {
    // --- CORE COLORS ---
    '--c-primary': isSN ? '#2EB85C' : '#0A66C2', 
    '--c-primary-text': isSN ? '#14803C' : '#0A66C2', 
    '--c-hover': isSN ? '#24964A' : '#004182',
    
    // --- LIGHT MODE COLORS ---
    '--bg-hero-light': isSN ? '#DCEBEB' : '#FFFFFF', 
    '--hero-grad-start': isSN ? '#BFE2E2' : 'rgba(255,255,255, 0.2)', 
    '--nav-bg-light': isSN ? 'rgba(220, 235, 235, 0.95)' : 'rgba(255, 255, 255, 0.9)',
    '--bg-base-light': isSN ? '#F4F9F9' : '#FFFFFF', 
    '--bg-alt-light': isSN ? '#E6EFEF' : '#F3F6F8', 
    
    '--text-main-light': isSN ? '#012A34' : '#0f172a', 
    '--text-muted-light': isSN ? '#1C4A54' : '#475569', 
    '--text-light-light': isSN ? '#436D77' : '#64748b', 
    '--border-light': isSN ? '#C7DCDC' : '#e2e8f0', 
    '--border-light-subtle': isSN ? '#DDF0F0' : '#f1f5f9', 
    
    // --- DARK MODE COLORS ---
    '--bg-main': isSN ? '#012A34' : '#0f172a', 
    '--bg-main-alpha': isSN ? 'rgba(1, 42, 52, 0.8)' : 'rgba(15, 23, 42, 0.8)',
    '--bg-card': isSN ? '#033E4D' : '#1e293b', 
    '--bg-card-alpha': isSN ? 'rgba(3, 62, 77, 0.6)' : 'rgba(30, 41, 59, 0.6)',
    '--border-dark': isSN ? '#085C70' : '#334155',
    
    // --- BUTTON TEXT ---
    '--btn-text': isSN ? '#011A20' : '#ffffff', 

    // --- ALPHAS & SHADOWS ---
    '--c-primary-alpha': isSN ? 'rgba(46, 184, 92, 0.15)' : 'rgba(10, 102, 194, 0.2)',
    '--c-primary-alpha-border': isSN ? 'rgba(46, 184, 92, 0.3)' : 'rgba(10, 102, 194, 0.3)',
    '--c-shadow': isSN ? 'rgba(46, 184, 92, 0.3)' : 'rgba(59, 130, 246, 0.3)',
    
    // --- GRADIENTS ---
    '--c-gradient-end': isSN ? '#067364' : '#93c5fd', 
    '--c-dark-alpha': isSN ? 'rgba(6, 115, 100, 0.5)' : 'rgba(30, 58, 138, 0.5)',
  } as React.CSSProperties;

  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllCertsModal, setShowAllCertsModal] = useState(false);
  
  // Events States
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showAllEventsModal, setShowAllEventsModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleShare = async (title: string, text: string, customUrl?: string) => {
    const url = customUrl || window.location.origin; 
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const eventQuery = searchParams.get('event');
    
    if (eventQuery) {
      const foundEvent = eventsList.find(e => e.title.replace(/\s+/g, '-') === eventQuery);
      if (foundEvent) {
        setSelectedEvent(foundEvent);
        setCurrentImageIndex(0);
        setTimeout(() => {
          const element = document.querySelector('#events');
          if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 300);
      }
    }
  }, []);

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

  const nextEvent = () => setCurrentEventIndex((prev) => (prev + 1) % eventsList.length);
  const prevEvent = () => setCurrentEventIndex((prev) => (prev - 1 + eventsList.length) % eventsList.length);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);

  const openEventDetails = (event: any) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  return (
    <div style={themeStyles} className="min-h-screen bg-[var(--bg-base-light)] dark:bg-[var(--bg-main)] text-[var(--text-main-light)] dark:text-slate-100 font-sans selection:bg-[var(--c-primary)] selection:text-[var(--btn-text)] transition-colors duration-300">
      
      {/* HEADER / NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg-light)] dark:bg-[var(--bg-main-alpha)] backdrop-blur-md border-b border-[var(--border-light)] dark:border-[var(--border-dark)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between lg:justify-center h-16 w-full relative">
            
            {/* Mobile Home Link */}
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="lg:hidden font-bold text-xl tracking-tight text-[var(--c-primary-text)] dark:text-[var(--c-primary)]">
              Portfolio
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 group">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-[0.9rem] font-semibold text-[var(--text-muted-light)] dark:text-slate-300 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer 
                             group-hover:opacity-40 group-hover:blur-[2px] group-hover:scale-95 
                             hover:!opacity-100 hover:!blur-none hover:!scale-110 hover:bg-[var(--c-primary)] hover:text-[var(--btn-text)] hover:shadow-lg hover:shadow-[var(--c-shadow-md)]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Side: THEME & MODE UNIFIED SWITCH */}
            <div className="flex items-center gap-3 shrink-0 lg:absolute lg:right-0">
              
              {mounted ? (
                <div 
                  className="relative flex items-center justify-center mx-2 cursor-pointer"
                  title="Click blue for deep blue theme / click green for teal green theme. Click the center button for dark/light mode."
                >
                  {/* The Pill Background for Color Selection */}
                  <div className="flex w-20 h-7 rounded-full overflow-hidden shadow-inner border border-black dark:border-white bg-[var(--bg-card-light)] dark:bg-[var(--bg-card)] transition-colors duration-300">
                    <button 
                      onClick={() => handleThemeChange('linkedin')}
                      className={`w-1/2 h-full bg-[#0A66C2] transition-all hover:opacity-100 ${appTheme === 'linkedin' ? 'opacity-100' : 'opacity-40'}`}
                      aria-label="Switch to Deep Blue theme"
                    />
                    <button 
                      onClick={() => handleThemeChange('servicenow')}
                      className={`w-1/2 h-full bg-[#2EB85C] transition-all hover:opacity-100 ${appTheme === 'servicenow' ? 'opacity-100' : 'opacity-40'}`}
                      aria-label="Switch to Teal Green theme"
                    />
                  </div>
                  
                  {/* The Center Button for Light/Dark Mode */}
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`absolute w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all duration-300 z-10 border-[3px] border-[var(--nav-bg-light)] dark:border-[var(--bg-main-alpha)]
                      ${theme === 'light' ? 'bg-black text-white' : 'bg-[#f1f5f9] text-black'}`}
                    aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                  >
                    {theme === 'light' ? <Moon size={15} fill="currentColor" /> : <Sun size={15} fill="currentColor" />}
                  </button>
                </div>
              ) : (
                <div className="w-20 h-7 mx-2" /> // Prevents layout shift during loading
              )}

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-[var(--text-muted-light)] dark:text-slate-300 hover:bg-[var(--border-light-subtle)] dark:hover:bg-[var(--bg-card)] rounded-lg transition-colors">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-white dark:bg-[var(--bg-main)] border-b border-[var(--border-light)] dark:border-[var(--border-dark)] overflow-hidden shadow-xl">
              <div className="px-6 py-4 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => scrollToSection(e, link.href)} 
                    className="block text-base font-semibold text-[var(--text-main-light)] dark:text-slate-200 px-4 py-3 rounded-lg hover:bg-[var(--bg-alt-light)] dark:hover:bg-[var(--bg-card)] hover:text-[var(--c-primary-text)] dark:hover:text-[var(--c-primary)] transition-colors cursor-pointer"
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
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-[var(--bg-hero-light)] dark:bg-[var(--bg-main)] px-6 overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--hero-grad-start)] to-[var(--bg-hero-light)] dark:from-[var(--bg-card)]/50 dark:to-[var(--bg-main)] pointer-events-none transition-colors duration-300" />
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-main-light)] dark:text-white mb-4 tracking-tight transition-colors">
              Ajay R S
            </h1>
            <h2 className="text-xl md:text-2xl text-[var(--c-primary-text)] dark:text-[var(--c-primary)] font-semibold mb-6 leading-relaxed">
              Final Year IT Student <br className="hidden md:block" />
              <span className="text-[var(--text-light-light)] dark:text-slate-500 mx-2 hidden md:inline">|</span> 
              ServiceNow CSA Certified <br className="hidden md:block" />
              <span className="text-[var(--text-light-light)] dark:text-slate-500 mx-2 hidden md:inline">|</span> 
              Aspiring ServiceNow Developer
            </h2>
            <p className="text-[var(--text-muted-light)] dark:text-slate-300 text-lg mb-8 leading-relaxed transition-colors">
              Passionate about ServiceNow, Software Development, Cloud Computing, Artificial Intelligence, and Data Analytics. Continuously learning and building practical skills through projects, certifications, and hands-on experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-[var(--btn-text)] px-6 py-3 rounded-full font-bold transition-colors shadow-lg shadow-[var(--c-shadow)] flex items-center gap-2">
                <Mail size={18} /> Contact Me
              </a>
              <a href="/resume.pdf" download className="bg-white/50 dark:bg-transparent hover:bg-white dark:hover:bg-[var(--bg-card)] text-[var(--c-primary-text)] dark:text-[var(--c-primary)] border border-[var(--c-primary-text)] dark:border-[var(--c-primary)] px-6 py-3 rounded-full font-bold transition-colors flex items-center gap-2">
                <Download size={18} /> Download Resume
              </a>
              <div className="flex items-center gap-4 ml-2">
                <a href="http://www.linkedin.com/in/ajay-r-s" target="_blank" className="text-[var(--text-light-light)] dark:text-slate-400 hover:text-[var(--c-primary-text)] dark:hover:text-[var(--c-primary)] transition-colors"><LinkedinIcon size={28} /></a>
                <a href="https://github.com/AjayyIT" target="_blank" className="text-[var(--text-light-light)] dark:text-slate-400 hover:text-[var(--text-main-light)] dark:hover:text-white transition-colors"><GithubIcon size={28} /></a>
                <button onClick={() => handleShare('Ajay R S - Portfolio', 'Check out the portfolio of Ajay R S, an aspiring ServiceNow developer!')} className="text-[var(--text-light-light)] dark:text-slate-400 hover:text-[var(--c-primary-text)] dark:hover:text-[var(--c-primary)] transition-colors" title="Share Portfolio">
                  <Share2 size={26} />
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex justify-center">
            <div className="w-64 h-[22rem] md:w-80 md:h-[28rem] rounded-3xl bg-gradient-to-tr from-[var(--c-primary)] to-[var(--c-gradient-end)] p-2 shadow-2xl mt-12 md:mt-0 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="w-full h-full rounded-[1.25rem] border-4 border-[var(--bg-hero-light)] dark:border-[var(--bg-main)] overflow-hidden bg-[var(--border-light)] flex items-center justify-center">
                <img src="/certificates/photo.jpg" alt="Ajay RS" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT ME */}
      <section id="about" className="py-24 px-6 bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card)] transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-main-light)] dark:text-white transition-colors">About Me</h2>
          <div className="bg-white dark:bg-[var(--bg-main-alpha)] p-8 md:p-12 rounded-3xl shadow-sm border border-[var(--border-light)] dark:border-[var(--border-dark)] text-left transition-colors">
            <p className="text-[var(--text-muted-light)] dark:text-slate-300 text-lg leading-relaxed mb-6 transition-colors">
              I am a Final Year B.Tech Information Technology student with interests in Software Development, ServiceNow, Cloud Computing, and Artificial Intelligence. I enjoy building practical projects, exploring emerging technologies, and continuously improving my technical skills.
            </p>
            <p className="text-[var(--text-muted-light)] dark:text-slate-300 text-lg leading-relaxed mb-8 transition-colors">
              I have worked on academic and personal projects using Java, Python, MySQL, HTML, CSS, and ServiceNow. My goal is to build a successful career in enterprise technologies and software development while contributing to impactful solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Final Year Student', 'ServiceNow CSA Certified', 'Preparing for CAD Certification', 'Cloud & AI Enthusiast'].map((badge, i) => (
                <div key={i} className="bg-[var(--bg-alt-light)] dark:bg-[var(--c-primary-alpha)] text-[var(--c-primary-text)] dark:text-[var(--c-primary)] px-4 py-3 rounded-xl text-sm font-semibold text-center border border-[var(--border-light)] dark:border-[var(--c-primary-alpha-border)] flex items-center justify-center transition-colors">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. EDUCATION */}
      <section id="education" className="py-24 px-6 bg-[var(--bg-base-light)] dark:bg-[var(--bg-main)] transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[var(--text-main-light)] dark:text-white flex items-center justify-center gap-3 transition-colors">
            <GraduationCap className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)]" /> Education
          </h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[var(--border-light)] dark:before:via-[var(--border-light)] before:to-transparent">
            {educationList.map((edu, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[var(--bg-base-light)] dark:border-[var(--bg-main)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${idx === 0 ? 'bg-[var(--c-primary)] text-[var(--btn-text)]' : 'bg-[var(--border-light)] dark:bg-[var(--bg-card)] text-[var(--text-muted-light)] dark:text-slate-300'}`}>
                  <GraduationCap size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-[var(--bg-card-alpha)] p-6 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-[var(--border-dark)] hover:shadow-md transition-all">
                  <div className={`font-bold text-sm mb-1 ${idx === 0 ? 'text-[var(--c-primary-text)] dark:text-[var(--c-primary)]' : 'text-[var(--text-light-light)] dark:text-slate-400'}`}>{edu.year}</div>
                  <h3 className="font-bold text-lg text-[var(--text-main-light)] dark:text-white transition-colors">{edu.degree}</h3>
                  <p className="text-[var(--text-muted-light)] dark:text-slate-400 transition-colors">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. SKILLS */}
      <section id="skills" className="py-24 px-6 bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card)] transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[var(--text-main-light)] dark:text-white transition-colors">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--bg-main-alpha)] p-6 rounded-2xl shadow-sm border border-[var(--border-light)] dark:border-[var(--border-dark)] transition-colors">
                <div className="flex items-center gap-3 mb-6 text-[var(--c-primary-text)] dark:text-[var(--c-primary)] font-semibold border-b border-[var(--border-light)] dark:border-[var(--border-dark)] pb-4 transition-colors">
                  {skillGroup.icon} <span>{skillGroup.category}</span>
                </div>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2 text-[var(--text-muted-light)] dark:text-slate-300 font-medium transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--c-primary-text)] dark:bg-[var(--c-primary)]"></div>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4.5. EVENTS SECTION */}
      <section id="events" className="py-16 px-6 bg-[var(--bg-base-light)] dark:bg-[var(--bg-main)] transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[var(--text-main-light)] dark:text-white flex items-center justify-center gap-3 transition-colors">
            <CalendarDays className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)]" /> Events
          </h2>

          <div className="relative group">
            {eventsList.length > 1 && (
              <button 
                onClick={prevEvent} 
                className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[var(--bg-card)] p-3 rounded-full shadow-lg text-[var(--c-primary-text)] dark:text-[var(--c-primary)] border border-[var(--border-light)] dark:border-[var(--border-dark)] hover:scale-110 transition-transform"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div 
              onClick={() => openEventDetails(eventsList[currentEventIndex])}
              className="bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card-alpha)] rounded-3xl overflow-hidden shadow-sm border border-[var(--border-light)] dark:border-[var(--border-dark)] cursor-pointer hover:shadow-xl hover:border-[var(--c-primary-text)] dark:hover:border-[var(--c-primary)] transition-all duration-300 flex flex-col md:flex-row group/tile md:h-[24rem]"
            >
              <div className="md:w-1/2 h-64 md:h-full bg-[var(--border-light)] dark:bg-[var(--bg-card)] relative overflow-hidden shrink-0">
                <img 
                  src={eventsList[currentEventIndex].images[0]} 
                  alt={eventsList[currentEventIndex].title} 
                  className="w-full h-full object-cover group-hover/tile:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white dark:bg-[var(--bg-main-alpha)] overflow-hidden">
                <div className="text-xs font-bold text-[var(--c-primary-text)] dark:text-[var(--c-primary)] bg-[var(--bg-alt-light)] dark:bg-[var(--c-primary-alpha)] inline-block px-3 py-1 rounded-md w-fit mb-3 transition-colors uppercase tracking-wider">
                  {eventsList[currentEventIndex].date}
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-main-light)] dark:text-white mb-2 transition-colors line-clamp-1">
                  {eventsList[currentEventIndex].title}
                </h3>
                <p className="text-sm font-medium text-[var(--text-light-light)] dark:text-slate-400 mb-4 flex items-center gap-1">
                  <MapPin size={14}/> {eventsList[currentEventIndex].location} • {eventsList[currentEventIndex].organizer}
                </p>
                <p className="text-[var(--text-muted-light)] dark:text-slate-300 line-clamp-3 mb-6">
                  {eventsList[currentEventIndex].desc}
                </p>
                <span className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)] font-bold flex items-center gap-1 mt-auto group-hover/tile:gap-2 transition-all">
                  Read Full Experience <ChevronRight size={18} />
                </span>
              </div>
            </div>

            {eventsList.length > 1 && (
              <button 
                onClick={nextEvent} 
                className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-[var(--bg-card)] p-3 rounded-full shadow-lg text-[var(--c-primary-text)] dark:text-[var(--c-primary)] border border-[var(--border-light)] dark:border-[var(--border-dark)] hover:scale-110 transition-transform"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => setShowAllEventsModal(true)} 
              className="bg-transparent border-2 border-[var(--c-primary-text)] dark:border-[var(--c-primary)] text-[var(--c-primary-text)] dark:text-[var(--c-primary)] hover:bg-[var(--c-primary)] hover:border-[var(--c-primary)] hover:text-[var(--btn-text)] dark:hover:bg-[var(--c-primary)] dark:hover:text-[var(--btn-text)] px-8 py-3 rounded-xl font-bold transition-colors"
            >
              View all events
            </button>
          </div>
        </motion.div>
      </section>

      {/* ALL EVENTS MODAL */}
      <AnimatePresence>
        {showAllEventsModal && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/80 dark:bg-[var(--bg-main)]/90 backdrop-blur-sm"
            onClick={() => setShowAllEventsModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="bg-white dark:bg-[var(--bg-main)] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-colors duration-300 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] sticky top-0 bg-white dark:bg-[var(--bg-main)] z-10 transition-colors">
                <h3 className="font-bold text-2xl text-[var(--text-main-light)] dark:text-white flex items-center gap-3">
                  <CalendarDays className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)]"/> All Events
                </h3>
                <button onClick={() => setShowAllEventsModal(false)} className="text-[var(--text-light-light)] hover:text-[var(--text-main-light)] dark:text-slate-400 dark:hover:text-white bg-[var(--border-light-subtle)] dark:bg-[var(--bg-card)] p-2.5 rounded-full transition-colors shadow-sm"><X size={20} /></button>
              </div>
              <div className="p-6 bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card-alpha)] transition-colors flex-1">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventsList.map((event, idx) => (
                    <div key={idx} onClick={() => openEventDetails(event)} className="bg-white dark:bg-[var(--bg-card)] border border-[var(--border-light)] dark:border-[var(--border-dark)] rounded-2xl overflow-hidden cursor-pointer hover:border-[var(--c-primary-text)] dark:hover:border-[var(--c-primary)] hover:shadow-xl transition-all group">
                      <div className="h-40 bg-[var(--border-light)] dark:bg-[var(--border-light)] relative overflow-hidden">
                        <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-[var(--text-main-light)] dark:text-white mb-2 line-clamp-1">{event.title}</h4>
                        <p className="text-xs font-medium text-[var(--text-light-light)] dark:text-slate-400 mb-3">{event.date} • {event.location}</p>
                        <p className="text-sm text-[var(--text-muted-light)] dark:text-slate-300 line-clamp-2">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED EVENT MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center px-4 bg-slate-900/90 dark:bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }} 
              className="bg-white dark:bg-[var(--bg-main)] w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl transition-colors duration-300 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              
              <div className="flex justify-between items-center p-6 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] sticky top-0 bg-white dark:bg-[var(--bg-main)] z-20 transition-colors">
                <div>
                  <h3 className="font-bold text-xl md:text-2xl text-[var(--text-main-light)] dark:text-white">{selectedEvent.title}</h3>
                  <p className="text-sm font-medium text-[var(--c-primary-text)] dark:text-[var(--c-primary)] mt-1">{selectedEvent.date} • {selectedEvent.location}</p>
                </div>
                
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <button 
                    onClick={() => {
                      const eventSlug = selectedEvent.title.replace(/\s+/g, '-');
                      handleShare(
                        `Ajay's Experience: ${selectedEvent.title}`, 
                        `Read about Ajay's experience at the ${selectedEvent.title}!`,
                        `${window.location.origin}/?event=${eventSlug}`
                      );
                    }} 
                    className="text-[var(--text-light-light)] hover:text-[var(--c-primary-text)] dark:text-slate-500 dark:hover:text-[var(--c-primary)] bg-[var(--border-light-subtle)] dark:bg-[var(--bg-card)] hover:bg-[var(--border-light)] dark:hover:bg-[var(--border-dark)] p-2.5 rounded-full transition-all" 
                    title="Share Event"
                  >
                    <Share2 size={20} />
                  </button>
                  <button 
                    onClick={() => setSelectedEvent(null)} 
                    className="text-[var(--text-light-light)] hover:text-[var(--text-main-light)] dark:text-slate-400 dark:hover:text-white bg-[var(--border-light-subtle)] dark:bg-[var(--bg-card)] hover:bg-[var(--border-light)] p-2.5 rounded-full transition-colors shadow-sm" 
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="relative w-full h-64 md:h-[28rem] bg-[var(--border-light-subtle)] dark:bg-black/40 flex items-center justify-center border-b border-[var(--border-light)] dark:border-[var(--border-dark)]">
                  <img src={selectedEvent.images[currentImageIndex]} alt="Event Photo" className="max-h-full max-w-full object-contain" />
                  
                  {selectedEvent.images.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors">
                        <ChevronLeft size={24} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors">
                        <ChevronRight size={24} />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        {currentImageIndex + 1} / {selectedEvent.images.length}
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 md:p-8 bg-white dark:bg-[var(--bg-main)] transition-colors">
                  <div className="bg-[var(--border-light-subtle)] dark:bg-[var(--bg-card-alpha)] p-6 rounded-2xl border border-[var(--border-light)] dark:border-[var(--border-dark)]">
                    <h4 className="text-xs font-bold text-[var(--text-light-light)] dark:text-slate-400 uppercase tracking-wider mb-4">Experience Overview</h4>
                    <p className="whitespace-pre-wrap text-[var(--text-muted-light)] dark:text-slate-300 leading-relaxed text-[0.95rem]">
                      {selectedEvent.desc}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. CERTIFICATIONS */}
      <section id="certifications" className="py-24 px-6 bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card)] transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[var(--text-main-light)] dark:text-white flex items-center justify-center gap-3 transition-colors">
            <Award className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)]" /> Featured Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.slice(0, 6).map((cert, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedCert(cert)} 
                className="bg-white dark:bg-[var(--bg-main-alpha)] border border-[var(--border-light)] dark:border-[var(--border-dark)] rounded-2xl overflow-hidden cursor-pointer hover:border-[var(--c-primary-text)] dark:hover:border-[var(--c-primary)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="h-48 relative overflow-hidden border-b border-[var(--border-light)] dark:border-[var(--border-dark)] bg-[var(--border-light-subtle)] dark:bg-[var(--bg-card)]">
                  <img 
                    src={cert.img} 
                    alt={cert.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-[var(--text-main-light)] dark:text-white text-center line-clamp-2 group-hover:text-[var(--c-primary-text)] dark:group-hover:text-[var(--c-primary)] transition-colors">
                    {cert.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => setShowAllCertsModal(true)} 
              className="bg-transparent border-2 border-[var(--c-primary-text)] dark:border-[var(--c-primary)] text-[var(--c-primary-text)] dark:text-[var(--c-primary)] hover:bg-[var(--c-primary)] hover:border-[var(--c-primary)] hover:text-[var(--btn-text)] dark:hover:bg-[var(--c-primary)] dark:hover:text-[var(--btn-text)] px-8 py-3 rounded-xl font-bold transition-colors shadow-sm"
            >
              View all certificates
            </button>
          </div>
        </motion.div>
      </section>

      {/* ALL CERTIFICATES MODAL */}
      <AnimatePresence>
        {showAllCertsModal && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-slate-900/80 dark:bg-[var(--bg-main)]/90 backdrop-blur-sm"
            onClick={() => setShowAllCertsModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="bg-white dark:bg-[var(--bg-main)] w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-colors duration-300 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] sticky top-0 bg-white dark:bg-[var(--bg-main)] z-10 transition-colors">
                <h3 className="font-bold text-2xl text-[var(--text-main-light)] dark:text-white flex items-center gap-3">
                  <Award className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)]"/> All Certifications
                </h3>
                <button 
                  onClick={() => setShowAllCertsModal(false)} 
                  className="text-[var(--text-light-light)] hover:text-[var(--text-main-light)] dark:text-slate-400 dark:hover:text-white bg-[var(--border-light-subtle)] dark:bg-[var(--bg-card)] p-2.5 rounded-full transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card-alpha)] transition-colors flex-1">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certifications.map((cert, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedCert(cert)} 
                      className="group bg-white dark:bg-[var(--bg-card)] border border-[var(--border-light)] dark:border-[var(--border-dark)] p-6 rounded-2xl cursor-pointer hover:border-[var(--c-primary-text)] dark:hover:border-[var(--c-primary)] hover:shadow-xl hover:shadow-[var(--c-shadow-sm)] transition-all flex flex-col h-full"
                    >
                      <div className="w-12 h-12 bg-[var(--bg-base-light)] dark:bg-[var(--c-primary-alpha)] text-[var(--c-primary-text)] dark:text-[var(--c-primary)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shrink-0">
                        <Award size={24} />
                      </div>
                      <h3 className="font-bold text-[var(--text-main-light)] dark:text-white mb-2 flex-1 transition-colors">{cert.title}</h3>
                      <p className="text-sm text-[var(--text-muted-light)] dark:text-slate-400 flex flex-col mt-auto pt-4 border-t border-[var(--border-light)] dark:border-[var(--border-light)] transition-colors">
                        <span className="font-medium text-[var(--text-main-light)] dark:text-slate-300 mb-1">{cert.issuer}</span>
                        <span className="flex items-center gap-1 text-xs">
                          {cert.date} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform ml-auto text-[var(--c-primary-text)] dark:text-[var(--c-primary)]"/>
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED CERTIFICATION MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div 
            className="fixed inset-0 z-[70] flex items-center justify-center px-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white dark:bg-[var(--bg-main)] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] sticky top-0 bg-white dark:bg-[var(--bg-main)] z-10 transition-colors">
                <h3 className="font-bold text-xl text-[var(--text-main-light)] dark:text-white pr-8">{selectedCert.title}</h3>
                <button 
                  onClick={() => setSelectedCert(null)} 
                  className="text-[var(--text-light-light)] hover:text-[var(--text-main-light)] dark:text-slate-400 dark:hover:text-white bg-[var(--border-light-subtle)] dark:bg-[var(--bg-card)] p-2.5 rounded-full transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card-alpha)] transition-colors">
                <div className="w-full bg-[var(--bg-base-light)] dark:bg-[var(--bg-card)] rounded-xl mb-6 flex items-center justify-center overflow-hidden shadow-inner border border-[var(--border-light)] dark:border-[var(--border-dark)] transition-colors">
                  <img src={selectedCert.img} alt={selectedCert.title} className="w-full h-auto object-contain max-h-[50vh]" />
                </div>
                
                <div className="bg-white dark:bg-[var(--bg-main)] p-5 rounded-xl border border-[var(--border-light)] dark:border-[var(--border-dark)] transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-[var(--text-light-light)] dark:text-slate-400 uppercase tracking-wider">Description</h4>
                    <span className="text-xs font-medium text-[var(--c-primary-text)] bg-[var(--bg-base-light)] dark:bg-[var(--c-primary-alpha)] dark:text-[var(--c-primary)] px-2 py-1 rounded-md">{selectedCert.date}</span>
                  </div>
                  <p className="text-[var(--text-muted-light)] dark:text-slate-300 leading-relaxed transition-colors text-sm">
                    {selectedCert.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-[var(--bg-base-light)] dark:bg-[var(--bg-main)] transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-[var(--text-main-light)] dark:text-white transition-colors">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-[var(--bg-alt-light)] dark:bg-[var(--bg-main-alpha)] rounded-3xl p-8 shadow-sm border border-[var(--border-light)] dark:border-[var(--border-dark)] flex flex-col h-full hover:-translate-y-2 transition-all duration-300">
                <div className="text-xs font-bold text-[var(--c-primary-text)] dark:text-[var(--c-primary)] bg-white dark:bg-[var(--c-primary-alpha)] inline-block px-3 py-1 rounded-full w-fit mb-4 transition-colors">
                  {project.domain}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main-light)] dark:text-white mb-3 transition-colors">{project.title}</h3>
                <p className="text-[var(--text-muted-light)] dark:text-slate-300 mb-6 flex-1 text-sm leading-relaxed transition-colors">{project.desc}</p>
                <div className="pt-6 border-t border-[var(--border-light)] dark:border-[var(--border-light)] mt-auto transition-colors">
                  <p className="text-xs text-[var(--text-light-light)] dark:text-slate-500 font-medium mb-4">Technologies Used: <span className="text-[var(--text-muted-light)] dark:text-slate-300">{project.tech}</span></p>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-white dark:bg-[var(--bg-card)] hover:bg-[var(--c-primary)] dark:hover:bg-[var(--c-primary)] hover:text-[var(--btn-text)] hover:border-[var(--c-primary)] text-[var(--text-muted-light)] dark:text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors border border-[var(--border-light)] dark:border-[var(--border-dark)]">
                    <GithubIcon size={16} /> View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 7 & 8. JOURNEYS */}
      <section id="journeys" className="py-24 px-6 bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card)] transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-8 text-[var(--text-main-light)] dark:text-white flex items-center gap-3 transition-colors">
                <Route className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)]" /> ServiceNow Journey
              </h2>
              <div className="bg-white dark:bg-[var(--bg-main-alpha)] p-8 rounded-3xl border border-[var(--border-light)] dark:border-[var(--border-dark)] relative transition-colors">
                <div className="absolute left-[2.3rem] top-12 bottom-12 w-0.5 bg-[var(--c-gradient-end)] dark:bg-[var(--c-dark-alpha)]"></div>
                <ul className="space-y-6 relative">
                  {serviceNowJourney.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full border-4 border-white dark:border-[var(--bg-main)] shadow flex items-center justify-center shrink-0 z-10 transition-colors ${idx === 3 || idx === 4 ? 'bg-[var(--c-hover)]' : 'bg-[var(--c-primary)]'}`}>
                        <CheckCircle2 size={14} className={`transition-colors ${appTheme === 'servicenow' ? 'text-[var(--btn-text)]' : 'text-white'}`} />
                      </div>
                      <div className="pt-1">
                        <p className={`font-medium transition-colors ${idx === 3 || idx === 4 ? 'text-[var(--c-primary-text)] dark:text-[var(--c-primary)] font-bold' : 'text-[var(--text-muted-light)] dark:text-slate-300'}`}>{step}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-8 text-[var(--text-main-light)] dark:text-white flex items-center gap-3 transition-colors">
                <Cloud className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)]" /> Cloud & AI Learning Journey
              </h2>
              <div className="space-y-6">
                {cloudAiJourney.map((path, idx) => (
                  <div key={idx} className="bg-white dark:bg-[var(--bg-main-alpha)] p-6 rounded-3xl border border-[var(--border-light)] dark:border-[var(--border-dark)] shadow-sm transition-colors">
                    <h3 className="font-bold text-lg text-[var(--c-primary-text)] dark:text-[var(--c-primary)] mb-4 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] pb-3 transition-colors">{path.category}</h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {path.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--text-muted-light)] dark:text-slate-300 text-sm transition-colors">
                          <ChevronRight size={16} className="text-[var(--c-primary-text)] dark:text-[var(--c-primary)] shrink-0 mt-0.5" />
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
      <section className="py-16 px-6 bg-[var(--c-primary)] dark:bg-[var(--bg-main)] text-[var(--btn-text)] dark:text-white border-y border-[var(--c-primary-text)] dark:border-[var(--border-dark)] transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div><div className="text-3xl font-bold mb-2 dark:text-[var(--c-primary)]">20+</div><div className="dark:text-slate-400 text-xs font-medium uppercase tracking-wide opacity-80 dark:opacity-100">Certifications</div></div>
          <div><div className="text-3xl font-bold mb-2 flex justify-center dark:text-[var(--c-primary)]"><CheckCircle2 size={36}/></div><div className="dark:text-slate-400 text-xs font-medium uppercase tracking-wide opacity-80 dark:opacity-100">ServiceNow CSA Certified</div></div>
          <div><div className="text-3xl font-bold mb-2 flex justify-center dark:text-[var(--c-primary)]"><Cloud size={36}/></div><div className="dark:text-slate-400 text-xs font-medium uppercase tracking-wide opacity-80 dark:opacity-100">Cloud Certifications</div></div>
          <div><div className="text-3xl font-bold mb-2 flex justify-center dark:text-[var(--c-primary)]"><Database size={36}/></div><div className="dark:text-slate-400 text-xs font-medium uppercase tracking-wide opacity-80 dark:opacity-100">AI & Data Analytics</div></div>
        </div>
      </section>

      {/* 10 & 11. CONTACT & OBJECTIVE */}
      <section id="contact" className="py-24 px-6 bg-[var(--bg-base-light)] dark:bg-[var(--bg-main)] transition-colors duration-300">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          
          <div className="mb-16 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-bold text-[var(--c-primary-text)] dark:text-[var(--c-primary)] uppercase tracking-widest mb-4 transition-colors">Career Objective</h2>
            <p className="text-2xl text-[var(--text-muted-light)] dark:text-slate-300 font-medium leading-relaxed transition-colors">
              "I aim to build a successful career in ServiceNow and Software Development by continuously learning, solving real-world problems, and contributing to innovative enterprise solutions."
            </p>
          </div>
          
          <div className="bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card-alpha)] rounded-3xl p-8 md:p-12 border border-[var(--border-light)] dark:border-[var(--border-dark)] shadow-sm grid md:grid-cols-2 gap-12 transition-colors">
            
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[var(--text-main-light)] dark:text-white transition-colors">Contact</h2>
              <p className="text-[var(--text-light-light)] dark:text-slate-400 mb-8 transition-colors">Feel free to reach out for collaborations, opportunities, or just a quick chat.</p>
              
              <div className="space-y-6">
                <a href="mailto:ajayy.infotechh@gmail.com" className="flex items-center gap-4 text-[var(--text-muted-light)] dark:text-slate-300 hover:text-[var(--c-primary-text)] dark:hover:text-[var(--c-primary)] transition-colors group">
                  <div className="w-12 h-12 bg-white dark:bg-[var(--c-primary-alpha)] rounded-full flex items-center justify-center text-[var(--c-primary-text)] dark:text-[var(--c-primary)] group-hover:bg-[var(--c-primary)] group-hover:text-[var(--btn-text)] transition-colors border border-[var(--border-light)] dark:border-transparent"><Mail size={20} /></div>
                  <div><p className="text-sm text-[var(--text-light-light)] dark:text-slate-400">Email</p><p className="font-medium">ajayy.infotechh@gmail.com</p></div>
                </a>
                
                <a href="http://www.linkedin.com/in/ajay-r-s" target="_blank" className="flex items-center gap-4 text-[var(--text-muted-light)] dark:text-slate-300 hover:text-[var(--c-primary-text)] dark:hover:text-[var(--c-primary)] transition-colors group">
                  <div className="w-12 h-12 bg-white dark:bg-[var(--c-primary-alpha)] rounded-full flex items-center justify-center text-[var(--c-primary-text)] dark:text-[var(--c-primary)] group-hover:bg-[var(--c-primary)] group-hover:text-[var(--btn-text)] transition-colors border border-[var(--border-light)] dark:border-transparent"><LinkedinIcon size={20} /></div>
                  <div><p className="text-sm text-[var(--text-light-light)] dark:text-slate-400">LinkedIn</p><p className="font-medium">www.linkedin.com/in/ajay-r-s</p></div>
                </a>

                <div className="flex items-center gap-4 text-[var(--text-muted-light)] dark:text-slate-300 transition-colors">
                  <div className="w-12 h-12 bg-[var(--border-light-subtle)] dark:bg-[var(--border-light)] rounded-full flex items-center justify-center text-[var(--text-light-light)] dark:text-slate-300 transition-colors border border-[var(--border-light)] dark:border-transparent"><MapPin size={20} /></div>
                  <div><p className="text-sm text-[var(--text-light-light)] dark:text-slate-400">Location</p><p className="font-medium">Tiruchirappalli, Tamil Nadu, India</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--bg-main)] p-6 md:p-8 rounded-2xl border border-[var(--border-light)] dark:border-[var(--border-dark)] transition-colors">
              <h3 className="font-bold text-lg mb-4 text-[var(--text-main-light)] dark:text-white transition-colors">Send a Message</h3>
              
              {submitStatus === 'success' ? (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 dark:bg-[var(--c-primary-alpha)] border border-green-200 dark:border-[var(--c-primary-alpha-border)] text-[var(--c-primary-text)] dark:text-[var(--c-primary)] p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-3 transition-colors">
                  <div className="w-12 h-12 bg-[var(--bg-base-light)] dark:bg-[var(--c-primary-alpha)] rounded-full flex items-center justify-center text-[var(--c-primary-text)] dark:text-[var(--c-primary)] transition-colors border border-[var(--border-light)] dark:border-transparent">
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
                    <input type="text" name="name" required placeholder="Your Name" disabled={isSubmitting} className="w-full bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card)] border border-[var(--border-light)] dark:border-[var(--border-dark)] dark:text-white text-[var(--text-main-light)] placeholder-[var(--text-light-light)] dark:placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--c-primary-text)] dark:focus:border-[var(--c-primary)] focus:ring-1 focus:ring-[var(--c-primary-text)] dark:focus:ring-[var(--c-primary)] transition-all disabled:opacity-50" />
                  </div>
                  <div>
                    <input type="email" name="email" required placeholder="Your Email" disabled={isSubmitting} className="w-full bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card)] border border-[var(--border-light)] dark:border-[var(--border-dark)] dark:text-white text-[var(--text-main-light)] placeholder-[var(--text-light-light)] dark:placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--c-primary-text)] dark:focus:border-[var(--c-primary)] focus:ring-1 focus:ring-[var(--c-primary-text)] dark:focus:ring-[var(--c-primary)] transition-all disabled:opacity-50" />
                  </div>
                  <div>
                    <textarea name="message" required placeholder="Your Message" rows={4} disabled={isSubmitting} className="w-full bg-[var(--bg-alt-light)] dark:bg-[var(--bg-card)] border border-[var(--border-light)] dark:border-[var(--border-dark)] dark:text-white text-[var(--text-main-light)] placeholder-[var(--text-light-light)] dark:placeholder-slate-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--c-primary-text)] dark:focus:border-[var(--c-primary)] focus:ring-1 focus:ring-[var(--c-primary-text)] dark:focus:ring-[var(--c-primary)] transition-all resize-none disabled:opacity-50"></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[var(--c-primary)] hover:bg-[var(--c-hover)] text-[var(--btn-text)] py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[var(--btn-text)]/30 border-t-[var(--btn-text)] rounded-full animate-spin" />
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
      <footer className="bg-slate-900 dark:bg-[#00171C] text-slate-400 py-12 text-center border-t border-slate-800 dark:border-[var(--border-dark)] transition-colors duration-300">
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