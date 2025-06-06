import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const AgentForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capabilities: '',
    languages: '',
    frameworks: '',
    githubUrl: '',
    website: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      capabilities: formData.capabilities.split(',').map(cap => cap.trim()),
      languages: formData.languages.split(',').map(lang => lang.trim()),
      frameworks: formData.frameworks.split(',').map(frame => frame.trim()),
    });
    setFormData({
      name: '',
      description: '',
      capabilities: '',
      languages: '',
      frameworks: '',
      githubUrl: '',
      website: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Agent</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
            <TextField
              name="capabilities"
              label="Capabilities (comma-separated)"
              value={formData.capabilities}
              onChange={handleChange}
              helperText="Example: language processing, image recognition"
            />
            <TextField
              name="languages"
              label="Languages (comma-separated)"
              value={formData.languages}
              onChange={handleChange}
              helperText="Example: Python, JavaScript"
            />
            <TextField
              name="frameworks"
              label="Frameworks (comma-separated)"
              value={formData.frameworks}
              onChange={handleChange}
              helperText="Example: TensorFlow, React"
            />
            <TextField
              name="githubUrl"
              label="GitHub URL"
              value={formData.githubUrl}
              onChange={handleChange}
              helperText="Optional"
            />
            <TextField
              name="website"
              label="Website URL"
              value={formData.website}
              onChange={handleChange}
              helperText="Optional"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AgentForm;
