'use client';

import { Canvas } from '@react-three/fiber';
import Background3D from '../components/Background3D';

import ChatWidget from '../components/ChatWidget';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen text-white selection:bg-blue-500 selection:text-white">
      
      {/* 1. The Fixed 3D Background Effect */}
      <div className="fixed inset-0 z-[-1] bg-gray-950">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Background3D />
        </Canvas>
      </div>

      {/* 2. The Scrollable Content */}
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center py-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-widest">AJAY.RS</h1>
          <ul className="flex space-x-8 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">About</li>
            <li className="hover:text-white cursor-pointer transition-colors">Projects</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
          </ul>
        </nav>

        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col justify-center items-start">
          <p className="text-blue-400 font-mono mb-4">Hello, my name is</p>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            Ajay RS.
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-gray-400 mb-6">
            I build things for the cloud.
          </h3>
          <p className="max-w-xl text-gray-400 text-lg mb-10 leading-relaxed">
            I am a software developer and IT student specializing in building exceptional digital experiences, 
            cloud architectures on AWS/Azure, and integrating AI models.
          </p>
          <button className="px-8 py-4 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded font-mono transition-all">
            Check out my work!
          </button>
        </section>

        {/* About Section */}
        <section className="min-h-screen py-20 border-t border-white/10" id="about">
          <h3 className="text-3xl font-bold mb-8">01. About Me</h3>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl max-w-3xl mb-12">
            <p className="text-gray-300 leading-relaxed mb-4">
              I am currently pursuing my Bachelor of Technology in Information Technology. My core focus lies in enterprise cloud architecture, specifically leveraging Amazon Web Services and Microsoft Azure frameworks to build scalable systems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Beyond traditional cloud infrastructure, I am deeply involved in Artificial Intelligence. From building Retrieval-Augmented Generation (RAG) pipelines using LangChain to running multi-hour local model training epochs on personal hardware, I enjoy bridging the gap between raw data and intelligent applications.
            </p>
          </div>

          <h3 className="text-3xl font-bold mb-8">02. Recent Work & Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            
            {/* Project 1 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <h4 className="text-xl font-bold text-blue-400 mb-2">ServiceNow Student Data Management</h4>
              <p className="text-sm text-gray-400 mb-4">
                Engineered a structured database project for student data management within ServiceNow, involving complex table configurations and custom choice field implementations.
              </p>
            </div>

            {/* Project 2 */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <h4 className="text-xl font-bold text-blue-400 mb-2">Elytespark Innovation Internship</h4>
              <p className="text-sm text-gray-400 mb-4">
                Selected for a remote internship program focusing on modern development practices, applying full-stack capabilities to real-world operational challenges.
              </p>
            </div>

          </div>
        </section>

      </div>
      <ChatWidget />
    </main>
  );
}