/**
 * GitHub Organizations for 3D Floating Avatars
 * 
 * Uses official GitHub organization avatar URLs:
 * https://github.com/${login}.png?size=96
 */

export interface GitHubOrgAvatar {
  login: string;
  name: string;
}

export const GITHUB_ORG_AVATARS: GitHubOrgAvatar[] = [
  // Orgs specifically highlighted by user
  { login: "pytorch", name: "PyTorch" },
  { login: "IST-ZenithenLab", name: "IST-ZenithenLab" },
  { login: "twbs", name: "Bootstrap" },
  { login: "deepchem", name: "DeepChem" },
  { login: "firstcontributions", name: "First Contributions" },
  { login: "excalidraw", name: "Excalidraw" },
  { login: "networkx", name: "NetworkX" },
  { login: "Checkora", name: "Checkora" },

  // Core open-source titans & developer ecosystem
  { login: "tensorflow", name: "TensorFlow" },
  { login: "facebook", name: "Meta Open Source" },
  { login: "vercel", name: "Vercel" },
  { login: "kubernetes", name: "Kubernetes" },
  { login: "docker", name: "Docker" },
  { login: "microsoft", name: "Microsoft" },
  { login: "google", name: "Google" },
  { login: "supabase", name: "Supabase" },
  { login: "denoland", name: "Deno" },
  { login: "tailwindlabs", name: "Tailwind Labs" },
  { login: "vitejs", name: "Vite" },
  { login: "rust-lang", name: "Rust" },
  { login: "golang", name: "Go" },
  { login: "tiangolo", name: "FastAPI" },
  { login: "neovim", name: "Neovim" },
  { login: "tauri-apps", name: "Tauri" },
  { login: "huggingface", name: "Hugging Face" },
  { login: "langchain-ai", name: "LangChain" },
  { login: "ollama", name: "Ollama" },
  { login: "godotengine", name: "Godot Engine" },
  { login: "astral-sh", name: "Astral" },
  { login: "oven-sh", name: "Bun" },
  { login: "nodejs", name: "Node.js" },
  { login: "redis", name: "Redis" },
  { login: "postgres", name: "PostgreSQL" },
  { login: "torvalds", name: "Linux" },
  { login: "freeCodeCamp", name: "freeCodeCamp" },
  { login: "angular", name: "Angular" },
  { login: "sveltejs", name: "Svelte" },
  { login: "vuejs", name: "Vue.js" },
  { login: "reduxjs", name: "Redux" },
  { login: "prisma", name: "Prisma" },
  { login: "biomejs", name: "Biome" },
  { login: "TanStack", name: "TanStack" },
  { login: "trpc", name: "tRPC" },
  { login: "remix-run", name: "Remix" },
  { login: "flutter", name: "Flutter" },
  { login: "opencv", name: "OpenCV" },
  { login: "electron", name: "Electron" },
  { login: "graphql", name: "GraphQL" },
  { login: "axios", name: "Axios" },
  { login: "expressjs", name: "Express" },
  { login: "pallets", name: "Flask / Pallets" },
  { login: "django", name: "Django" },
  { login: "keras-team", name: "Keras" },
  { login: "pandas-dev", name: "pandas" },
  { login: "numpy", name: "NumPy" },
  { login: "duckdb", name: "DuckDB" },
  { login: "ClickHouse", name: "ClickHouse" },
  { login: "qdrant", name: "Qdrant" },
  { login: "chroma-core", name: "Chroma" },
  { login: "milvus-io", name: "Milvus" },
];
