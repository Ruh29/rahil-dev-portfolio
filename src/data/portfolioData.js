const portfolioData = {
  personalInfo: {
    name: "Rahil Sheikh",
    initials: "RS",
    firstName: "Rahil",
    lastName: "Sheikh",
    role: "Frontend-Focused Full Stack Developer",
    tagline: "Frontend Developer (REACT)",
    subtitle:
      "Passionate Frontend-Focused Full Stack Developer with expertise in React.js, Redux Toolkit, Tailwind CSS, and JavaScript (ES6+). Practical experience extends to Node.js, Express, and MongoDB.",
    location: "Indore, India",
    email: "rahilsheikh73308@gmail.com",
    phone: "+91 9993995502",
    github: "https://github.com/rahilsheikh",
    linkedin: "https://linkedin.com/in/rahilsheikh",
    twitter: "https://twitter.com/rahilsheikh",
    resumeUrl: "/Rahil_Sheikh_MERN_Resume.pdf",
    bio: "I am a passionate Frontend-Focused Full Stack Developer with expertise in React.js, Redux Toolkit, Tailwind CSS, and JavaScript (ES6+). My practical experience extends to Node.js, Express, and MongoDB. I am committed to honing my skills in problem-solving, backend integration, and authentication systems. I aim to contribute to projects that merge creativity with technical proficiency. ☕",
    voiceIntroText:
      "Hello! I'm Rahil Sheikh, a Frontend-Focused Full Stack Developer. I specialize in building scalable, responsive web applications using React, Redux, Tailwind, Node.js, Express, and MongoDB. Welcome to my portfolio!",
    availableForWork: true,
  },

  stats: [
    { label: "Years Experience", value: "1+", icon: "Briefcase" },
    { label: "Projects Built", value: "20+", icon: "FolderGit2" },
    { label: "Technologies", value: "25+", icon: "Code2" },
    { label: "Languages", value: "2", icon: "Languages" },
  ],

  skills: {
    primary: [
      { name: "ReactJs", level: 95, color: "#61DAFB", category: "Frontend" },
      { name: "React-Native", level: 90, color: "#61DAFB", category: "Mobile" },
      { name: "Redux Toolkit", level: 90, color: "#764ABC", category: "State" },
      { name: "Tailwind CSS", level: 95, color: "#06B6D4", category: "Styling" },
      { name: "JavaScript (ES6+)", level: 95, color: "#F7DF1E", category: "Language" },
      { name: "TypeScript", level: 90, color: "#3178C6", category: "Language" },
    ],
    secondary: [
      { name: "Node.js", level: 85, color: "#339933", category: "Backend" },
      { name: "Express.js", level: 85, color: "#828282", category: "Backend" },
      { name: "MongoDB", level: 85, color: "#47A248", category: "Database" },
      { name: "Socket.io", level: 85, color: "#010101", category: "Real-time" },
      { name: "Axios & REST", level: 90, color: "#E10098", category: "API" },
      { name: "Mongoose ODM", level: 85, color: "#4169E1", category: "Database" },
    ],
    tools: [
      "Jira",
      "Git & GitHub",
      "Bit-Bucket",
      "Netlify",
      "Vercel",
      "Multer",
      "HTML & CSS",
      "JSON",
      "WebSockets",
      "Middleware",
      "Schema Design",
      "File Uploading",
      "QA Testing",
    ],
  },

  projects: [
    {
      id: 1,
      title: "TradAstra App for Trading",
      description:
        "Build its full frontend according to the wireframe. Architected a modular and scalable structure using React Native, TypeScript, and NativeWind to ensure maintainable component structure and consistent design patterns. Implemented core features like email verification, refresh tokens, centralized data fetching with error boundaries, fallback UIs, and secure API communication with Axios interceptors.",
      tech: ["React Native", "TypeScript", "NativeWind", "Axios", "REST API", "Redux"],
      github: "https://github.com/rahilsheikh/tradastra-trading-app",
      live: "",
      featured: true,
      category: "Mobile App",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      id: 2,
      title: "Meet web/App",
      description:
        "Meetly Interview Portal (Full Stack Project) built with React (frontend) and Express.js + MongoDB (backend). Features scheduling & inviting candidates, email verification, refresh token support, dynamic Navbar with Redux slices for Admin & Candidate login states, Socket.IO integration for video calling/screen sharing, and real-time chat.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Redux Toolkit", "JWT"],
      github: "https://github.com/rahilsheikh/meetly-interview-portal",
      live: "",
      featured: true,
      category: "Full Stack",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: 3,
      title: "Fleet Management",
      description:
        "Doctor Appointment and Fleet Management System. Architected a scalable web-based system using ReactJS (JavaScript) for the frontend and Node.js/Express for the backend. Delivers vehicle CRUD, driver assignment, trip logs, alerts, live GPS tracking, secure authentication using JWT + refresh token rotation, and role-based access control.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "Leaflet/Maps", "RBAC"],
      github: "https://github.com/rahilsheikh/fleet-management-dashboard",
      live: "",
      featured: true,
      category: "Full Stack",
      gradient: "from-purple-500 to-pink-600",
    },
  ],

  timeline: [
    {
      year: "2023 - 2027",
      period: "08/2023 - 05/2027",
      title: "B.Tech in Computer Science",
      company: "LNCT University, Indore",
      description:
        "Pursuing Bachelor of Technology with a strong focus on Software Engineering, Data Structures, Web Applications, and Core Computer Science. Maintaining consistent academics.",
      icon: "GraduationCap",
      color: "#ec4899",
      skills: ["Computer Science", "Algorithms", "Software Engineering"],
    },
    {
      year: "2022 - 2023",
      period: "08/2022 - 06/2023",
      title: "Frontend Developer Intern",
      company: "LogiQlink Technologies, Indore",
      description:
        "Technical internship focusing on frontend development. Worked on real-world live projects focusing on React.js, Redux Toolkit, Tailwind CSS, and JavaScript (ES6+). Hands-on experience with Git/GitHub, Jira, Netlify, Vercel, Native App development, and QA testing. Resolved CORS issues and token expiry mechanisms.",
      icon: "Briefcase",
      color: "#8b5cf6",
      skills: ["React.js", "Redux Toolkit", "Tailwind CSS", "Git", "Jira", "Netlify", "Vercel"],
    },
  ],

  certifications: [
    {
      name: "MongoDB Certified Developer Associate",
      issuer: "MongoDB Inc.",
      year: "2023",
      icon: "Award",
    },
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023",
      icon: "Award",
    },
  ],

  socialLinks: [
    { platform: "GitHub", url: "https://github.com/rahilsheikh", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/rahilsheikh", icon: "Linkedin" },
    { platform: "Twitter", url: "https://twitter.com/rahilsheikh", icon: "Twitter" },
    { platform: "Email", url: "mailto:rahilsheikh73308@gmail.com", icon: "Mail" },
  ],

  navSections: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "timeline", label: "Journey" },
    { id: "ai-chat", label: "AI Chat" },
    { id: "contact", label: "Contact" },
  ],
};

export default portfolioData;
