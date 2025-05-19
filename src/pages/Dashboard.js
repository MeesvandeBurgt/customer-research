import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Removed mockProjects, will use companyData

function Dashboard({ companyId, companyData }) { // Destructure props
  const navigate = useNavigate();

  const projectsToShow = companyData ? companyData.projects : [];

  const handleStartNewProject = () => {
    // Ensure companyId is part of the navigation for a new project
    navigate(companyId ? `/briefing?company=${companyId}` : '/briefing'); 
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h4" component="h1">
            {companyData ? `${companyData.companyName} Projects` : 'Projects Overview'}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleStartNewProject}
            size="large"
            disabled={!companyId} // Optionally disable if no company context
          >
            Start New Project
          </Button>
        </Grid>
      </Grid>

      {companyId && projectsToShow.length > 0 ? (
        <Paper elevation={2}>
          <List>
            {projectsToShow.map((project, index) => (
              <React.Fragment key={project.id}>
                {/* Navigate with companyId and projectId */}
                <ListItem alignItems="flex-start" button onClick={() => navigate(`/briefing?company=${companyId}&projectId=${project.id}`)}>
                  <ListItemText
                    primary={<Typography variant="h6">{project.title}</Typography>}
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={(
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                        >
                          Last Updated: {project.date}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {project.description}
                        </Typography>
                      </>
                    )}
                  />
                </ListItem>
                {index < projectsToShow.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : companyId ? (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No projects yet for {companyData?.companyName}.
          </Typography>
          <Typography color="text.secondary">
            Click "Start New Project" to begin your first research for this company.
          </Typography>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Welcome!
          </Typography>
          <Typography color="text.secondary">
            Please select a company context to view projects (e.g., add ?company=claireundgeorge to the URL).
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default Dashboard; 