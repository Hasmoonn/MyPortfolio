import parkswift from '../assets/projectImages/parkswift.png'
import mernAuth from '../assets/projectImages/mernAuth.png'
import portfolio from '../assets/projectImages/portfolio.png'

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
    title: "ParkSwift",
    description: "ParkSwift is an online parking reservation system designed to simplify parking by connecting drivers with available parking spaces and enabling space owners to monetize their unused spots. The platform offers a seamless experience with features like instant booking, secure payments, and contactless entry.",
    image: parkswift,
    technologies: ["React", "Node.js","Express.js", "MongoDB", "Stripe"],
    github: "#",
    live: "#"
  },
  {
    title: "MERN Authentication",
    description: "A full-stack MERN (MongoDB, Express.js, React.js, Node.js) authentication system with features like user registration, login, email verification with OTP, and password reset via OTP. I have done this project by learning MERN day by day.",
    image: mernAuth,
    technologies: ["React", "Node.js","Express.js", "MongoDB", "Axios"],
    github: "#",
    live: "#"
  },
  {
    title: "Simple Portfolio",
    description: "This is my personal portfolio website built using HTML, CSS, and JavaScript. It showcases my skills, projects, and experience in software development. The website is fully responsive and includes interactive UI elements for a better user experience.",
    image: portfolio,
    technologies: ["HTML3", "CSS3", "JavaScript"],
    github: "#",
    live: "#"
  },
  {
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    github: "#",
    live: "#"
  },
  {
    title: "Social Media Platform",
    description: "Full-featured social media platform with posts, stories, messaging, and advanced privacy controls.",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=500&h=300&fit=crop",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Redis"],
    github: "#",
    live: "#"
  },
  {
    title: "Healthcare Management System",
    description: "Comprehensive healthcare management system for clinics with patient records, appointment scheduling, and billing.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
    technologies: ["Angular", "Java", "MySQL", "Spring Boot"],
    github: "#",
    live: "#"
  },
  {
    title: "Cryptocurrency Tracker",
    description: "Real-time cryptocurrency tracking app with portfolio management, price alerts, and market analysis tools.",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&h=300&fit=crop",
    technologies: ["Vue.js", "TypeScript", "CoinGecko API", "Chart.js"],
    github: "#",
    live: "#"
  },
  {
    title: "Video Streaming Platform",
    description: "Netflix-like streaming platform with user profiles, content recommendations, and subscription management.",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=300&fit=crop",
    technologies: ["React", "AWS S3", "Lambda", "DynamoDB"],
    github: "#",
    live: "#"
  },
  {
    title: "Food Delivery App",
    description: "Complete food delivery solution with restaurant listings, order tracking, and payment integration.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=300&fit=crop",
    technologies: ["Flutter", "Firebase", "Google Maps", "Stripe"],
    github: "#",
    live: "#"
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