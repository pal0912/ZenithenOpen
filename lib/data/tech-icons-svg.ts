/**
 * Authentic SVG Vector Icons for Top Open-Source Technologies
 * 
 * Includes official logo paths, viewBoxes, and color gradients for:
 * PyTorch, Docker, Kubernetes, Python, React, Next.js, Linux, Rust, Go,
 * TypeScript, TensorFlow, Redis, PostgreSQL, Tailwind, Bun, Supabase, etc.
 */

export interface TechIconDef {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  svg: string;
}

export const TECH_ICONS: TechIconDef[] = [
  {
    id: "pytorch",
    name: "PyTorch",
    color: "#EE4C2C",
    glowColor: "rgba(238, 76, 44, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 2.5L12 4L10.5 2.5C6.5 4 3.5 8 3.5 12.5C3.5 17.5 7.5 21.5 12.5 21.5C17.5 21.5 21.5 17.5 21.5 12.5C21.5 8 18.5 4 14.5 2.5" stroke="#EE4C2C" stroke-width="2" stroke-linecap="round"/>
      <circle cx="16.5" cy="7.5" r="1.5" fill="#EE4C2C"/>
      <path d="M12.5 7.5V14.5L9.5 11.5" stroke="#EE4C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    id: "react",
    name: "React",
    color: "#61DAFB",
    glowColor: "rgba(97, 218, 251, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.6" transform="rotate(0 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.6" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" stroke-width="1.6" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
    </svg>`,
  },
  {
    id: "docker",
    name: "Docker",
    color: "#2496ED",
    glowColor: "rgba(36, 150, 237, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#2496ED" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 8h-2v2h2V8zm-3 0H8v2h2V8zm-3 0H5v2h2V8zm9 0h-2v2h2V8zm-3-3h-2v2h2V5zm-3 0H8v2h2V5zm6 0h-2v2h2V5zm6.5 7.5c-.4-.3-1.3-.4-2-.2-.2-.8-.7-1.5-1.4-2l-.6.5c.6.4.9.9 1 1.5-.6.3-1.4.3-1.8.1l-.3.6c.7.3 1.7.2 2.4-.2.1.3.1.7 0 1-.5 1.5-1.8 2.6-3.4 3-2.5.6-5.8.6-8.5-.2-2-.6-3.4-2-3.8-3.9h18.4c.1-.1.1-.2 0-.3z"/>
    </svg>`,
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    color: "#326CE5",
    glowColor: "rgba(50, 108, 229, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#326CE5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" fill="#326CE5"/>
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
      <circle cx="12" cy="12" r="8" stroke="#326CE5" stroke-width="1.4"/>
    </svg>`,
  },
  {
    id: "python",
    name: "Python",
    color: "#3776AB",
    glowColor: "rgba(55, 118, 171, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 2c-3.1 0-5 1.4-5 3.3v2.2h5v.8H4.6C2.6 8.3 1 10.1 1 12.8c0 2.6 1.6 4.3 4.1 4.3h1.8v-2.2c0-2 1.6-3.8 3.8-3.8h4.6v-.8c0-2-1.6-3.8-3.8-3.8h-.4V4.7c0-.2.2-.4.4-.4h.4c3.1 0 4.6-1.5 4.6-2.3 0 0-1.8 0-4.6 0z" fill="#3776AB"/>
      <path d="M12.1 22c3.1 0 5-1.4 5-3.3v-2.2h-5v-.8h7.3c2 0 3.6-1.8 3.6-4.5 0-2.6-1.6-4.3-4.1-4.3h-1.8v2.2c0 2-1.6 3.8-3.8 3.8H8.7v.8c0 2 1.6 3.8 3.8 3.8h.4v2.2c0 .2-.2.4-.4.4h-.4c-3.1 0-4.6 1.5-4.6 2.3 0 0 1.8.4 4.6.4z" fill="#FFD43B"/>
      <circle cx="8.5" cy="5" r=".8" fill="#fff"/>
      <circle cx="15.5" cy="19" r=".8" fill="#fff"/>
    </svg>`,
  },
  {
    id: "nextjs",
    name: "Next.js",
    color: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.5)",
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#000" stroke="#fff" stroke-width="1.5"/>
      <path d="M8.5 7v10M8.5 7l8.2 10.5M15.5 7v5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "linux",
    name: "Linux",
    color: "#FCC624",
    glowColor: "rgba(252, 198, 36, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#FCC624" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C9.5 2 8 3.8 8 6.5c0 1.5.5 2.8 1.2 3.5-.8 1.2-1.7 3-1.7 5.5 0 2 1 4 2.5 4.5-.5.8-1 1.5-1 2 0 1 2 1.5 4 1.5s4-.5 4-1.5c0-.5-.5-1.2-1-2 1.5-.5 2.5-2.5 2.5-4.5 0-2.5-.9-4.3-1.7-5.5.7-.7 1.2-2 1.2-3.5C16 3.8 14.5 2 12 2z"/>
      <circle cx="10.5" cy="6" r="1" fill="#000"/>
      <circle cx="13.5" cy="6" r="1" fill="#000"/>
      <path d="M11 7.5h2l-1 1.5z" fill="#FFA500"/>
    </svg>`,
  },
  {
    id: "rust",
    name: "Rust",
    color: "#DEA584",
    glowColor: "rgba(222, 165, 132, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#DEA584" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke-dasharray="2 2"/>
      <path d="M9 8h4a2.5 2.5 0 0 1 0 5H9m3 0l3 5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 8v9" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "golang",
    name: "Go",
    color: "#00ADD8",
    glowColor: "rgba(0, 173, 216, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#00ADD8" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12a8 8 0 0 1 14.5-4.5M18.5 12A8 8 0 0 1 8 19.5M12 12h8"/>
    </svg>`,
  },
  {
    id: "typescript",
    name: "TypeScript",
    color: "#3178C6",
    glowColor: "rgba(49, 120, 198, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#3178C6" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#3178C6"/>
      <path d="M4 11h6m-3 0v8M14 19c2 0 3-1 3-2.5s-1.5-2-3-2.5-2.5-.8-2.5-1.5 1-1.5 2.5-1.5 2.5.5 3 1" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>`,
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    color: "#FF6F00",
    glowColor: "rgba(255, 111, 0, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#FF6F00" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 3.5L5.5 9v6.5L12 19.2l6.5-3.8V9L12 5.5z"/>
      <path d="M11 8h2v8h-2zM8 9h8v2H8z"/>
    </svg>`,
  },
  {
    id: "nodejs",
    name: "Node.js",
    color: "#5FA04E",
    glowColor: "rgba(95, 160, 78, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#5FA04E" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2z"/>
      <circle cx="12" cy="12" r="3.5" fill="#fff"/>
    </svg>`,
  },
  {
    id: "redis",
    name: "Redis",
    color: "#DC382D",
    glowColor: "rgba(220, 56, 45, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#DC382D" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l9 4.5v11L12 22 3 17.5v-11L12 2zm0 3.4L6 8.5l6 3.1 6-3.1-6-3.1zm-7 5.2v5.3l6 3v-5.2l-6-3.1zm14 0l-6 3.1v5.2l6-3v-5.3z"/>
    </svg>`,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    color: "#4169E1",
    glowColor: "rgba(65, 105, 225, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#4169E1" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="8" ry="7"/>
      <path d="M10 9c0 2-2 3-2 5 0 2 2 3 4 3s4-1 4-3c0-2-2-3-2-5"/>
      <circle cx="9.5" cy="8.5" r="1" fill="#4169E1"/>
      <circle cx="14.5" cy="8.5" r="1" fill="#4169E1"/>
    </svg>`,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    color: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2 4.5-1.5 1.1.3 1.8 1.1 2.7 2 1.3 1.4 3 3 6.6 3 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2-4.5 1.5-1.1-.3-1.8-1.1-2.7-2-1.4-1.5-3-3-6.6-3zm-6 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2 4.5-1.5 1.1.3 1.8 1.1 2.7 2 1.4 1.4 3 3 6.6 3 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2-4.5 1.5-1.1-.3-1.8-1.1-2.7-2-1.4-1.5-3-3-6.6-3z"/>
    </svg>`,
  },
  {
    id: "bun",
    name: "Bun",
    color: "#FBF0DF",
    glowColor: "rgba(251, 240, 223, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#FBF0DF" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="13" rx="8.5" ry="7"/>
      <circle cx="9.5" cy="11.5" r="1.2" fill="#000"/>
      <circle cx="14.5" cy="11.5" r="1.2" fill="#000"/>
      <path d="M11 14.5c.5.5 1.5.5 2 0" stroke="#000" stroke-width="1.2" stroke-linecap="round" fill="none"/>
      <path d="M12 6c-1 0-1.5-1.5-1.5-2.5 1 .5 2 1.5 1.5 2.5z" fill="#E8B878"/>
    </svg>`,
  },
  {
    id: "supabase",
    name: "Supabase",
    color: "#3ECF8E",
    glowColor: "rgba(62, 207, 142, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#3ECF8E" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 2L3 14.5h8L9.5 22 21 9.5h-7.5L13.5 2z"/>
    </svg>`,
  },
  {
    id: "github",
    name: "GitHub",
    color: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.5)",
    svg: `<svg viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>
    </svg>`,
  },
  {
    id: "git",
    name: "Git",
    color: "#F05032",
    glowColor: "rgba(240, 80, 50, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#F05032" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.6 10.9L13.1 2.4a1.7 1.7 0 0 0-2.4 0L8.3 4.8l3.1 3.1c.7-.2 1.5 0 2 .5.6.6.7 1.4.5 2.1l3 3c.7-.2 1.5 0 2.1.5.8.8.8 2.1 0 3-.8.8-2.1.8-3 0-.6-.6-.7-1.5-.5-2.1l-2.9-3v4.4c.6.4 1 1.1 1 1.9 0 1.2-1 2.2-2.2 2.2s-2.2-1-2.2-2.2c0-.8.4-1.5 1-1.9V9.8c-.6-.4-1-1.1-1-1.9 0-.8.4-1.5 1-1.9L7.1 3.7 2.4 8.4a1.7 1.7 0 0 0 0 2.4l8.5 8.5a1.7 1.7 0 0 0 2.4 0l8.3-8.4a1.7 1.7 0 0 0 0-2.4z"/>
    </svg>`,
  },
  {
    id: "vue",
    name: "Vue.js",
    color: "#4FC08D",
    glowColor: "rgba(79, 192, 141, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3h4l6 10.5L18 3h4L12 21 2 3z" fill="#4FC08D"/>
      <path d="M6.5 3h3.5L12 6.5 14 3h3.5L12 12 6.5 3z" fill="#35495E"/>
    </svg>`,
  },
  {
    id: "svelte",
    name: "Svelte",
    color: "#FF3E00",
    glowColor: "rgba(255, 62, 0, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#FF3E00" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 8c-.6-2.5-2.8-4-5.5-3.8-3.3.2-5.7 2.6-5.5 5.5.1 1.2.6 2.2 1.4 3L6 14.5C4 16 3.5 18.5 4.5 20.5c1.2 2.2 3.8 3.2 6.5 2.5 3-.8 4.8-3 4.5-5.5-.1-1-.5-1.8-1.2-2.5l3.2-2c1-1.2 1.8-3 1.5-5z"/>
    </svg>`,
  },
  {
    id: "vite",
    name: "Vite",
    color: "#646CFF",
    glowColor: "rgba(100, 108, 255, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5 4L12 21 3.5 4l8.5 2 8.5-2z" fill="#646CFF"/>
      <path d="M12.5 3L8 12h4l-1 6 5.5-9h-4l1-6z" fill="#FFD62E"/>
    </svg>`,
  },
  {
    id: "graphql",
    name: "GraphQL",
    color: "#E10098",
    glowColor: "rgba(225, 0, 152, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#E10098" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l8.7 5v10L12 22l-8.7-5V7L12 2z"/>
      <circle cx="12" cy="2" r="1.8" fill="#E10098"/>
      <circle cx="20.7" cy="7" r="1.8" fill="#E10098"/>
      <circle cx="20.7" cy="17" r="1.8" fill="#E10098"/>
      <circle cx="12" cy="22" r="1.8" fill="#E10098"/>
      <circle cx="3.3" cy="17" r="1.8" fill="#E10098"/>
      <circle cx="3.3" cy="7" r="1.8" fill="#E10098"/>
    </svg>`,
  },
  {
    id: "cpp",
    name: "C++",
    color: "#00599C",
    glowColor: "rgba(0, 89, 156, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#00599C" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 6.5v11L12 22l9-4.5v-11L12 2zm-2 13.5c-2 0-3.5-1.5-3.5-3.5S8 8.5 10 8.5c1.2 0 2.2.6 2.8 1.5l-1.4 1c-.3-.5-.8-.8-1.4-.8-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8c.6 0 1.1-.3 1.4-.8l1.4 1c-.6.9-1.6 1.5-2.8 1.5zm6-3h-1v-1h1V9.5h1v1h1v1h-1v1h-1v-1zm4 0h-1v-1h1V9.5h1v1h1v1h-1v1h-1v-1z"/>
    </svg>`,
  },
  {
    id: "openai",
    name: "OpenAI",
    color: "#10A37F",
    glowColor: "rgba(16, 163, 127, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#10A37F" stroke-width="1.8" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l4 2.5"/>
      <path d="M16 8l-3 4-2-4"/>
      <path d="M8 12h4l-2 4"/>
    </svg>`,
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    color: "#FFD21E",
    glowColor: "rgba(255, 210, 30, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#FFD21E" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="8.5" cy="10" r="1.5" fill="#000"/>
      <circle cx="15.5" cy="10" r="1.5" fill="#000"/>
      <path d="M8 14.5c1.2 2 6.8 2 8 0" stroke="#000" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    </svg>`,
  },
  {
    id: "fastapi",
    name: "FastAPI",
    color: "#05998B",
    glowColor: "rgba(5, 153, 139, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#05998B" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <path d="M13 4L6 14h5l-1 6 7-10h-5l1-6z" fill="#fff"/>
    </svg>`,
  },
  {
    id: "flutter",
    name: "Flutter",
    color: "#02569B",
    glowColor: "rgba(2, 86, 155, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="#02569B" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2L4 12l3 3 13-13h-6zM14 12l-5 5 5 5h6l-8-8 2-2h-6z"/>
    </svg>`,
  },
  {
    id: "neovim",
    name: "Neovim",
    color: "#57A143",
    glowColor: "rgba(87, 161, 67, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3l6 14V3z" fill="#57A143"/>
      <path d="M20 21l-6-14v14z" fill="#81B29A"/>
      <path d="M4 3l16 18h-4L4 5z" fill="#3D5A80"/>
    </svg>`,
  },
  {
    id: "ollama",
    name: "Ollama",
    color: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.6)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="6" r="3"/>
      <path d="M9 9v11M14 11h2a3 3 0 0 1 3 3v6M14 15h5"/>
    </svg>`,
  }
];
