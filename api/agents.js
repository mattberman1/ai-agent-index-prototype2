const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { data: agents, error } = await supabase
        .from('agents')
        .select('*');
      
      if (error) throw error;
      return res.status(200).json(agents);
    }

    if (req.method === 'POST') {
      const agentData = req.body;
      
      const { data: agent, error } = await supabase
        .from('agents')
        .insert(agentData)
        .select()
        .single();
      
      if (error) throw error;
      return res.status(201).json(agent);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal Server Error',
      error: error.message 
    });
  }
};
