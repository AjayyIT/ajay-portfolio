'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, GraduationCap, Award, Code, Database, Cloud, 
  Terminal, Mail, ChevronRight, X, ExternalLink, Download, Menu
} from 'lucide-react';
import ChatWidget from '@/components/ChatWidget'; 

// --- FAIL-PROOF ICONS ---
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- DATA ARRAYS ---
const skills = [
  { category: "Programming", icon: <Code size={20}/>, items: [{ name: "Java", level: 85 }, { name: "Python", level: 80 }, { name: "C", level: 75 }] },
  { category: "Web Development", icon: <Terminal size={20}/>, items: [{ name: "HTML", level: 90 }, { name: "CSS", level: 85 }] },
  { category: "Database", icon: <Database size={20}/>, items: [{ name: "MySQL", level: 80 }] },
  { category: "Cloud", icon: <Cloud size={20}/>, items: [{ name: "AWS", level: 75 }, { name: "Microsoft Azure", level: 70 }] },
  { category: "ServiceNow", icon: <Briefcase size={20}/>, items: [{ name: "Administration", level: 90 }, { name: "Workflow Automation", level: 85 }, { name: "Incident Management", level: 85 }, { name: "Creator Studio", level: 80 }] },
  { category: "Data & AI", icon: <Cloud size={20}/>, items: [{ name: "Data Analytics", level: 75 }, { name: "Generative AI", level: 80 }, { name: "Prompt Engineering", level: 85 }] }
];

const projects = [
  { title: "Color Detection System", domain: "Data Mining Techniques", tech: "Python, Image Processing", desc: "Python-based project that detects colors and identifies the nearest matching color using image processing techniques." },
  { title: "Land Price Prediction System", domain: "Business Intelligence", tech: "Data Analytics, Predictive Modeling", desc: "Predictive analytics project that estimates land prices using data-driven methodologies." },
  { title: "Plant Disease Detection", domain: "Design Project", tech: "Machine Learning, Python", desc: "Technology-based solution for identifying plant diseases and assisting in agricultural monitoring." }
];

const certifications = [
  { title: "ServiceNow Certified System Administrator (CSA)", issuer: "ServiceNow", img: "/certificates/ServiceNow (CSA).jpg", desc: "Official CSA certification validating administration and configuration skills on the Now Platform." },
  { title: "Microsoft Azure Administrator Associate", issuer: "Simplilearn", img: "/certificates/SIMPLILEARN azure associate.jpg", desc: "Demonstrated skills in managing cloud services that span storage, security, networking, and compute." },
  { title: "AWS Solutions Architect Associate", issuer: "Simplilearn", img: "/certificates/SIMPLILEARN aws.jpg", desc: "Validated expertise in designing distributed systems on AWS." },
  { title: "Google AI Essentials", issuer: "Google", img: "/certificates/Google Ai Essentials.jpg", desc: "Core concepts of artificial intelligence and prompt engineering." }
];

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certificates', href: '#certifications' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

// --- MAIN COMPONENT ---
export default function Portfolio() {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] text-slate-800 font-sans selection:bg-[#0A66C2] selection:text-white">
      
      {/* HEADER / NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A66C2] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Name */}
            <a href="#home" className="font-bold text-2xl tracking-tight hover:text-blue-100 transition-colors">
              AJAY R S
            </a>
            
            {/* Desktop Navigation - Upgraded to Minimal Buttons */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-base font-medium px-4 py-2.5 rounded-lg hover:bg-[#004182] transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white hover:bg-[#004182] rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#004182] overflow-hidden shadow-inner"
            >
              <div className="px-6 py-4 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-base font-medium text-white px-4 py-3 rounded-lg hover:bg-black/20 transition-colors"
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
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-white px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F6F8]/50 to-white pointer-events-none" />
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              Ajay R S
            </h1>
            <h2 className="text-xl md:text-2xl text-[#0A66C2] font-semibold mb-6">
              Final Year IT Student | ServiceNow CSA Certified
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Passionate about ServiceNow, Software Development, Cloud Computing, Artificial Intelligence, and Data Analytics. Continuously learning and building practical skills through projects, certifications, and hands-on experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-3 rounded-full font-medium transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2">
                <Mail size={18} /> Contact Me
              </a>
              <a href="/resume.pdf" download className="bg-white hover:bg-slate-50 text-[#0A66C2] border border-[#0A66C2] px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
                <Download size={18} /> Resume
              </a>
              <div className="flex items-center gap-4 ml-2">
                <a href="http://www.linkedin.com/in/ajay-r-s" target="_blank" className="text-slate-400 hover:text-[#0A66C2] transition-colors"><LinkedinIcon size={24} /></a>
                <a href="https://github.com/AjayyIT" target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors"><GithubIcon size={24} /></a>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            {/* Professional Photo Placeholder */}
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[#0A66C2] to-blue-300 p-2 shadow-2xl mt-12 md:mt-0">
              <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-slate-200 flex items-center justify-center">
                <span className="text-slate-400 font-medium text-center px-4">Professional Photo<br/>(Link to /photo.jpg)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT ME */}
      <section id="about" className="py-24 px-6 bg-[#F3F6F8] scroll-mt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">About Me</h2>
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-left">
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              I am a Final Year Bachelor of Technology student in Information Technology with interests in Software Development, ServiceNow, Cloud Computing, and Artificial Intelligence. I enjoy building practical projects, exploring emerging technologies, and continuously improving my technical skills.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              I have worked on academic and personal projects using Java, Python, MySQL, HTML, CSS, and ServiceNow. My goal is to build a successful career in enterprise technologies and software development while contributing to impactful solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Final Year Student', 'ServiceNow CSA', 'CAD Prep in Progress', 'Cloud & AI Enthusiast'].map((badge, i) => (
                <div key={i} className="bg-blue-50 text-[#0A66C2] px-4 py-3 rounded-xl text-sm font-semibold text-center border border-blue-100">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. EDUCATION */}
      <section id="education" className="py-24 px-6 bg-white scroll-mt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 flex items-center justify-center gap-3">
            <GraduationCap className="text-[#0A66C2]" /> Education
          </h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#0A66C2] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <GraduationCap size={16} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="text-[#0A66C2] font-bold text-sm mb-1">2023 - 2027 (Pursuing)</div>
                <h3 className="font-bold text-lg text-slate-900">B.Tech Information Technology</h3>
                <p className="text-slate-500">K. Ramakrishnan College of Technology</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-slate-500 font-bold text-sm mb-1">2022 - 2023</div>
                <h3 className="font-bold text-lg text-slate-900">Higher Secondary (HSLC)</h3>
                <p className="text-slate-500">Sribala Vidya Mandhir Matric Hr. Sec. School</p>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 4. SKILLS */}
      <section id="skills" className="py-24 px-6 bg-[#F3F6F8] scroll-mt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Technical Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6 text-[#0A66C2] font-semibold border-b border-slate-100 pb-4">
                  {skillGroup.icon} <span>{skillGroup.category}</span>
                </div>
                <div className="space-y-4">
                  {skillGroup.items.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                        <span>{skill.name}</span>
                        <span className="text-slate-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-[#0A66C2] h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. CERTIFICATIONS WITH MODAL */}
      <section id="certifications" className="py-24 px-6 bg-white scroll-mt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 flex items-center justify-center gap-3">
            <Award className="text-[#0A66C2]" /> Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedCert(cert)}
                className="group bg-white border border-slate-200 p-6 rounded-2xl cursor-pointer hover:border-[#0A66C2] hover:shadow-xl hover:shadow-blue-500/10 transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 text-[#0A66C2] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{cert.title}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  {cert.issuer} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CERTIFICATION MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <h3 className="font-bold text-xl text-slate-900">{selectedCert.title}</h3>
                <button onClick={() => setSelectedCert(null)} className="text-slate-400 hover:text-slate-900 bg-slate-100 p-2 rounded-full transition-colors"><X size={20} /></button>
              </div>
              <div className="p-6 bg-slate-50">
                <div className="w-full aspect-video bg-slate-200 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <span className="text-slate-500 font-medium text-center">Certificate Image Placeholder<br/>(Link to /certificates/...)</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-slate-700">{selectedCert.desc}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-[#F3F6F8] scroll-mt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="text-xs font-bold text-[#0A66C2] bg-blue-50 inline-block px-3 py-1 rounded-full w-fit mb-4">
                  {project.domain}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 mb-6 flex-1 text-sm leading-relaxed">{project.desc}</p>
                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <p className="text-xs text-slate-400 font-medium mb-4">TECH: {project.tech}</p>
                  <button className="w-full py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm flex items-center justify-center gap-2 transition-colors border border-slate-200">
                    <GithubIcon size={16} /> View Source
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 9. ACHIEVEMENTS STATS */}
      <section className="py-16 px-6 bg-[#0A66C2] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="text-4xl font-bold mb-2">20+</div><div className="text-blue-200 text-sm font-medium">Certifications</div></div>
          <div><div className="text-4xl font-bold mb-2">CSA</div><div className="text-blue-200 text-sm font-medium">ServiceNow Certified</div></div>
          <div><div className="text-4xl font-bold mb-2">5+</div><div className="text-blue-200 text-sm font-medium">Technical Projects</div></div>
          <div><div className="text-4xl font-bold mb-2">IT</div><div className="text-blue-200 text-sm font-medium">B.Tech Final Year</div></div>
        </div>
      </section>

      {/* 11. CONTACT & OBJECTIVE */}
      <section id="contact" className="py-24 px-6 bg-white scroll-mt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-sm font-bold text-[#0A66C2] uppercase tracking-widest mb-4">Career Objective</h2>
            <p className="text-2xl text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto">
              "I aim to build a successful career in ServiceNow and Software Development by continuously learning, solving real-world problems, and contributing to innovative enterprise solutions."
            </p>
          </div>
          
          <div className="bg-[#F3F6F8] rounded-3xl p-8 md:p-12 border border-slate-200">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Let's Connect</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              <a href="mailto:ajayy.infotechh@gmail.com" className="flex items-center justify-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-slate-700 font-medium">
                <Mail className="text-[#0A66C2]" /> ajayy.infotechh@gmail.com
              </a>
              <a href="http://www.linkedin.com/in/ajay-r-s" target="_blank" className="flex items-center justify-center gap-3 bg-[#0A66C2] px-6 py-4 rounded-2xl shadow-sm hover:shadow-md hover:bg-[#004182] transition-all text-white font-medium">
                <LinkedinIcon /> LinkedIn Profile
              </a>
            </div>
            <p className="text-slate-500">Based in Tiruchirappalli, Tamil Nadu, India</p>
          </div>
        </motion.div>
      </section>

      {/* 12. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
        <p className="mb-2">© 2026 Ajay R S. All Rights Reserved.</p>
        <p className="text-slate-500">Built with passion for technology and continuous learning.</p>
      </footer>

      <ChatWidget />
      
    </div>
  );
}