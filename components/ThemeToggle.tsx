'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevents hydration mismatch errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 bg-[var(--c-hover)]/50 p-1 rounded-xl border border-[var(--c-primary)]">
      <button 
        onClick={() => setTheme('light')} 
        className={`p-1.5 rounded-lg transition-all ${theme === 'light' ? 'bg-white text-[var(--c-primary)] shadow-sm' : 'text-white/70 hover:text-white'}`}
        aria-label="Light Mode"
      >
        <Sun size={16} />
      </button>
      
      <button 
        onClick={() => setTheme('system')} 
        className={`p-1.5 rounded-lg transition-all ${theme === 'system' ? 'bg-white text-[var(--c-primary)] shadow-sm' : 'text-white/70 hover:text-white'}`}
        aria-label="System Theme"
      >
        <Monitor size={16} />
      </button>

      <button 
        onClick={() => setTheme('dark')} 
        className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-white text-[var(--c-primary)] shadow-sm' : 'text-white/70 hover:text-white'}`}
        aria-label="Dark Mode"
      >
        <Moon size={16} />
      </button>
    </div>
  );
}