const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hkphafghhkfkawjawmaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrcGhhZmdoaGtma2F3amF3bWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzU4NzAsImV4cCI6MjA2NDc1MTg3MH0.yUW9wxaDwEgEBTvdb-_s4TUDL5oh9T00k-6NM7sxMtQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  try {
    // Delete test agent
    const { error: deleteError } = await supabase
      .from('agents')
      .delete()
      .eq('name', 'Test Agent');

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return;
    }

    console.log('Test agent deleted successfully');

    // Fetch all agents to verify
    const { data: agents, error: fetchError } = await supabase
      .from('agents')
      .select('*');

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return;
    }

    console.log('All agents:', agents);

  } catch (error) {
    console.error('Database error:', error);
  }
}

testDatabase();
