const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.get('/api/agents', async (req, res) => {
  try {
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*');
    
    if (error) throw error;
    res.json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ message: 'Error fetching agents' });
  }
});

app.get('/api/agents/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.json([]);
    }
    
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*')
      .or(`name.ilike.*${query}*,description.ilike.*${query}*`);
    
    if (error) throw error;
    res.json(agents || []);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching agents' });
  }
});

app.post('/api/agents', async (req, res) => {
  try {
    const { data: agent, error } = await supabase
      .from('agents')
      .insert(req.body)
      .select()
      .single();
    
    if (error) throw error;
    res.status(201).json(agent);
  } catch (error) {
    console.error('Error adding agent:', error);
    res.status(400).json({ message: 'Error adding agent' });
  }
});

module.exports = app;
