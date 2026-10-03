/**
 * GitHub Top 100 Organizations & Open-Source Titans Dataset
 * 
 * Sized and weighted by global repository stars, community contributors, and impact.
 * Language colors mapped to official programming language palettes.
 */

export interface GitHubOrg {
  id: string;
  name: string;
  login: string;
  stars: number;
  language: string;
  url: string;
  description: string;
}

/**
 * Standard Language Color Mapping
 */
export const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3776ab",
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Go: "#00add8",
  Rust: "#ce422b",
  "C++": "#00599c",
  C: "#555555",
  Java: "#007396",
  PHP: "#777bb4",
  Ruby: "#cc342d",
  Swift: "#f05138",
  Kotlin: "#7f52ff",
  Dart: "#0175c2",
  Shell: "#89e051",
  Lua: "#000080",
  Zig: "#ec915c",
  Elixir: "#6e4a7e",
  Default: "#00d4ff",
};

export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] || LANGUAGE_COLORS.Default;
}

/**
 * GitHub Top 100 Organizations Dataset
 */
export const GITHUB_TOP_100_ORGS: GitHubOrg[] = [
  { id: "freecodecamp", name: "freeCodeCamp", login: "freeCodeCamp", stars: 405000, language: "TypeScript", url: "https://github.com/freeCodeCamp", description: "Open source community & free coding curriculum" },
  { id: "microsoft", name: "Microsoft", login: "microsoft", stars: 395000, language: "TypeScript", url: "https://github.com/microsoft", description: "VS Code, TypeScript, PowerToys, Playwright" },
  { id: "facebook", name: "Meta Open Source", login: "facebook", stars: 360000, language: "JavaScript", url: "https://github.com/facebook", description: "React, React Native, PyTorch, Jest" },
  { id: "torvalds", name: "Linux", login: "torvalds", stars: 195000, language: "C", url: "https://github.com/torvalds", description: "Linux Kernel source tree" },
  { id: "openai", name: "OpenAI", login: "openai", stars: 220000, language: "Python", url: "https://github.com/openai", description: "Whisper, GPT, Triton, Gym" },
  { id: "vuejs", name: "Vue.js", login: "vuejs", stars: 210000, language: "TypeScript", url: "https://github.com/vuejs", description: "Progressive JavaScript framework" },
  { id: "tensorflow", name: "TensorFlow", login: "tensorflow", stars: 188000, language: "C++", url: "https://github.com/tensorflow", description: "Machine learning platform for everyone" },
  { id: "vercel", name: "Vercel", login: "vercel", stars: 130000, language: "TypeScript", url: "https://github.com/vercel", description: "Next.js, Turbopack, AI SDK, SWR" },
  { id: "twbs", name: "Bootstrap", login: "twbs", stars: 170000, language: "JavaScript", url: "https://github.com/twbs", description: "The most popular HTML, CSS, and JS library" },
  { id: "google", name: "Google", login: "google", stars: 280000, language: "Go", url: "https://github.com/google", description: "Kubernetes, Go, Guava, Material Design" },
  { id: "flutter", name: "Flutter", login: "flutter", stars: 168000, language: "Dart", url: "https://github.com/flutter", description: "Multi-platform UI toolkit by Google" },
  { id: "nodejs", name: "Node.js", login: "nodejs", stars: 110000, language: "JavaScript", url: "https://github.com/nodejs", description: "JavaScript runtime built on V8 engine" },
  { id: "rust-lang", name: "Rust", login: "rust-lang", stars: 102000, language: "Rust", url: "https://github.com/rust-lang", description: "Empowering everyone to build reliable and efficient software" },
  { id: "golang", name: "Go Language", login: "golang", stars: 125000, language: "Go", url: "https://github.com/golang", description: "The Go programming language" },
  { id: "python", name: "Python", login: "python", stars: 65000, language: "Python", url: "https://github.com/python", description: "The Python programming language" },
  { id: "kubernetes", name: "Kubernetes", login: "kubernetes", stars: 115000, language: "Go", url: "https://github.com/kubernetes", description: "Production-grade container orchestration" },
  { id: "docker", name: "Docker", login: "docker", stars: 75000, language: "Go", url: "https://github.com/docker", description: "Empowering app delivery with containers" },
  { id: "huggingface", name: "Hugging Face", login: "huggingface", stars: 140000, language: "Python", url: "https://github.com/huggingface", description: "Transformers, Datasets, Open ML ecosystem" },
  { id: "pytorch", name: "PyTorch", login: "pytorch", stars: 92000, language: "Python", url: "https://github.com/pytorch", description: "Tensors and dynamic neural networks in Python" },
  { id: "tailwindlabs", name: "Tailwind Labs", login: "tailwindlabs", stars: 85000, language: "TypeScript", url: "https://github.com/tailwindlabs", description: "Utility-first CSS framework & Headless UI" },
  { id: "shadcn-ui", name: "shadcn/ui", login: "shadcn-ui", stars: 78000, language: "TypeScript", url: "https://github.com/shadcn-ui", description: "Beautifully designed components that you copy and paste" },
  { id: "supabase", name: "Supabase", login: "supabase", stars: 76000, language: "TypeScript", url: "https://github.com/supabase", description: "The open source Firebase alternative" },
  { id: "denoland", name: "Deno", login: "denoland", stars: 97000, language: "Rust", url: "https://github.com/denoland", description: "Modern, secure runtime for JavaScript & TypeScript" },
  { id: "fastapi", name: "FastAPI", login: "tiangolo", stars: 82000, language: "Python", url: "https://github.com/tiangolo", description: "Modern, fast web framework for building APIs with Python" },
  { id: "electron", name: "Electron", login: "electron", stars: 118000, language: "C++", url: "https://github.com/electron", description: "Build cross-platform desktop apps with web technologies" },
  { id: "langchain-ai", name: "LangChain", login: "langchain-ai", stars: 96000, language: "Python", url: "https://github.com/langchain-ai", description: "Building context-aware LLM applications" },
  { id: "vitejs", name: "Vite", login: "vitejs", stars: 72000, language: "TypeScript", url: "https://github.com/vitejs", description: "Next generation frontend tooling" },
  { id: "redis", name: "Redis", login: "redis", stars: 68000, language: "C", url: "https://github.com/redis", description: "In-memory database and caching system" },
  { id: "tauri-apps", name: "Tauri", login: "tauri-apps", stars: 84000, language: "Rust", url: "https://github.com/tauri-apps", description: "Build tiny, fast, and secure desktop and mobile apps" },
  { id: "ollama", name: "Ollama", login: "ollama", stars: 110000, language: "Go", url: "https://github.com/ollama", description: "Get up and running with large language models locally" },
  { id: "vllm-project", name: "vLLM", login: "vllm-project", stars: 39000, language: "Python", url: "https://github.com/vllm-project", description: "High-throughput and memory-efficient LLM serving" },
  { id: "apache", name: "Apache Software Foundation", login: "apache", stars: 145000, language: "Java", url: "https://github.com/apache", description: "Spark, Kafka, Flink, Cassandra, Lucene" },
  { id: "grafana", name: "Grafana Labs", login: "grafana", stars: 64000, language: "TypeScript", url: "https://github.com/grafana", description: "Observability and data visualization dashboards" },
  { id: "hashicorp", name: "HashiCorp", login: "hashicorp", stars: 45000, language: "Go", url: "https://github.com/hashicorp", description: "Terraform, Vault, Consul, Nomad" },
  { id: "elastic", name: "Elastic", login: "elastic", stars: 71000, language: "Java", url: "https://github.com/elastic", description: "Elasticsearch, Kibana, Beats, Logstash" },
  { id: "ansible", name: "Ansible", login: "ansible", stars: 63000, language: "Python", url: "https://github.com/ansible", description: "Radically simple IT automation platform" },
  { id: "homebrew", name: "Homebrew", login: "Homebrew", stars: 42000, language: "Ruby", url: "https://github.com/Homebrew", description: "The Missing Package Manager for macOS (or Linux)" },
  { id: "storybookjs", name: "Storybook", login: "storybookjs", stars: 85000, language: "TypeScript", url: "https://github.com/storybookjs", description: "Frontend workshop for building UI components" },
  { id: "strapi", name: "Strapi", login: "strapi", stars: 66000, language: "JavaScript", url: "https://github.com/strapi", description: "Open source Node.js Headless CMS" },
  { id: "prisma", name: "Prisma", login: "prisma", stars: 41000, language: "TypeScript", url: "https://github.com/prisma", description: "Next-generation ORM for Node.js and TypeScript" },
  { id: "airbnb", name: "Airbnb", login: "airbnb", stars: 142000, language: "JavaScript", url: "https://github.com/airbnb", description: "JavaScript Style Guide & Lottie" },
  { id: "git", name: "Git", login: "git", stars: 55000, language: "C", url: "https://github.com/git", description: "Fast, scalable, distributed revision control system" },
  { id: "neovim", name: "Neovim", login: "neovim", stars: 84000, language: "C", url: "https://github.com/neovim", description: "Vim-fork focused on extensibility and usability" },
  { id: "numpy", name: "NumPy", login: "numpy", stars: 28000, language: "Python", url: "https://github.com/numpy", description: "Fundamental package for scientific computing with Python" },
  { id: "pandas-dev", name: "pandas", login: "pandas-dev", stars: 45000, language: "Python", url: "https://github.com/pandas-dev", description: "Flexible and powerful data analysis / manipulation library" },
  { id: "scikit-learn", name: "scikit-learn", login: "scikit-learn", stars: 60000, language: "Python", url: "https://github.com/scikit-learn", description: "Machine Learning in Python" },
  { id: "godotengine", name: "Godot Engine", login: "godotengine", stars: 91000, language: "C++", url: "https://github.com/godotengine", description: "Multi-platform 2D and 3D game engine" },
  { id: "ffmpeg", name: "FFmpeg", login: "FFmpeg", stars: 49000, language: "C", url: "https://github.com/FFmpeg", description: "Cross-platform solution to record, convert and stream audio and video" },
  { id: "curl", name: "cURL", login: "curl", stars: 36000, language: "C", url: "https://github.com/curl", description: "Command line tool and library for transferring data with URLs" },
  { id: "oven-sh", name: "Bun", login: "oven-sh", stars: 76000, language: "Zig", url: "https://github.com/oven-sh", description: "Incredibly fast all-in-one JavaScript runtime & toolkit" },
  { id: "astral-sh", name: "Astral (uv & ruff)", login: "astral-sh", stars: 48000, language: "Rust", url: "https://github.com/astral-sh", description: "Extremely fast Python linter, formatter, and package manager" },
  { id: "biomejs", name: "Biome", login: "biomejs", stars: 20000, language: "Rust", url: "https://github.com/biomejs", description: "One toolchain for your web project" },
  { id: "tanstack", name: "TanStack", login: "TanStack", stars: 47000, language: "TypeScript", url: "https://github.com/TanStack", description: "Headless UI libraries for React, Vue, Svelte, Solid" },
  { id: "trpc", name: "tRPC", login: "trpc", stars: 36000, language: "TypeScript", url: "https://github.com/trpc", description: "Move fast and break nothing. End-to-end typesafe APIs" },
  { id: "remix-run", name: "Remix", login: "remix-run", stars: 30000, language: "TypeScript", url: "https://github.com/remix-run", description: "Full stack web framework focused on web standards" },
  { id: "sveltejs", name: "Svelte", login: "sveltejs", stars: 81000, language: "TypeScript", url: "https://github.com/sveltejs", description: "Cybernetically enhanced web apps" },
  { id: "angular", name: "Angular", login: "angular", stars: 96000, language: "TypeScript", url: "https://github.com/angular", description: "The modern web developer's platform" },
  { id: "nestjs", name: "NestJS", login: "nestjs", stars: 69000, language: "TypeScript", url: "https://github.com/nestjs", description: "A progressive Node.js framework for building scalable apps" },
  { id: "expressjs", name: "Express", login: "expressjs", stars: 65000, language: "JavaScript", url: "https://github.com/expressjs", description: "Fast, unopinionated, minimalist web framework for Node.js" },
  { id: "axios", name: "Axios", login: "axios", stars: 106000, language: "JavaScript", url: "https://github.com/axios", description: "Promise based HTTP client for the browser and node.js" },
  { id: "reduxjs", name: "Redux", login: "reduxjs", stars: 61000, language: "TypeScript", url: "https://github.com/reduxjs", description: "Predictable state container for JavaScript apps" },
  { id: "opencv", name: "OpenCV", login: "opencv", stars: 80000, language: "C++", url: "https://github.com/opencv", description: "Open Source Computer Vision Library" },
  { id: "protocolbuffers", name: "Protocol Buffers", login: "protocolbuffers", stars: 65000, language: "C++", url: "https://github.com/protocolbuffers", description: "Google's data interchange format" },
  { id: "ziglang", name: "Zig", login: "ziglang", stars: 37000, language: "Zig", url: "https://github.com/ziglang", description: "General-purpose programming language and toolchain" },
  { id: "elixir-lang", name: "Elixir", login: "elixir-lang", stars: 24000, language: "Elixir", url: "https://github.com/elixir-lang", description: "Dynamic, functional language for building scalable applications" },
  { id: "rails", name: "Ruby on Rails", login: "rails", stars: 56000, language: "Ruby", url: "https://github.com/rails", description: "Ruby on Rails web framework" },
  { id: "laravel", name: "Laravel", login: "laravel", stars: 79000, language: "PHP", url: "https://github.com/laravel", description: "A Web Framework For Web Artisans" },
  { id: "spring-projects", name: "Spring", login: "spring-projects", stars: 75000, language: "Java", url: "https://github.com/spring-projects", description: "Spring Boot and Spring Framework" },
  { id: "duckdb", name: "DuckDB", login: "duckdb", stars: 28000, language: "C++", url: "https://github.com/duckdb", description: "An analytical in-process SQL database management system" },
  { id: "clickhouse", name: "ClickHouse", login: "ClickHouse", stars: 40000, language: "C++", url: "https://github.com/ClickHouse", description: "Fast open-source OLAP database management system" },
  { id: "cockroachdb", name: "CockroachDB", login: "cockroachdb", stars: 30000, language: "Go", url: "https://github.com/cockroachdb", description: "Cloud-native, distributed SQL database" },
  { id: "qdrant", name: "Qdrant", login: "qdrant", stars: 22000, language: "Rust", url: "https://github.com/qdrant", description: "Vector Database for the next generation of AI applications" },
  { id: "chroma-core", name: "Chroma", login: "chroma-core", stars: 17000, language: "Python", url: "https://github.com/chroma-core", description: "The AI-native open-source embedding database" },
  { id: "milvus-io", name: "Milvus", login: "milvus-io", stars: 33000, language: "Go", url: "https://github.com/milvus-io", description: "Cloud-native vector database built for scalable vector ANN search" },
  { id: "postmanlabs", name: "Postman", login: "postmanlabs", stars: 32000, language: "JavaScript", url: "https://github.com/postmanlabs", description: "Newman and developer tooling for API platforms" },
  { id: "apollographql", name: "Apollo GraphQL", login: "apollographql", stars: 30000, language: "TypeScript", url: "https://github.com/apollographql", description: "The Apollo GraphQL data architecture" },
  { id: "graphql", name: "GraphQL", login: "graphql", stars: 20000, language: "TypeScript", url: "https://github.com/graphql", description: "A query language for your API" },
  { id: "tmux", name: "tmux", login: "tmux", stars: 38000, language: "C", url: "https://github.com/tmux", description: "Terminal multiplexer workspace engine" },
  { id: "valkey-io", name: "Valkey", login: "valkey-io", stars: 18000, language: "C", url: "https://github.com/valkey-io", description: "A high performance key/value datastore under BSD license" },
  { id: "torproject", name: "Tor Project", login: "torproject", stars: 15000, language: "C", url: "https://github.com/torproject", description: "Anonymity network and online privacy software" },
  { id: "gitpod-io", name: "Gitpod", login: "gitpod-io", stars: 13000, language: "TypeScript", url: "https://github.com/gitpod-io", description: "Standardizing developer environments" },
  { id: "qmk", name: "QMK Firmware", login: "qmk", stars: 17000, language: "C", url: "https://github.com/qmk", description: "Open-source keyboard firmware" },
  { id: "pallets", name: "Pallets", login: "pallets", stars: 70000, language: "Python", url: "https://github.com/pallets", description: "Flask, Jinja, Click, Werkzeug" },
  { id: "django", name: "Django", login: "django", stars: 80000, language: "Python", url: "https://github.com/django", description: "The Web framework for perfectionists with deadlines" },
  { id: "keras-team", name: "Keras", login: "keras-team", stars: 62000, language: "Python", url: "https://github.com/keras-team", description: "Deep Learning for humans" },
  { id: "matplotlib", name: "Matplotlib", login: "matplotlib", stars: 20000, language: "Python", url: "https://github.com/matplotlib", description: "Plotting with Python" },
  { id: "moby", name: "Moby Project", login: "moby", stars: 68000, language: "Go", url: "https://github.com/moby", description: "Collaborative project for the container ecosystem" },
  { id: "postgresql", name: "PostgreSQL", login: "postgres", stars: 16000, language: "C", url: "https://github.com/postgres", description: "The world's most advanced open source database" },
  { id: "gnuradio", name: "GNU Radio", login: "gnuradio", stars: 6000, language: "C++", url: "https://github.com/gnuradio", description: "Software Defined Radio toolkit" },
  { id: "automattic", name: "Automattic", login: "Automattic", stars: 22000, language: "PHP", url: "https://github.com/Automattic", description: "WordPress, WooCommerce, Gutenberg" },
  { id: "prettier", name: "Prettier", login: "prettier", stars: 49000, language: "JavaScript", url: "https://github.com/prettier", description: "Opinionated code formatter" },
  { id: "eslint", name: "ESLint", login: "eslint", stars: 25000, language: "JavaScript", url: "https://github.com/eslint", description: "Find and fix problems in your JavaScript code" },
  { id: "gatsbyjs", name: "Gatsby", login: "gatsbyjs", stars: 55000, language: "JavaScript", url: "https://github.com/gatsbyjs", description: "Build fast, secure sites on modern web architecture" },
  { id: "anthropics", name: "Anthropic", login: "anthropics", stars: 32000, language: "Python", url: "https://github.com/anthropics", description: "Claude SDK, Anthropic Quickstarts, Evaluation suites" },
  { id: "symfony", name: "Symfony", login: "symfony", stars: 30000, language: "PHP", url: "https://github.com/symfony", description: "The Symfony PHP framework" },
  { id: "threejs", name: "Three.js", login: "mrdoob", stars: 102000, language: "JavaScript", url: "https://github.com/mrdoob/three.js", description: "JavaScript 3D library" },
  { id: "chartjs", name: "Chart.js", login: "chartjs", stars: 64000, language: "JavaScript", url: "https://github.com/chartjs", description: "Simple yet flexible JavaScript charting for designers & developers" },
  { id: "d3", name: "D3.js", login: "d3", stars: 109000, language: "JavaScript", url: "https://github.com/d3", description: "Data-Driven Documents visualization library" },
  { id: "socketio", name: "Socket.IO", login: "socketio", stars: 61000, language: "TypeScript", url: "https://github.com/socketio", description: "Realtime application framework (Node.JS server)" },
  { id: "graphql-go", name: "GraphQL Go", login: "graphql-go", stars: 10000, language: "Go", url: "https://github.com/graphql-go", description: "An implementation of GraphQL for Go" }
];
