import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Dashboard from './pages/Dashboard';
import ResearchResults from './pages/ResearchResults';
import Briefing from './pages/Briefing';
import InterviewTranscriptView from './pages/InterviewTranscriptView';
import { companyDataStore } from './data/companyData'; // Import company data

const drawerWidthOpen = 240;
const drawerWidthClosed = 60;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});

const openedMixin = (theme) => ({
  width: drawerWidthOpen,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 5,
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidthOpen,
    width: `calc(100% - ${drawerWidthOpen}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: drawerWidthClosed,
    width: `calc(100% - ${drawerWidthClosed}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidthOpen,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: theme.zIndex.drawer + 10,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isInsightsEnabled, setIsInsightsEnabled] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get('company');
  const projectId = queryParams.get('projectId');
  const currentCompanyData = companyId ? companyDataStore[companyId] : null;
  
  // useEffect(() => {
  //   if (companyId && projectId) {
  //     const storedInsightsEnabled = localStorage.getItem(`insightsEnabled_${companyId}_${projectId}`);
  //     if (storedInsightsEnabled === 'true') {
  //       setIsInsightsEnabled(true);
  //     } else {
  //       setIsInsightsEnabled(false);
  //     }
  //   } else {
  //     setIsInsightsEnabled(false);
  //   }
  // }, [companyId, projectId, location.search]); // Commented out to prevent loading from localStorage on refresh

  // When companyId or projectId changes, reset isInsightsEnabled unless specifically set by a flow
  // This ensures that navigating to a new project doesn't inherit the enabled state.
  useEffect(() => {
    setIsInsightsEnabled(false); // Default to false when context changes
    // If there was a mechanism to immediately check if *this specific new project* should have insights enabled
    // (e.g., from a non-localStorage persisted source, or if handleStartResearchFlow was called for it *before* this effect runs),
    // that logic would need to be more sophisticated. For now, new projects start with insights disabled.
  }, [companyId, projectId]);

  let pageTitle = currentCompanyData ? currentCompanyData.companyName : "Customer Insights Platform";
  if (location.pathname === '/briefing' || location.pathname === '/insights') {
    if (projectId) {
      const project = currentCompanyData?.projects?.find(p => p.id === projectId);
      if (project) {
        pageTitle = `${currentCompanyData.companyName} - ${project.title}`;
      } else {
        pageTitle = `${currentCompanyData.companyName} - New Project`;
      }
    } else {
      pageTitle = companyId ? `${companyDataStore[companyId]?.companyName || companyId} - New Project` : "Select a Project";
    }
  }

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);
  const handleNavigation = (path) => navigate(path);
  const isProjectPage = location.pathname === '/briefing' || location.pathname === '/insights';

  const handleStartResearchFlow = () => {
    setIsInsightsEnabled(true);
    // We still save to localStorage so that SPA navigations *within the same session* can pick it up if needed by other logic
    // or if we were to re-enable loading from it. But it won't be used on refresh.
    if (companyId && projectId) {
      localStorage.setItem(`insightsEnabled_${companyId}_${projectId}`, 'true');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {isProjectPage && currentCompanyData && (
          <AppBar position="fixed" open={openDrawer}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div" sx={{ flexShrink: 0 }}>
                {pageTitle}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: 'flex' }}>
                <Button 
                  color={location.pathname === '/briefing' ? "primary" : "inherit"} 
                  component={RouterLink} 
                  to={`/briefing?company=${companyId}${projectId ? `&projectId=${projectId}` : ''}`}
                  sx={{ fontWeight: location.pathname === '/briefing' ? 'bold' : 'normal' }}
                >
                  Briefing
                </Button>
                <Button 
                  color={location.pathname === '/insights' ? "primary" : "inherit"} 
                  component={RouterLink} 
                  to={`/insights?company=${companyId}${projectId ? `&projectId=${projectId}` : ''}`}
                  sx={{ fontWeight: location.pathname === '/insights' ? 'bold' : 'normal' }}
                  disabled={!isInsightsEnabled}
                >
                  Insights
                </Button>
              </Box>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }} />
            </Toolbar>
          </AppBar>
        )}

        <Drawer variant="permanent" open={openDrawer} onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
          <Toolbar />
          <Box sx={{
            overflow: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}>
            <List>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => handleNavigation(companyId ? `/?company=${companyId}` : '/')}
                  sx={{ minHeight: 48, justifyContent: openDrawer ? 'initial' : 'center', px: 2.5, }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: openDrawer ? 3 : 'auto', justifyContent: 'center' }}>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Projects Overview" sx={{ opacity: openDrawer ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: `calc(100% - ${openDrawer ? drawerWidthOpen : drawerWidthClosed}px)` }}
        >
          {isProjectPage && <Toolbar />}
          <Routes>
            <Route path="/" element={<Dashboard companyId={companyId} companyData={currentCompanyData} />} />
            <Route path="/briefing" element={<Briefing companyId={companyId} companyData={currentCompanyData} onStartResearch={handleStartResearchFlow} />} />
            <Route path="/insights" element={<ResearchResults companyId={companyId} companyData={currentCompanyData} />} />
            <Route path="/insights/interview/:interviewId" element={<InterviewTranscriptView companyId={companyId} companyData={currentCompanyData} />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

