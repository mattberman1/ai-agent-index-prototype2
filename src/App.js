import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  InputAdornment,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import AgentCard from './components/AgentCard';
import AgentForm from './components/AgentForm';
import theme from './theme';

function App() {
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('https://ai-agent-index-prototype2.vercel.app/api/agents');
      const data = await response.json();
      setAgents(data);
      setFilteredAgents(data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchAgents();
      return;
    }
    
    try {
      const response = await fetch(`https://ai-agent-index-prototype2.vercel.app/api/agents/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setFilteredAgents(data);
    } catch (error) {
      console.error('Error searching agents:', error);
    }
  };

  const handleAddAgent = async (agentData) => {
    try {
      const response = await fetch('http://localhost:4000/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });
      if (response.ok) {
        fetchAgents();
      }
    } catch (error) {
      console.error('Error adding agent:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ px: 4 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 600,
                color: 'primary.main'
              }}
            >
              AI Agent Catalog
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setOpenForm(true)}
              sx={{
                borderRadius: 12,
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Add Agent
            </Button>
          </Toolbar>
        </AppBar>

        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: 4,
            mb: 4,
            px: { xs: 2, sm: 4, md: 6 }
          }}
        >
          <Paper 
            sx={{ 
              p: 3,
              mb: 4,
              borderRadius: 12,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              bgcolor: 'background.paper'
            }}
          >
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'divider',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '12px 14px',
                  },
                }}
              />
            </form>
          </Paper>

          <Grid 
            container 
            spacing={3}
            sx={{ 
              mb: 4,
              pt: 2
            }}
          >
            {filteredAgents.map((agent) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={agent.id}
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <AgentCard agent={agent} />
              </Grid>
            ))}
          </Grid>
        </Container>

        <AgentForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSubmit={handleAddAgent}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
