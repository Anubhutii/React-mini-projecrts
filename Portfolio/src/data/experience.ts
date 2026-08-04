import intern1 from "../assets/internship-1.jpeg";
import intern2 from "../assets/internship-2.jpeg";

// All 20 Certificate Images from src/assets/certificates
import cert1Img from "../assets/certificates/certificate1.jpeg";
import cert2Img from "../assets/certificates/certificate2.jpeg";
import cert3Img from "../assets/certificates/certificate3.jpeg";
import cert4Img from "../assets/certificates/certificate4_page-0001.jpg";
import cert5Img from "../assets/certificates/certificate5_page-0001.jpg";
import cert6Img from "../assets/certificates/certificate6_page-0001.jpg";
import cert7Img from "../assets/certificates/certificate7_page-0001.jpg";
import cert8Img from "../assets/certificates/certificate8_page-0001.jpg";
import cert9Img from "../assets/certificates/certificate9_page-0001.jpg";
import cert10Img from "../assets/certificates/certificate10_page-0001.jpg";
import cert11Img from "../assets/certificates/certificate11_page-0001.jpg";
import cert12Img from "../assets/certificates/certificate12_page-0001.jpg";
import cert13Img from "../assets/certificates/certificate13_page-0001.jpg";
import cert14Img from "../assets/certificates/certificate14_page-0001.jpg";
import cert15Img from "../assets/certificates/certificate15_page-0001.jpg";
import cert16Img from "../assets/certificates/certificate16_page-0001.jpg";
import cert17Img from "../assets/certificates/certificate17_page-0001.jpg";
import cert18Img from "../assets/certificates/certificate18_page-0001.jpg";
import cert19Img from "../assets/certificates/certificate19_page-0001.jpg";
import cert20Img from "../assets/certificates/certificate20_page-0001.jpg";

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
  image: string;
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

  {
    id: 7,
    category: "Certifications",
    title: "Professional Certifications",
    subtitle: "Verified Accomplishments & Credentials",
    duration: "2020 - Present",
    description:
      "A comprehensive collection of verified technical certifications, diplomas, and course accomplishments covering Full Stack Development, React, Node.js, Databases, Algorithms, and Software Engineering.",
    certificateImage: cert1Img,
    skills: ["React", "JavaScript", "Node.js", "MongoDB", "TypeScript", "REST APIs", "Git"],
  },
];

export const certificatesData: CertificationItem[] = [
  {
    id: 1,
    title: "Certificate 1",
    issuer: "Navodita Infotech",
    date: "Sep 2024",
    image: cert1Img,
    skills: ["React", "JavaScript", "HTML5", "CSS3"],
    description: "Certificate 1"
  },
  {
    id: 2,
    title: "Certificate 2",
    issuer: "Oasis Infobyte",
    date: "Mar 2024",
    image: cert2Img,
    skills: ["React", "REST API", "Bootstrap"],
    description: "Certificate 2"
  },
  {
    id: 3,
    title: "Certificate 3",
    issuer: "Technical Training Academy",
    date: "2024",
    image: cert3Img,
    skills: ["MongoDB", "Express.js", "React", "Node.js"],
    description: "Certificate 3"
  },
  {
    id: 4,
    title: "Certificate 4",
    issuer: "Software Development Board",
    date: "2024",
    image: cert4Img,
    skills: ["Software Engineering", "Web Architecture"],
    description: "Certificate 4"
  },
  {
    id: 5,
    title: "Certificate 5",
    issuer: "Frontend Masters",
    date: "2024",
    image: cert5Img,
    skills: ["React", "TypeScript", "Tailwind CSS"],
    description: "Certificate 5"
  },
  {
    id: 6,
    title: "Certificate 6",
    issuer: "Backend Mastery Academy",
    date: "2024",
    image: cert6Img,
    skills: ["Node.js", "Express.js", "REST APIs"],
    description: "Certificate 6"
  },
  {
    id: 7,
    title: "Certificate 7",
    issuer: "HackerRank",
    date: "2023",
    image: cert7Img,
    skills: ["JavaScript", "Data Structures", "Algorithms"],
    description: "Certificate 7"
  },
  {
    id: 8,
    title: "Certificate 8",
    issuer: "Database Academy",
    date: "2023",
    image: cert8Img,
    skills: ["MongoDB", "Database Design", "NoSQL"],
    description: "Certificate 8"
  },
  {
    id: 9,
    title: "Certificate 9",
    issuer: "freeCodeCamp",
    date: "2023",
    image: cert9Img,
    skills: ["HTML5", "CSS3", "Flexbox", "Grid"],
    description: "Certificate 9"
  },
  {
    id: 10,
    title: "Certificate 10",
    issuer: "API Certification Board",
    date: "2023",
    image: cert10Img,
    skills: ["REST API", "JSON", "HTTP Protocols"],
    description: "Certificate 10"
  },
  {
    id: 11,
    title: "Certificate 11",
    issuer: "TypeScript Training Academy",
    date: "2024",
    image: cert11Img,
    skills: ["TypeScript", "Static Typing", "React"],
    description: "Certificate 11"
  },
  {
    id: 12,
    title: "Certificate 12",
    issuer: "Design Studio",
    date: "2023",
    image: cert12Img,
    skills: ["UI/UX", "Figma", "Prototyping"],
    description: "Certificate 12"
  },
  {
    id: 13,
    title: "Certificate 13",
    issuer: "DevOps Academy",
    date: "2023",
    image: cert13Img,
    skills: ["Git", "GitHub", "Version Control"],
    description: "Certificate 13"
  },
  {
    id: 14,
    title: "Certificate 14",
    issuer: "Cloud Tech Board",
    date: "2024",
    image: cert14Img,
    skills: ["Vite", "Vercel", "Netlify", "Cloud"],
    description: "Certificate 14"
  },
  {
    id: 15,
    title: "Certificate 15",
    issuer: "Galgotias University",
    date: "2023",
    image: cert15Img,
    skills: ["Operating Systems", "Networking", "OOP"],
    description: "Certificate 15"
  },
  {
    id: 16,
    title: "Certificate 16",
    issuer: "Tech Workshop Series",
    date: "2023",
    image: cert16Img,
    skills: ["JavaScript", "React", "CSS3"],
    description: "Certificate 16"
  },
  {
    id: 17,
    title: "Certificate 17",
    issuer: "Tech Assessment Board",
    date: "2023",
    image: cert17Img,
    skills: ["Problem Solving", "Logic"],
    description: "Certificate 17"
  },
  {
    id: 18,
    title: "Certificate 18",
    issuer: "Frontend Masters",
    date: "2024",
    image: cert18Img,
    skills: ["Web Performance", "Lighthouse", "Optimization"],
    description: "Certificate 18"
  },
  {
    id: 19,
    title: "Certificate 19",
    issuer: "Engineering Board",
    date: "2024",
    image: cert19Img,
    skills: ["Full Stack", "Clean Code"],
    description: "Certificate 19"
  },
  {
    id: 20,
    title: "Certificate 20",
    issuer: "Tech Certification Board",
    date: "2024",
    image: cert20Img,
    skills: ["React", "Node.js", "Full Stack Development"],
    description: "Certificate 20"
  }
];