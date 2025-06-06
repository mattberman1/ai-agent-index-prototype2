const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(200).json([]);
    }
    
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .or(`name.ilike.*${query}*,description.ilike.*${query}*`);
    
    if (error) throw error;
    return res.status(200).json(agents || []);
  } catch (error) {
    console.error('Search Error:', error);
    return res.status(500).json({ 
      message: 'Internal Server Error',
      error: error.message 
    });
  }
};
