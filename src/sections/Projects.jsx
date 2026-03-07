import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, PlayCircle, X, Code, Layout, Smartphone, Database, Cpu, ShoppingCart } from 'lucide-react';
import Magnetic from '../components/Magnetic';

const projects = [
  {
    title: 'Hospital Management System (HMS)',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    video: 'https://cdn.pixabay.com/vimeo/327334707/medics-23366.mp4?width=1280&hash=07f0f6c2f1c8e1a6',
    tags: ['Next.js', 'Nest.js', 'PostgreSQL'],
    live: 'https://hms.purpleskyinfotech.com/login',
    description: 'A comprehensive medical ERP designed to streamline clinical workflows, patient records, and pharmacy management. Built with a focus on high availability and data integrity.',
    accent: '#3B82F6',
    code: `const clinic = await CRM.init({
  database: 'PostgreSQL',
  auth: 'JWT'
});`,
    featured: true,
  },
  {
    title: 'Flipkart Clone (E-commerce)',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    video: 'https://cdn.pixabay.com/vimeo/147115810/videoplayback.mp4?width=1280&hash=3e8b4e5f',
    tags: ['React', 'Redux', 'Node.js'],
    live: '#',
    github: '#',
    accent: '#FFB800', // Flipkart Yellow Pulse
    code: `export const addToCart = (product) => {
  return dispatch({
    type: 'CART_ADD',
    payload: product
  });
};`,
    description: 'A high-performance e-commerce engine with real-time inventory sync, complex filtering, and a seamless checkout experience inspired by Flipkart.',
    featured: true,
  },
  {
    title: 'Netflix Clone',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=800',
    video: 'https://cdn.pixabay.com/vimeo/147115810/videoplayback.mp4?width=1280&hash=3e8b4e5f',
    tags: ['React', 'Firebase', 'TMDB API'],
    live: '#',
    github: '#',
    accent: '#E50914', // Netflix Red Pulse
    code: `const fetchMovies = async (url) => {
  const res = await axios.get(url);
  return res.data.results;
};`,
    description: 'A high-fidelity Netflix replica featuring dynamic hero banners, category sliders, and a fully integrated video player streaming content from TMDB.',
  },
  {
    title: 'ShopEasy (E-commerce)',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800',
    video: 'https://cdn.pixabay.com/vimeo/327334707/medics-23366.mp4?width=1280&hash=07f0f6c2f1c8e1a6',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    live: 'https://shopeasyecommerce0.netlify.app/',
    github: '#',
    accent: '#FFFFFF',
    code: `const shop = await ShopEasy.init({
  payment: 'Stripe',
  auth: 'OAuth'
});`,
    description: 'A modern e-commerce platform with a focus on ease of use, featuring seamless checkout and product management.',
  },
];

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);

  // High-end 3D transforms
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setShowCode(false);

    // ONLY Reset accent color if modal is NOT open
    if (!isModalOpen) {
      document.documentElement.style.setProperty('--accent-color', '#4f46e5');
      document.documentElement.style.setProperty('--accent-glow', 'rgba(79, 70, 229, 0.4)');
      document.documentElement.style.setProperty('--accent-contrast', '#ffffff');
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Dynamic Accent Color Pulse
    document.documentElement.style.setProperty('--accent-color', project.accent);
    document.documentElement.style.setProperty('--accent-glow', `${project.accent}66`);
    const isWhite = project.accent.toUpperCase() === '#FFFFFF';
    document.documentElement.style.setProperty('--accent-contrast', isWhite ? '#030014' : '#ffffff');

    setTimeout(() => {
      // Show code only if still hovered after 1s
      setIsHovered(prev => {
        if (prev) setShowCode(true);
        return prev;
      });
    }, 1000);
  };

  // Close modal handler to reset theme
  const closeModal = () => {
    setIsModalOpen(false);
    document.documentElement.style.setProperty('--accent-color', '#4f46e5');
    document.documentElement.style.setProperty('--accent-glow', 'rgba(79, 70, 229, 0.4)');
    document.documentElement.style.setProperty('--accent-contrast', '#ffffff');
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Ensure accent is applied on open
    document.documentElement.style.setProperty('--accent-color', project.accent);
    document.documentElement.style.setProperty('--accent-glow', `${project.accent}66`);
    const isWhite = project.accent.toUpperCase() === '#FFFFFF';
    document.documentElement.style.setProperty('--accent-contrast', isWhite ? '#030014' : '#ffffff');
  }

  const isWhiteAccent = project.accent.toUpperCase() === '#FFFFFF';
  const buttonTextColor = isWhiteAccent ? 'text-[#030014]' : 'text-white';

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
        className="group relative bg-[#030014]/85 border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--accent-color)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_30px_var(--accent-glow)] transition-all duration-500 cursor-pointer"
      >
        <div className="aspect-[16/10] overflow-hidden relative" style={{ transform: "translateZ(50px)" }}>
          {/* Static Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            animate={{ scale: isHovered ? 1.08 : 1, opacity: isHovered ? 0 : 1 }}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* Video Preview */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-90"></div>

          {/* Featured Tag */}
          {project.featured && (
            <div className="absolute top-3 right-3 bg-[var(--accent-color)]/20 backdrop-blur-md border border-[var(--accent-color)]/30 px-2 py-1 rounded-md text-[8px] uppercase font-stats font-bold tracking-widest text-white shadow-lg">
              Featured
            </div>
          )}

          {/* Code Reveal Overlay */}
          <AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm p-4 flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-2 text-[10px] text-gray-400 font-stats">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="ml-2 opacity-50">developer_reveal.js</span>
                </div>
                <pre className="text-[10px] font-stats text-[var(--accent-color)] overflow-hidden">
                  <code>{project.code}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 bg-[#030014]" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-sm font-bold mb-3 line-clamp-1 text-white/90 group-hover:text-[var(--accent-color)] transition-colors">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[8px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">{tag}</span>
            ))}
          </div>
          <div className="flex gap-2">
            {project.github && (
              <Magnetic strength={0.2}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-1.5 bg-[#110C2E]/60 border border-white/5 rounded-lg text-[10px] font-bold text-[#8E91B3] flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-all"
                >
                  <Github size={12} /> Github
                </a>
              </Magnetic>
            )}
            {project.live && (
              <Magnetic strength={0.2}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`px-4 py-1.5 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-color)] brightness-90 ${buttonTextColor} rounded-lg text-[10px] font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_var(--accent-glow)] transition-all`}
                >
                  <PlayCircle size={12} /> Live Demo
                </a>
              </Magnetic>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hologram Modal Expansion */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="glass-card-premium max-w-2xl w-full p-6 md:p-8 relative border-[var(--accent-color)]/30 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 aspect-video overflow-hidden rounded-xl border border-white/10">
                  <video src={project.video} autoPlay muted loop className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-white">{project.title}</h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] mb-4 italic">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-medium text-white">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {project.live && (
                      <a href={project.live} target="_blank" className={`flex-1 py-3 bg-[var(--accent-color)] ${buttonTextColor} rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent-glow)]`}>
                        <PlayCircle size={16} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" className="flex-1 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                        <Github size={16} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="neon-strip-blue !via-[var(--accent-color)]"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card-premium p-10 h-full"
    >
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold italic flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(79,70,229,1)]"></div>
          Featured Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
      {/* Signature & Lighting */}
      <div className="glass-shine"></div>
      <div className="neon-strip-blue"></div>
    </motion.div>
  );
};

export default Projects;
