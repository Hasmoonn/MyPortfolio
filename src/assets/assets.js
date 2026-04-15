import parkswift from '../assets/projectImages/parkswift.png'
import mernAuth from '../assets/projectImages/mernAuth.png'
import eventBuddy from '../assets/projectImages/eventBuddy.png'
import mobileApp from '../assets/projectImages/mobileApp.png'
import inkspireAI from '../assets/projectImages/inkspireAI.png'
import snapBlog from '../assets/projectImages/snapBlog.png'
import luxivo from '../assets/projectImages/luxivo.png'

// ------------- skills --------------
import {Code, CodeSquare, Database, Palette} from 'lucide-react'

export const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "HTML5, CSS3, JavaScript, React.js, TypeScript, Next.js, Tailwind CSS",
    color: "text-blue-500"
  },
  {
    icon: Database,
    title: "Backend Development", 
    description: "Node.js, Express.js, Spring Boot, MySQL, MongoDB",
    color: "text-green-500"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Figma, Canva, Prototyping, User Research",
    color: "text-purple-500"
  },
  {
    icon: CodeSquare,
    title: "Programming Language",
    description: "C, Python, Java",
    color: "text-orange-500"
  }
];

// --------------- projects ------------
export const projects = [
  {
    title: "Inkspire AI",
    description:
      "An AI content creation platform for generating and publishing articles with Gemini AI, featuring image optimization, interactive engagement tools, and a modern responsive UI.",
    image: inkspireAI,
    technologies: [
      "Next.js",
      "Convex",
      "Tailwind CSS",
      "Gemini API",
      "ImageKit",
      "Shadcn UI"
    ],
    github: "https://github.com/Hasmoonn/smart-creator-cms",
    live: "https://smart-creator-cms.vercel.app/"
  },
  {
    title: "ParkSwift",
    description:
      "A scalable online parking slot reservation system enabling users to book parking spaces in real time with role-based access for users, slot owners, and admins. Includes secure authentication, dynamic pricing, notifications, and contactless entry.",
    image: parkswift,
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Nginx"
    ],
    github: "https://github.com/sampathmenuka/ParkSwift",
    live: "not hosted yet"
  },
  {
    title: "Hybrid Student Attendance System",
    description:
      "A mobile-based attendance system using QR code, face recognition, and GPS verification to automate student attendance with real-time monitoring and lecturer dashboards.",
    image: mobileApp,
    technologies: [
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "OpenCV"
    ],
    github: "https://github.com/SE6101-Community-Project/Student_Attendance_System",
    live: "not hosted yet"
  },
  {
    title: "EventBuddy",
    description:
      "An AI-powered event planning and vendor marketplace platform with role-based authentication, smart scheduling, budgeting assistance, and booking management.",
    image: eventBuddy,
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "OpenAI API",
      "Tailwind CSS"
    ],
    github: "https://github.com/Hasmoonn/EventBuddy",
    live: "not hosted yet"
  },
  
  {
    title: "SnapBlog",
    description:
      "An AI-powered blogging platform that generates full blog posts from simple inputs with features for post management, comments, moderation, and admin dashboard.",
    image: snapBlog,
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI Integration"
    ],
    github: "https://github.com/Hasmoonn/SnapBlog-AI_blog_generator",
    live: "https://snapblog-ai-blog-generator-frontend.vercel.app/"
  },
  {
    title: "Luxivo",
    description:
      "A full-stack e-commerce platform with product browsing, cart system, secure checkout, and order management, built for scalable and responsive shopping experiences.",
    image: luxivo,
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Docker"
    ],
    github: "https://github.com/Hasmoonn/Luxivo_E-Commerce_Website",
    live: "https://luxivo-front.vercel.app/"
  },
  {
    title: "MERN Authentication System",
    description:
      "A secure authentication system with user registration, login, OTP-based password reset, and JWT cookie-based session management.",
    image: mernAuth,
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Axios"
    ],
    github: "https://github.com/Hasmoonn/MERN-Authentication",
    live: "not hosted yet"
  }
];


// ------------- education -----------
export const education = [
  {
    degree: "B.Sc(Hons) in Software Engineering",
    school: "Sabaragamuwa University of Sri Lanka",
    period: "2021 - Present",
    description: "Specialized in Web Development and Machine Learning. CGPA: 3.72/4.0",
    achievements: ["Dean's List", "Research Assistant"]
  },
  {
    degree: "Diploma in Computer Science",
    school: "KDMC Nenasala - Kalmunai",
    period: "2021 - 2022",
    description: "Focused on full-stack development and software architecture.",
    achievements: []
  },
  {
    degree: "G.C.E in Advanced Level",
    school: "KM/ Zahira College, Kalmunai",
    period: "2018 - 2020",
    description: "Specializing in the Physical Science stream. I achieved A, B and C, obtaining a Z-Score of 1.472. This strong academic foundation in mathematics and science has greatly supported my journey in software engineering and problem-solving.",
    achievements: ["Medal", "Prices"]
  },
];



// ------------- certficates -----------
export const certifications = [
  {
    title: "AWS S3 Basics",
    issuer: "Amazon Web Services",
    date: "2023",
    id: "https://www.coursera.org/account/accomplishments/verify/ER9ELG3UAXEK"
  },
  {
    title: "Web Development Wizardry: HTML & CSS",
    issuer: "Udemy",
    date: "2024",
    id: " UC-fbef257d-5d35-4202-adfd-29991ce2cba6"
  },
  {
    title: "Introduction to C programming",
    issuer: "Sololearn",
    date: "2023",
    id: "Certificate CC- IQS7EDPS"
  },
  {
    title: "CSS",
    issuer: "HackerRank",
    date: "2024",
    id: "C83F4FDC2946"
  },
  {
    title: "Programmin in C Certification(Intermediate)",
    issuer: "Sololearn",
    date: "2023",
    id: "Certificate CC-JLRUTIOQ"
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "MongoDB Inc.",
    date: "2021",
    id: "MDB-DEV-2021-006"
  },
  {
    title: "Agility",
    issuer: "SLASSCOM",
    date: "2021",
    id: "652e1b123f621319da077696"
  },
];