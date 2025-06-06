const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');

// Supabase client
const supabaseUrl = 'https://hkphafghhkfkawjawmaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrcGhhZmdoaGtma2F3amF3bWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzU4NzAsImV4cCI6MjA2NDc1MTg3MH0.yUW9wxaDwEgEBTvdb-_s4TUDL5oh9T00k-6NM7sxMtQ';
const supabase = createClient(supabaseUrl, supabaseKey);

// List of sources to scrape
const SOURCES = [
  // GitHub Topics
  'https://github.com/topics/ai-agent',
  'https://github.com/topics/llm-agent',
  'https://github.com/topics/ai-framework',
  'https://github.com/topics/ai-toolkit',
  'https://github.com/topics/ai-platform',
  'https://github.com/topics/llm-platform',
  'https://github.com/topics/ai-assistant',
  'https://github.com/topics/ai-chatbot',
  'https://github.com/topics/ai-automation',
  'https://github.com/topics/ai-tool',
  'https://github.com/topics/llm-application',
  'https://github.com/topics/ai-library',
  'https://github.com/topics/ai-service',
  'https://github.com/topics/ai-solution',
  'https://github.com/topics/ai-application',
  'https://github.com/topics/ai-platform',
  'https://github.com/topics/ai-development',
  'https://github.com/topics/ai-engine',
  
  // Awesome Lists
  'https://github.com/topics/awesome-ai',
  'https://github.com/topics/awesome-llm',
  'https://github.com/topics/awesome-chatgpt',
  'https://github.com/topics/awesome-llm-tools',
  
  // AI Agent Repositories
  'https://github.com/topics/agent-framework',
  'https://github.com/topics/agent-platform',
  'https://github.com/topics/agent-library',
  'https://github.com/topics/agent-toolkit',
  'https://github.com/topics/agent-service',
  'https://github.com/topics/agent-development',
  'https://github.com/topics/agent-engine',
  'https://github.com/topics/agent-solution',
  'https://github.com/topics/agent-application',
  'https://github.com/topics/agent-platform',
  'https://github.com/topics/agent-development',

  // GitLab Topics
  'https://gitlab.com/explore/projects?topic=ai-agent',
  'https://gitlab.com/explore/projects?topic=llm-agent',
  'https://gitlab.com/explore/projects?topic=ai-framework',
  'https://gitlab.com/explore/projects?topic=ai-toolkit',
  'https://gitlab.com/explore/projects?topic=ai-platform',

  // Bitbucket Repositories
  'https://bitbucket.org/repo/all?name=ai-agent',
  'https://bitbucket.org/repo/all?name=llm-agent',
  'https://bitbucket.org/repo/all?name=ai-framework',
  'https://bitbucket.org/repo/all?name=ai-toolkit',

  // RSS Feeds
  'https://aiagents.substack.com/feed',
  'https://llm.substack.com/feed',
  'https://ai-news.substack.com/feed',
  'https://ai-tools.substack.com/feed',

  // AI Agent Blogs
  'https://blog.openai.com/feed/',
  'https://blog.anthropic.com/feed/',
  'https://blog.cohere.com/feed/',
  'https://blog.deepseek.com/feed/',

  // AI Agent News
  'https://ai-agent-news.com/feed/',
  'https://llm-news.com/feed/',
  'https://ai-development.com/feed/',

  // AI Agent Communities
  'https://ai-agent-community.com/new',
  'https://llm-community.com/new',
  'https://ai-development-community.com/new',

  // Specific AI Agent Projects
  'https://github.com/topics/autogpt',
  'https://github.com/topics/ollama',
  'https://github.com/topics/langchain',
  'https://github.com/topics/openinterpreter',
  'https://github.com/topics/metagpt',
  'https://github.com/topics/gpt-engineer',
  'https://github.com/topics/privategpt',
  'https://github.com/topics/lobe-chat'
];

async function getExistingAgents() {
  const { data: agents, error } = await supabase
    .from('agents')
    .select('*');
  
  if (error) throw error;
  return agents || [];
}

async function scrapeGitHubTopic(topicUrl) {
  try {
    const response = await axios.get(topicUrl);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    
    const repos = Array.from(document.querySelectorAll('.topic-repo-list-item')).map(repo => {
      const title = repo.querySelector('.h3 a').textContent.trim();
      const description = repo.querySelector('.pinned-item-desc')?.textContent?.trim();
      const url = `https://github.com${repo.querySelector('.h3 a').getAttribute('href')}`;
      
      return {
        name: title,
        description: description || '',
        github_url: url
      };
    });
    
    return repos;
  } catch (error) {
    console.error(`Error scraping ${topicUrl}:`, error);
    return [];
  }
}

function extractAgentInfo(repo) {
  const capabilities = [];
  const languages = [];
  const frameworks = [];
  
  // Extract capabilities from description
  if (repo.description) {
    const desc = repo.description.toLowerCase();
    if (desc.includes('agent')) capabilities.push('Agent');
    if (desc.includes('framework')) capabilities.push('Framework');
    if (desc.includes('toolkit')) capabilities.push('Toolkit');
    if (desc.includes('automation')) capabilities.push('Automation');
    if (desc.includes('llm')) capabilities.push('LLM Integration');
    if (desc.includes('chat')) capabilities.push('Chat Interface');
  }
  
  return {
    name: repo.name,
    description: repo.description,
    capabilities: [...new Set(capabilities)],
    languages: languages,
    frameworks: frameworks,
    github_url: repo.github_url,
    website: repo.github_url
  };
}

async function addNewAgent(agent) {
  try {
    const { error } = await supabase
      .from('agents')
      .insert([agent]);
    
    if (error) throw error;
    console.log(`Added new agent: ${agent.name}`);
  } catch (error) {
    console.error(`Error adding agent ${agent.name}:`, error);
  }
}

async function main() {
  console.log('Starting AI Agent Scraper...');
  
  try {
    // Get existing agents
    const existingAgents = await getExistingAgents();
    const existingAgentNames = existingAgents.map(agent => agent.name.toLowerCase());
    
    // Scrape all sources
    const allRepos = [];
    for (const source of SOURCES) {
      const repos = await scrapeGitHubTopic(source);
      allRepos.push(...repos);
    }
    
    // Process and add new agents
    const newAgents = allRepos
      .map(repo => extractAgentInfo(repo))
      .filter(agent => !existingAgentNames.includes(agent.name.toLowerCase()));
    
    console.log(`Found ${newAgents.length} new agents to add`);
    
    for (const agent of newAgents) {
      await addNewAgent(agent);
    }
    
    console.log('Agent scraping completed successfully');
  } catch (error) {
    console.error('Error in main scraper:', error);
  }
}

// Run the scraper immediately
main();

// Set up daily cron job
const cron = require('node-cron');

cron.schedule('0 0 * * *', () => {
  console.log('Running daily agent scraper...');
  main();
});
