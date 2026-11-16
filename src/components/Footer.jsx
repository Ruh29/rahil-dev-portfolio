import React from "react";

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Tech Stack", id: "tech-stack" },
    { name: "Experience", id: "experience" },
    { name: "AI Chat", id: "ai-chat" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <footer className="w-full bg-black text-white relative z-50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tighter mb-1">
              RAHIL SHEIKH<span className="text-primary-500">.</span>
            </h2>
            <div className="text-slate-400 font-medium text-sm mb-2">
              Full Stack Developer
            </div>
            <p className="text-slate-500 text-xs italic">
              Architecting scalable, resilient web & mobile solutions.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {links.map((link, i) => (
              <button 
                key={i} 
                onClick={() => scrollTo(link.id)}
                className="text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold tracking-widest text-slate-600 uppercase">
          <div>© {new Date().getFullYear()} Rahil Sheikh</div>
          <div>All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}
