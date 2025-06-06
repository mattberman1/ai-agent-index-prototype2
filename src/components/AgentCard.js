import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import CodeIcon from '@mui/icons-material/Code';

const AgentCard = ({ agent }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: 8,
        overflow: 'visible'
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{ 
                bgcolor: 'primary.main',
                width: 48,
                height: 48,
                fontSize: '1.25rem'
              }}
            >
              {agent.name.charAt(0)}
            </Avatar>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              {agent.name}
            </Typography>
          </Stack>

          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ 
              fontSize: '1.1rem',
              lineHeight: 1.5
            }}
          >
            {agent.description}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {agent.capabilities?.map((capability, index) => (
              <Chip
                key={index}
                label={capability}
                size="small"
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  borderRadius: 1,
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}
              />
            ))}
          </Stack>

          <Divider sx={{ my: 2, borderColor: 'divider' }} />

          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CodeIcon sx={{ color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                {agent.languages?.join(', ')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LinkIcon sx={{ color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                {agent.frameworks?.join(', ')}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            {agent.githubUrl && (
              <IconButton 
                href={agent.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ p: 0 }}
              >
                <GitHubIcon sx={{ color: 'primary.main' }} />
              </IconButton>
            )}
            {agent.website && (
              <IconButton 
                href={agent.website} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ p: 0 }}
              >
                <LinkIcon sx={{ color: 'primary.main' }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
