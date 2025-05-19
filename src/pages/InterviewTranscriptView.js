import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { researchData } from '../data/researchData';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Toolbar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const InterviewTranscriptView = ({ companyId, companyData /* Passed from App.js if needed for context, but not used here yet */ }) => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // To get query params for back navigation

  const interview = researchData.interviews.find(i => i.id === interviewId);

  const handleBackToInsights = () => {
    // Navigate back to the main insights page, preserving company/project context
    navigate(`/insights${location.search}`);
  };

  if (!interview) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" component="h1" gutterBottom>
            Interview Not Found
          </Typography>
          <Button variant="contained" onClick={handleBackToInsights}>
            Back to Insights Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}> {/* Reduced top margin slightly */}
      {/* Custom Toolbar for Back Button and Title */}
      <Paper elevation={1} sx={{ mb: 2, borderRadius: '4px' }}>
        <Toolbar disableGutters sx={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <IconButton onClick={handleBackToInsights} edge="start" color="primary" aria-label="back to insights">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ ml: 2, flexGrow: 1 }}>
            Interview: {interview.participant} ({interview.date})
          </Typography>
        </Toolbar>
      </Paper>
      
      <Paper elevation={0} sx={{ p: 3, whiteSpace: 'pre-wrap', border: '1px solid #e0e0e0' }}>
        <Typography variant="body1" component="div">
          {interview.transcript}
        </Typography>
      </Paper>
    </Container>
  );
};

export default InterviewTranscriptView; 