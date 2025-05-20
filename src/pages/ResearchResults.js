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
} from '@mui/material';
import { researchData } from '../data/researchData';

const ResearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('company');
  // const projectId = queryParams.get('projectId'); // Not used directly in this component for data fetching yet

  const companySpecificData = companyId ? researchData[companyId] : null;

  const handleInterviewClick = (interviewId) => {
    navigate(`/insights/interview/${interviewId}${location.search}`);
  };

  if (!companySpecificData) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" align="center">Please select a company to view research results.</Typography>
      </Container>
    );
  }

  // Destructure with default empty arrays to prevent .map errors if data is missing for a section
  const {
    opportunitiesForImprovement = [],
    keyThemes = [],
    businessAspects = [],
    interviews = []
  } = companySpecificData;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        User Research Insights
      </Typography>

      {/* Opportunities for Improvement */}
      {opportunitiesForImprovement.length > 0 && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            Opportunities for Improvement
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {opportunitiesForImprovement.map((opportunity) => (
              <Chip key={opportunity.id} label={opportunity.title} color="primary" variant="outlined" />
            ))}
          </Box>
        </Paper>
      )}

      {/* Key Themes */}
      {keyThemes.length > 0 && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            Key Themes
          </Typography>
          <Grid container spacing={3}>
            {keyThemes.map((theme) => (
              <Grid item xs={12} md={4} key={theme.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {theme.name} {/* Changed from theme.title based on data structure */}
                    </Typography>
                    {/* Assuming keyThemes might not have quote/attribution, conditionally render or adapt */}
                    {theme.description && (
                       <Typography variant="body2" color="text.secondary">
                         {theme.description}
                       </Typography>
                    )}
                    {theme.quote && theme.attribution && (
                      <>
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt:1, mb: 1 }}>
                          &ldquo;{theme.quote}&rdquo;
                        </Typography>
                        <Typography variant="caption" display="block" align="right">
                          - {theme.attribution}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {/* Business Aspects to Work On */}
      {businessAspects.length > 0 && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            Business Aspects to Focus On
          </Typography>
          <List>
            {businessAspects.map((aspect, index) => (
              <React.Fragment key={aspect.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={<Typography variant="subtitle1" component="strong">{aspect.name}</Typography>}
                    secondary={<Typography variant="body2" color="text.secondary">{aspect.description}</Typography>}
                  />
                </ListItem>
                {index < businessAspects.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Interviews Section */}
      {interviews.length > 0 && (
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            Interviews
          </Typography>
          <Grid container spacing={3}>
            {interviews.map((interview) => (
              <Grid item xs={12} md={4} key={interview.id}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea onClick={() => handleInterviewClick(interview.id)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {interview.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                        Date: {interview.date}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                        {interview.transcript || interview.summary}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

    </Container>
  );
};

export default ResearchResults; 