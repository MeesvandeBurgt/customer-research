import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';

function Briefing({ companyId, companyData, onStartResearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [currentProjectId, setCurrentProjectId] = useState(null); // Renamed for clarity
  const [isLoading, setIsLoading] = useState(false); // General loading state for async ops

  // New state variables for the flow
  const [proposalVisible, setProposalVisible] = useState(false);
  const [researchStarted, setResearchStarted] = useState(false);

  // Form fields state
  const [participants, setParticipants] = useState(10);
  const [companyInfo, setCompanyInfo] = useState('');
  const [learningObjectives, setLearningObjectives] = useState('');
  const [selectedRQ, setSelectedRQ] = useState('');

  // Effect to extract projectId from URL and load data from localStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectIdFromUrl = params.get('projectId');
    setCurrentProjectId(projectIdFromUrl);
    setIsLoading(true);

    let initialState = {
      companyInfo: '',
      learningObjectives: '',
      participants: 10,
      selectedRQ: '',
      proposalVisible: false,
      researchStarted: false,
    };

    if (companyData) {
      initialState.companyInfo = companyData.companyInfo || '';
      initialState.selectedRQ = companyData.potentialRQs && companyData.potentialRQs.length > 0 ? companyData.potentialRQs[0] : '';
      initialState.learningObjectives = initialState.selectedRQ;
    }

    if (projectIdFromUrl && companyData && companyData.projects) {
      const projectData = companyData.projects.find(p => p.id === projectIdFromUrl);
      if (projectData && projectData.briefingState) {
        initialState = { ...initialState, ...projectData.briefingState };
        if (companyData.potentialRQs?.includes(projectData.briefingState.learningObjectives)) {
             initialState.selectedRQ = projectData.briefingState.learningObjectives;
        } else if (projectData.briefingState.learningObjectives) {
            initialState.selectedRQ = 'custom'; 
        }
      }
    }
    
    if (companyId && projectIdFromUrl) {
      const proposalKey = `proposalVisible_${companyId}_${projectIdFromUrl}`;
      const researchKey = `researchStarted_${companyId}_${projectIdFromUrl}`;
      const savedProposalVisible = localStorage.getItem(proposalKey);
      const savedResearchStarted = localStorage.getItem(researchKey);

      if (savedProposalVisible === 'true') initialState.proposalVisible = true;
      if (savedResearchStarted === 'true') initialState.researchStarted = true;
      
      if (initialState.researchStarted) {
        initialState.proposalVisible = true;
        // If research was already started for this project, ensure App.js knows.
        if (onStartResearch) {
          onStartResearch();
        }
      }

      if (!initialState.researchStarted) {
        const formKey = `briefingData_${companyId}_${projectIdFromUrl}`;
        const savedFormData = localStorage.getItem(formKey);
        if (savedFormData) {
          try {
            const dataFromStorage = JSON.parse(savedFormData);
            initialState = { ...initialState, ...dataFromStorage };
          } catch (error) {
            console.error("Error parsing FORM data from localStorage:", error);
          }
        }
      }
    } else if (companyId && !projectIdFromUrl) {
        const draftKey = `briefingData_${companyId}_new`;
        const draftData = localStorage.getItem(draftKey);
        if (draftData) {
            try {
                const dataFromStorage = JSON.parse(draftData);
                initialState = { ...initialState, ...dataFromStorage };
            } catch (error) {
                console.error("Error parsing DRAFT data from localStorage:", error);
                localStorage.removeItem(draftKey); 
            }
        }
    }
    
    setCompanyInfo(initialState.companyInfo);
    setLearningObjectives(initialState.learningObjectives || ''); 
    setParticipants(initialState.participants);
    setSelectedRQ(initialState.selectedRQ || (companyData?.potentialRQs?.[0] || '')); 
    setProposalVisible(initialState.proposalVisible);
    setResearchStarted(initialState.researchStarted);

    setIsLoading(false);

  }, [location.search, companyId, companyData, onStartResearch]);

  // Effect to save data to localStorage
  useEffect(() => {
    if (!companyId || isLoading) return; // Don't save while initially loading

    // Save flow control states
    if (currentProjectId) {
      localStorage.setItem(`proposalVisible_${companyId}_${currentProjectId}`, proposalVisible);
      localStorage.setItem(`researchStarted_${companyId}_${currentProjectId}`, researchStarted);
    }

    // Save form data
    const formDataToSave = {
      companyInfo,
      learningObjectives,
      participants,
      selectedRQ 
      // Not saving proposalVisible/researchStarted here as they have dedicated keys
    };

    if (currentProjectId) { 
      localStorage.setItem(`briefingData_${companyId}_${currentProjectId}`, JSON.stringify(formDataToSave));
    } else { 
        // Logic for saving draft for a new project (before projectId is assigned)
        const isDirty = companyInfo !== (companyData?.companyInfo || '') || 
                        learningObjectives !== (selectedRQ || companyData?.potentialRQs?.[0] || '') || 
                        participants !== 10 ||
                        selectedRQ !== (companyData?.potentialRQs?.[0] || '');

        if (isDirty) {
            localStorage.setItem(`briefingData_${companyId}_new`, JSON.stringify(formDataToSave));
        }
    }
  }, [companyId, currentProjectId, companyInfo, learningObjectives, participants, selectedRQ, proposalVisible, researchStarted, companyData, isLoading]);

  const handleGenerateProposalClick = () => {
    setIsLoading(true); // Simulate async operation
    setTimeout(() => {
      setProposalVisible(true);
      setIsLoading(false);
    }, 500); // Short delay
  };

  const handleStartResearchClick = () => {
    setIsLoading(true);
    if (onStartResearch) {
      onStartResearch(); // Enable Insights tab globally
    }
    setResearchStarted(true);
    // Ensure proposal is also marked as visible if it wasn't (e.g., direct load to started state)
    if (!proposalVisible) setProposalVisible(true); 
    
    // Simulate saving/API call then navigate
    setTimeout(() => {
      setIsLoading(false);
      navigate(companyId ? `/insights?company=${companyId}${currentProjectId ? `&projectId=${currentProjectId}`: ''}` : '/insights'); 
    }, 300);
  };

  const handleRQChange = (event) => {
    const rq = event.target.value;
    setSelectedRQ(rq);
    // If 'custom' is not selected, update learning objectives. Otherwise, user types it.
    if (rq !== 'custom') {
        setLearningObjectives(rq); 
    } else {
        // Optionally clear learningObjectives or leave as is for user to type
        // setLearningObjectives(''); 
    }
  };
  
  const cardStyle = {
    height: '100%', 
    width: '100%', // Card takes full width of its flex item parent
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e0e0e0',
  };

  const cardContentWrapperStyle = { 
    flexGrow: 1, 
    overflowY: 'auto', 
    p: 1.5, 
    display: 'flex',
    flexDirection: 'column'
  };
  
  const placeholderContentStyle = {
    ...cardContentWrapperStyle,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  };

  function generateProposalText(currentCompanyData, currentLearningObjectives, currentParticipants) {
    if (!currentCompanyData) {
      return <Typography variant="body2">Company data missing.</Typography>;
    }
    if (currentCompanyData.companyName === "Claire & George" && !currentLearningObjectives && selectedRQ !== 'custom') {
        return <Typography variant="body2">Select or enter research objective for Claire & George.</Typography>;
    }
    if (selectedRQ === 'custom' && !currentLearningObjectives) {
        return <Typography variant="body2">Please enter your custom learning objectives.</Typography>;
    }


    let methodology = "User interviews.";
    let outcomes = "Key themes, quotes, recommendations.";
    let specificFocus = "General user reactions.";
    let duration = "2-3 wks";

    if (currentCompanyData.companyName === "Claire & George") {
        duration = "3-4 wks";
        if (currentLearningObjectives.includes("booking journey")) {
            specificFocus = "Booking experience pain points.";
            methodology = "Interviews, usability tests, inquiry analysis.";
            outcomes = "Journey map, pain points, improvement ideas.";
        } else if (currentLearningObjectives.includes("mental disabilities")) {
            specificFocus = "Travel needs for mental disabilities.";
            methodology = "Sensitive interviews, expert consultation.";
            outcomes = "Barriers/enablers, design considerations.";
        }
    }

    return (
      <Box sx={{fontSize: '0.75rem'}}>
        <Typography variant="body2" paragraph sx={{fontSize: 'inherit'}}>
          For: <strong>{currentCompanyData.companyName}</strong> (Challenge: "{currentCompanyData.researchChallenge.substring(0,50)+ '...'}")
          Objective: "<em>{currentLearningObjectives || 'N/A'}</em>"
          Focus: {specificFocus}
        </Typography>
        <Typography variant="caption" display="block" sx={{fontWeight: 'bold', mt: 0.5}}>Methodology:</Typography>
        <Typography variant="body2" paragraph sx={{fontSize: 'inherit', mb: 0.5}}>{methodology}</Typography>
        <Typography variant="caption" display="block" sx={{fontWeight: 'bold'}}>Outcomes:</Typography>
        <Typography variant="body2" paragraph sx={{fontSize: 'inherit', mb: 0.5}}>{outcomes}</Typography>
        <Typography variant="caption" display="block" sx={{fontWeight: 'bold'}}>Duration Est.:</Typography>
        <Typography variant="body2" paragraph sx={{fontSize: 'inherit'}}>{duration} ({currentParticipants} participants)</Typography>
      </Box>
    );
  }

  const flexColumnStyle = {
    flex: 1, // Each column takes equal width
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0, // Important for allowing flex items to shrink
    height: '100%' // Ensure column takes full height of flex container
  };

  if (isLoading && !companyInfo) { // Show full page loader only if it's the very first load
    return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 1, height: 'calc(100vh - 64px - 32px - 4px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* This Box for the 3 cards will now always be visible */}
      <Box sx={{ display: 'flex', flexGrow: 1, gap: '12px', height: '100%' }}>
        {/* Column 1: Company Info */}
        <Box sx={flexColumnStyle}>
          <Card sx={cardStyle}>
            <CardContent sx={cardContentWrapperStyle}>
              <Typography variant="h6" component="div" gutterBottom sx={{fontSize: '1.1rem'}}>
                Company: {companyData?.companyName || (companyId ? companyId : 'New Project')}
              </Typography>
              <TextField
                label="Company Information"
                multiline
                rows={10} 
                fullWidth
                variant="outlined"
                value={companyInfo}
                onChange={(e) => setCompanyInfo(e.target.value)}
                sx={{ flexGrow: 1, '& .MuiInputBase-root': { fontSize: '0.8rem' } }}
                InputProps={{ readOnly: !!(companyData && companyData.companyInfo && !researchStarted) || researchStarted }} 
              />
            </CardContent>
          </Card>
        </Box>

        {/* Column 2: Research Objectives */}
        <Box sx={flexColumnStyle}>
          <Card sx={cardStyle}>
            <CardContent sx={cardContentWrapperStyle}>
              <Typography variant="h6" component="div" gutterBottom sx={{fontSize: '1.1rem'}}>
                Research Objectives
              </Typography>
              {companyData && companyData.potentialRQs && (
                <FormControl fullWidth sx={{ mb: 1.5 }}>
                  <InputLabel id="rq-select-label" sx={{fontSize: '0.9rem'}}>Select Research Question</InputLabel>
                  <Select 
                      labelId="rq-select-label" 
                      value={selectedRQ} 
                      label="Select Research Question" 
                      onChange={handleRQChange} 
                      sx={{fontSize: '0.9rem'}}
                      readOnly={researchStarted}
                  >
                    {companyData.potentialRQs.map((rq, index) => (
                      <MenuItem key={index} value={rq}>{rq}</MenuItem>
                    ))}
                    <MenuItem value="custom">Define Custom Objective...</MenuItem>
                  </Select>
                </FormControl>
              )}
              <TextField
                label="Learning Objectives / Key Questions"
                multiline
                rows={companyData?.potentialRQs ? 6 : 10} 
                fullWidth
                variant="outlined"
                value={learningObjectives}
                onChange={(e) => setLearningObjectives(e.target.value)}
                sx={{ flexGrow: 1, '& .MuiInputBase-root': { fontSize: '0.8rem' } }}
                InputProps={{ readOnly: researchStarted || (selectedRQ !== 'custom' && !!selectedRQ) }}
                placeholder={selectedRQ === 'custom' ? "Clearly state what you want to learn or specific questions to answer..." : "Objectives will populate from selection or can be entered if 'custom' is chosen."}
              />
              <TextField
                label="Number of Participants"
                type="number"
                value={participants}
                onChange={(e) => setParticipants(Math.max(1, parseInt(e.target.value, 10) || 1))}
                InputProps={{ inputProps: { min: 1, max: 100 }, readOnly: researchStarted }}
                variant="outlined"
                size="small"
                sx={{ mt: 1.5, width: '50%', fontSize: '0.8rem' }}
              />
            </CardContent>
          </Card>
        </Box>

        {/* Column 3: Research Plan */} 
        <Box sx={flexColumnStyle}>
          <Card sx={cardStyle}>
            {(!proposalVisible && !researchStarted) ? (
              // State: Before proposal is generated and research not started
              <CardContent sx={placeholderContentStyle}> 
                <Typography variant="h6" component="div" gutterBottom sx={{fontSize: '1.1rem', mb:1}}>
                  Research Plan
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{mb: 2, fontSize: '0.85rem', textAlign: 'center'}}>
                  The research plan will be generated here once objectives are set.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="medium" // Changed from large to medium to fit better in card
                  onClick={handleGenerateProposalClick}
                  disabled={isLoading || !learningObjectives} // Also disable if no learning objectives
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Generate Research Proposal"}
                </Button>
              </CardContent>
            ) : (
              // State: Proposal visible or research already started
              <CardContent sx={cardContentWrapperStyle}> {/* Use regular content wrapper for proposal text */}
                <Typography variant="h6" component="div" gutterBottom sx={{fontSize: '1.1rem'}}>
                  Generated Research Plan
                </Typography>
                {generateProposalText(companyData, learningObjectives, participants)}
              </CardContent>
            )}
            
            {/* "Confirm & Start Research" button - appears only if proposal is visible AND research hasn't started */}
            {(proposalVisible && !researchStarted) && (
              <CardActions sx={{ justifyContent: 'center', p: 1.5, borderTop: '1px solid #f0f0f0' /* Optional: add a separator */ }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={handleStartResearchClick}
                  disabled={isLoading || !learningObjectives} 
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Confirm & Start Research"}
                </Button>
              </CardActions>
            )}
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Briefing; 