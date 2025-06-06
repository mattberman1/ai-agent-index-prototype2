const { createClient } = require('@supabase/supabase-js');

// Supabase client
const supabaseUrl = 'https://hkphafghhkfkawjawmaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrcGhhZmdoaGtma2F3amF3bWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzU4NzAsImV4cCI6MjA2NDc1MTg3MH0.yUW9wxaDwEgEBTvdb-_s4TUDL5oh9T00k-6NM7sxMtQ';
const supabase = createClient(supabaseUrl, supabaseKey);

// Top AI Agents data
const agents = [
  {
    name: "AutoGPT",
    description: "A comprehensive framework for building and using AI agents with tools for agent creation, performance evaluation, and management",
    capabilities: ["Agent Creation", "Performance Evaluation", "UI/CLI Integration", "Local Execution"],
    languages: ["Python"],
    frameworks: ["Forge", "agbenchmark"],
    github_url: "https://github.com/Significant-Gravitas/AutoGPT",
    website: "https://github.com/Significant-Gravitas/AutoGPT"
  },
  {
    name: "Ollama",
    description: "A tool for running large language models locally with support for macOS, Windows, Linux, and Docker",
    capabilities: ["Local Model Execution", "Model Management", "Customization"],
    languages: ["Go"],
    frameworks: [""],
    github_url: "https://github.com/ollama/ollama",
    website: "https://ollama.ai"
  },
  {
    name: "LangChain",
    description: "A framework for building context-aware reasoning applications with integrated libraries and developer tools",
    capabilities: ["Context-Aware Reasoning", "LLM Integration", "Chat Models", "Data Analysis"],
    languages: ["Python"],
    frameworks: ["LangChain Tools"],
    github_url: "https://github.com/langchain-ai/langchain",
    website: "https://python.langchain.com"
  },
  {
    name: "Lobe Chat",
    description: "An open-source UI framework for building ChatGPT/LLM-based chat applications with modern design and extensible plugins",
    capabilities: ["Chat Interface", "Speech Synthesis", "Multi-Modal Support", "Plugin System"],
    languages: ["TypeScript"],
    frameworks: ["React"],
    github_url: "https://github.com/lobehub/lobe-chat",
    website: "https://lobehub.com"
  },
  {
    name: "Open Interpreter",
    description: "A coding agent that enables natural-language interaction with your computer's capabilities, including local code execution",
    capabilities: ["Code Execution", "Natural Language Processing", "System Control", "Keyboard/Mouse Control"],
    languages: ["Python"],
    frameworks: [""],
    github_url: "https://github.com/OpenInterpreter/open-interpreter",
    website: "https://openinterpreter.com"
  },
  {
    name: "PrivateGPT",
    description: "A secure, offline-capable AI tool for querying documents with Large Language Models",
    capabilities: ["Document Querying", "Local Processing", "API Integration"],
    languages: ["Python"],
    frameworks: [""],
    github_url: "https://github.com/zylon-ai/private-gpt",
    website: "https://github.com/zylon-ai/private-gpt"
  },
  {
    name: "MetaGPT",
    description: "A multi-agent framework enabling GPT models to collaborate within a software company structure",
    capabilities: ["Multi-Agent Collaboration", "Role Assignment", "Task Management"],
    languages: ["Python"],
    frameworks: [""],
    github_url: "https://github.com/geekan/MetaGPT",
    website: "https://github.com/geekan/MetaGPT"
  },
  {
    name: "GPT Engineer",
    description: "An AI-powered tool for natural language software specification and automatic code generation",
    capabilities: ["Code Generation", "Software Specification", "Collaboration"],
    languages: ["Python"],
    frameworks: [""],
    github_url: "https://github.com/gpt-engineer-org/gpt-engineer",
    website: "https://gptengineer.com"
  }
];

// Add agents to database
async function addAgents() {
  try {
    // Insert agents
    const { error } = await supabase
      .from('agents')
      .insert(agents);
    
    if (error) throw error;
    console.log(`Successfully added ${agents.length} agents to the database`);
  } catch (error) {
    console.error('Error adding agents:', error);
  }
}

addAgents();
