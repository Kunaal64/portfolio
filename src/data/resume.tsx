import { Icons } from "@/components/icons";
import { HomeIcon, TrophyIcon } from "lucide-react";

export const DATA = {
  name: "Kunal Sharma",
  initials: "KS",
  url: "https://dillion.io",
  location: "Indore",
  locationLink: "https://www.google.com/maps/place/Indore",
  description:
    "Trying to beeee a Developer who loves just sleeping. ",
  summary:
    "Hey there! I'm all about the simple joys inspired by pandas and Shinchan eating, sleeping, a bit of work, and then doing it all over again. I love exploring the colorful world around us and playing with different shades of universe. Designing and bringing ideas to life in web development is my jam. Plus, I'm a tech enthusiast with a decent grasp of C, C++, and some Java and Python basics. When I'm not immersed in coding, you'll probably find me curled up enjoying a nature walk or sleeping . Let's keep it fun, keep learning, and embrace the beauty of simplicity!",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Javascript",
    "Typescript",
    "TailwindCSS",
    "Node.js",
    "Python",
    "Postgres",
    "Docker",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: TrophyIcon, label: "Achievements" },
  ],
  contact: {
    email: "kunaall1001@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Kunaal64",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kunaall/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/dillion-twitter",
        icon: Icons.x,
        navbar: false,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/hee_kunaal?igsh=dTF2enVyemRuMjl5",
        icon: Icons.instagram,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:kunaall1001@gmail.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Essential Protects",
      href: "https://essentielprotect.fr/en/",
      badges: [],
      location: "Remote",
      title: "Frontend Developer Intern",
      logoUrl: "https://essentielprotect.fr/themes/essentiel/assets/logo.webp",
      start: "Nov 2023",
      end: "April 2024",
      description:
        "Worked with a French startup on menstrual hygiene products, enhancing their website’s frontend design and usability by adding 5+ new components/pages, while managing complex forms using React Hook Form with Zod validation and implementing a secure Cloudflare R2 file storage system supporting uploads up to 50MB (tested with 15+ product assets).",
    },
  
  ],
  education: [
    {
      school: "Indian Institute of Information Technology, Nagpur",
      href: "https://iiitn.ac.in/",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      logoUrl: "https://cse.noticebard.com/wp-content/uploads/sites/23/2025/04/Summer-Internship-Program-at-IIIT-N.jpg",
      start: "2022",
      end: "ongoing",
    },
    {
      school: "Macro Vision Academy",
      href: "https://mvaburhanpur.com/",
      degree: "Schooling..",
      logoUrl: "https://mvaburhanpur.com/front_theme/images/logo.png",
      start: "2016",
      end: "2021",
    },

  ],
  projects: [
    {
      title: "Convo",
      href: "https://convo-rho.vercel.app/",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "Full-stack app for uploading DOCX files, converting them to PDF, and managing documents. Built with Node.js/Express backend and React/Tailwind frontend.",
      technologies: [
        "React.js",
        "Javascript",
        "Node.js",
        "Express.js",
        "TailwindCSS",
        // "Stripe",
        // "Shadcn UI",
        // "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://convo-rho.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Kunaal64/Convo",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/convopic.png",
      video:
        "",
        //https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4
    },
    {
      title: "TraMoo",
      href: "https://tramoo-navy.vercel.app/",
      dates: "June 2024 - November 2024",
      active: true,
      description:
        "TraMoo – A full-stack MERN travel blogging platform that lets users document and share adventures through interactive blogs, featuring secure authentication via Email/Password and Google OAuth.",
      technologies: [
        "React.js",
        "Typescript",
        "MongoDB",
        "Node.js",
        "Express.js",
        "TailwindCSS",
      ],
      links: [
        {
          type: "Website",
          href: "https://tramoo-navy.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Kunaal64/TraMoo",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/TraMoopic.png",
      video: "",
      //https://cdn.magicui.design/bento-grid.mp4
    },
    {
      title: "Inkpress",
      href: "https://inkpress-rho.vercel.app/",
      dates: "February 2025 - May 2025",
      active: true,
      description:
        "InkPress – An email template management app built with Next.js 13, Drizzle ORM, and Neon PostgreSQL, featuring variable support, type-safe operations, and a sleek Tailwind + Radix UI.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Drizzle ORM",
        "TailwindCSS",
        "Radix UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://inkpress-rho.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Kunaal64/InkPress",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/Inkpresspic.png",
      video: "",
      //https://cdn.llm.report/openai-demo.mp4
    },
    {
      title: "Talkuu",
      href: "https://talkuu-lake.vercel.app/",
      dates: "July 2025 - Present",
      active: true,
      description:
        "Developed Talkuu, a personal project for fun, to create a communication web app featuring a post feed with privacy controls and a chat functionality.",
      technologies: [
        "React.js",
        "MonngoDB",
        "Node.js",
        "Express.js",
        "Cloudinary",
        "TailwindCSS",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://talkuu-lake.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Kunaal64/Talkuu",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/talkuupic.png",
      video:"",
        // "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
  hackathons: [
    {
      title: "ISRO IISF Hackathon ",
      dates: "January, 2024",
      location: "Delhi, India",
      description:
        "Runner-up – ISRO IISF Hackathon: Contributed to a recommender system's frontend and backend for ISRO’s Bhuvan app; top 10 out of 3000+ team.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/800px-Indian_Space_Research_Organisation_Logo.svg.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "TantraFiesta",
      dates: "October, 2023",
      location: "Nagpur, India",
      description:
        "Developed a Web application for the college's annual fest TantraFiesta where participants and users can all the info about the fest and the events.",
      image:
        "https://res.cloudinary.com/doraexp69/image/upload/v1663765902/tf2022/tantrafiesta-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },

  ],
} as const;
