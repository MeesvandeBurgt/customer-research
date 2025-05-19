import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Grid,
  Button // Added Button for potential future use, not strictly needed for this exact layout yet
} from '@mui/material';
import { researchData } from '../data/researchData';

const ResearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To preserve company/project query params

  const handleInterviewClick = (interviewId) => {
    // Preserve existing query parameters (company, projectId)
    navigate(`/insights/interview/${interviewId}${location.search}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        User Research Insights
      </Typography>

      {/* Opportunities for Improvement */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
          Opportunities for Improvement
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {researchData.opportunitiesForImprovement.map((opportunity) => (
            <Chip key={opportunity.id} label={opportunity.title} color="primary" variant="outlined" />
          ))}
        </Box>
      </Paper>

      {/* Key Themes */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
          Key Themes
        </Typography>
        <Grid container spacing={3}>
          {researchData.keyThemes.map((theme) => (
            <Grid item xs={12} md={4} key={theme.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {theme.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                    &ldquo;{theme.quote}&rdquo;
                  </Typography>
                  <Typography variant="caption" display="block" align="right">
                    - {theme.attribution}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Business Aspects to Work On */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
          Business Aspects to Focus On
        </Typography>
        <List>
          {researchData.businessAspects.map((aspect, index) => (
            <React.Fragment key={aspect.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography variant="subtitle1" component="strong">{aspect.aspect}</Typography>}
                  secondary={<Typography variant="body2" color="text.secondary">{aspect.whyItMatters}</Typography>}
                />
              </ListItem>
              {index < researchData.businessAspects.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Interviews Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
          Interview Summaries
        </Typography>
        <Grid container spacing={3}>
          {researchData.interviews.map((interview) => (
            <Grid item xs={12} md={4} key={interview.id}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => handleInterviewClick(interview.id)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {interview.participant}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Date: {interview.date}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {interview.preview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

    </Container>
  );
};

export default ResearchResults; 