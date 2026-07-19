import galgotiasImg from "../assets/Galgotias.jpg";
import polytechnicImg from "../assets/polytechnic.jpg";
import guCertificateImg from "../assets/gu-certificate.jpeg";
import guResultImg from "../assets/gu-result.jpeg";
import polyResultImg from "../assets/poly-result.jpeg";
import polyCertificateImg from "../assets/poly-certificate.jpeg";

import intern1 from "../assets/internship-1.jpeg";
import intern2 from "../assets/internship-2.jpeg";

export interface InternshipProject {
  id?: number;
  name: string;
  points: string[];
  tech: string[];
}

export interface CertificationItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  description: string;
  skills?: string[];
  credentialUrl?: string;
}

export interface ExperienceItem {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  duration: string;
  location?: string;
  description: string;
  image?: string;
  degreeImage?: string;
  degreePdf?: string;
  resultImage?: string;
  resultPdf?: string;
  universityImage?: string;
  certificateImage?: string;
  certificatePdf?: string;
  projectsWorkedOn?: InternshipProject[];
  certificates?: CertificationItem[];
  skills: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    category: "Graduation",
    title: "Bachelor of Technology",
    subtitle: "Galgotias University",
    duration: "2021 - 2024",
    location: "Greater Noida, India",
    description:
      "Completed my B.Tech in Computer Science & Engineering while transforming my passion for technology into practical expertise. During these years, I specialized in MERN Stack development, built responsive and scalable web applications, strengthened my problem-solving abilities, and developed a solid understanding of modern software development practices.",
    image: galgotiasImg,
    universityImage: galgotiasImg,
    degreeImage: guCertificateImg,
    resultImage: guResultImg,
    skills: [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "REST APIs",
  "Git",
  "GitHub",
  "Responsive Design",
  "UI/UX",
  "Vite"
],
  },

  {
    id: 2,
    category: "Diploma",
    title: "Diploma",
    subtitle: "Government Polytechnic",
    duration: "2018 - 2021",
    location: "Greater Noida, India",
    description:
  "Earned a Diploma in Computer Science while strengthening my knowledge of programming, web development, and database systems. The program provided practical experience in building responsive web pages and established the technical foundation for my career as a MERN Stack Developer.",
    image: "",
    universityImage: polytechnicImg,
    degreeImage: polyCertificateImg,
    resultImage: polyResultImg,
    skills: [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs"
],
  },

  {
  id: 4,
  category: "Internship 1",
  title: "Frontend Developer Intern",
  subtitle: "Navodita Infotech",
  duration: "Aug 2024 - Sep 2024",
  description:
    "Completed a Frontend Development Internship at Navodita Infotech, where I built responsive and interactive web applications using modern frontend technologies. Worked on real-world projects, strengthened UI development skills, and gained practical experience in creating reusable components and responsive layouts.",

  certificateImage: intern1,

  skills: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Bootstrap",
    "REST API",
    "Git",
    "GitHub"
  ],

  projectsWorkedOn: [
    {
      name: "Spotify Clone",
      points: [
        "Developed a responsive Spotify-inspired music streaming interface using React.",
        "Built reusable UI components including sidebar, music player, playlists, and navigation.",
        "Implemented audio playback controls and responsive layouts for different screen sizes."
      ],
      tech: ["React", "CSS3", "JavaScript"]
    },
    {
      name: "Weather Application",
      points: [
        "Created a real-time weather application by integrating a Weather REST API.",
        "Displayed live weather information including temperature, humidity, wind speed, and weather conditions.",
        "Implemented city-based search functionality with responsive UI and proper error handling."
      ],
      tech: ["React", "REST API", "JavaScript"]
    },
    {
      name: "News Blog Website",
      points: [
        "Built a dynamic news website that fetches the latest headlines using a News API.",
        "Implemented category-based news filtering with responsive card layouts.",
        "Optimized the user interface for desktop and mobile devices while improving overall user experience."
      ],
      tech: ["React", "REST API", "Bootstrap"]
    }
  ]
},

  {
  id: 5,
  category: "Internship 2",
  title: "Web Development Intern",
  subtitle: "Oasis Infobyte",
  duration: "Feb 2024 - Mar 2024",
  description:
    "Successfully completed a Web Development and Designing Internship at Oasis Infobyte, where I designed and developed responsive web applications using modern frontend technologies. Enhanced my skills in building interactive user interfaces, API integration, and creating engaging user experiences through practical projects.",

  certificateImage: intern2,

  skills: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React",
    "Bootstrap",
    "REST API",
    "Git",
    "Responsive Design"
  ],

  projectsWorkedOn: [
    {
      name: "Recipe Finder",
      points: [
        "Developed a recipe search application using React and a public Recipe API.",
        "Implemented ingredient-based search, recipe details, and responsive card layouts.",
        "Enhanced user experience with dynamic filtering and intuitive navigation."
      ],
      tech: ["React", "REST API", "CSS3"]
    },
    {
      name: "Netflix Clone",
      points: [
        "Built a responsive Netflix-inspired landing page with modern UI components.",
        "Designed reusable sections including hero banner, movie cards, and navigation bar.",
        "Implemented smooth hover animations and mobile-friendly layouts."
      ],
      tech: ["React", "JavaScript", "CSS3"]
    },
    {
      name: "Tic-Tac-Toe Game",
      points: [
        "Created an interactive Tic-Tac-Toe game with game state management using React.",
        "Implemented win detection, draw conditions, and restart functionality.",
        "Designed a responsive and visually engaging interface with clean user interactions."
      ],
      tech: ["React", "JavaScript", "CSS3"]
    }
  ]
},

//   {
//     id: 6,
//     category: "Internship 3",
//     title: "Web Developer Intern",
//     subtitle: "InnovateX Labs",
//     duration: "Jul 2025 - Present",
//     description:
//       "Worked on UI improvements, API integration, and performance optimization for production-ready web applications.",
//     certificateImage: "",
//     skills: ["JavaScript", "React", "REST API", "CSS3", "WebSockets"],
//     projectsWorkedOn: [
//       {
//         name: "SaaS Product Landing Page",
//         points: [
//           "Engineered glassmorphic landing page with dynamic UI animations.",
//           "Integrated lead capture forms connected to backend database.",
//           "Achieved 95+ Lighthouse performance and accessibility scores."
//         ],
//         tech: ["React", "JavaScript", "Tailwind"]
//       },
//       {
//         name: "Real-Time Live Chat Module",
//         points: [
//           "Implemented WebSocket connections for instant messaging.",
//           "Built online status indicators and typing activity alerts.",
//           "Optimized data payload size for low latency synchronization."
//         ],
//         tech: ["React", "Node.js", "WebSockets"]
//       },
//       {
//         name: "SEO & Performance Suite",
//         points: [
//           "Reduced bundle size by 40% via code-splitting and dynamic imports.",
//           "Implemented structured schema markup for improved search rankings.",
//           "Audited cross-browser compatibility across mobile browsers."
//         ],
//         tech: ["JavaScript", "HTML5", "CSS3"]
//       }
//     ]
//   },

  {
    id: 7,
    category: "Certifications",
    title: "Professional Certifications",
    subtitle: "Multiple Platforms",
    duration: "2023 - Present",
    description:
      "Completed multiple certifications in web development, JavaScript, React, and backend technologies to strengthen practical skills.",
    certificateImage: "",
    skills: ["React", "JavaScript", "Node.js", "MongoDB", "Git"],
  },
];