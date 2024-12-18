// Import necessary React and MUI dependencies
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  Autocomplete, 
  Chip, 
  IconButton, 
  Typography, 
  Box 
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled, lighten, darken } from '@mui/system';
import Collapse from '@mui/material/Collapse';

// Import icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Import configuration and assets
import axiosConfig from '../config/axiosConfig';
import logo from '../assets/service-connect.svg';

// Styled components
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles('dark', {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

// Main Signin Component
export default function Signin({ open, onClose }) {
  // State variables
  const [token, settoken] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [role, setRole] = useState('');
  const [services, setServices] = useState([]);
  const [verifying, setVerifying] = useState(false);
  const [stage, setStage] = useState('signup');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    role: role,
    email: '',
    phone: '',
    password: '',
    location: '',
    photo: photoName,
    profession: '',
    experience: '',
    specific_skills: '',
    description: '',
    qualities: '',
    certification: '',
    service: '',
  });

  const [skills, setSkills] = useState([]);
  const [qualities, setQualities] = useState([]);
  


  // Fetch services on component mount
  useEffect(() => {
    axiosConfig
      .get('/services')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, []);

  // Handler for skills input
  const handleSkillsChange = (event, newValue) => {
    const uniqueSkills = Array.from(new Set(newValue));
    setSkills(uniqueSkills);
    setFormData(prev => ({
      ...prev, 
      specific_skills: uniqueSkills.join(',')
    }));
  };

  // Handler for qualities input
  const handleQualitiesChange = (event, newValue) => {
    const uniqueQualities = Array.from(new Set(newValue));
    setQualities(uniqueQualities);
    setFormData(prev => ({
      ...prev, 
      qualities: uniqueQualities.join(',')
    }));
  };

  // Generic input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Toggle role between provider and user
  const handleRoleChange = (event) => {
    setRole(event.target.checked ? 'user' : 'provider');
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setPhoto(event.target.files);
      const fileName = selectedFile.name;
      setPhotoName(fileName);
      setFormData((prevData) => ({ ...prevData, photo: fileName }));
    }
  };

  // File upload handler
  const handleFileUpload = () => {
    if (!photo) return Promise.resolve(null);
    
    const uploadData = new FormData();
    Array.from(photo).forEach((file) => uploadData.append('image', file));
    
    return axiosConfig
      .post('/upload', uploadData)
      .then((response) => {
        console.log('File upload success:', response);
        return response;
      })
      .catch((error) => {
        console.error('Error uploading file', error);
        throw error;
      });
  };

  const handleSubmit = () => {
    setVerifying(true);
  
    Promise.all([handleFileUpload()])
      .then(() => 
        axiosConfig.post('/auth/verify-email', formData)
      )
      .then((response) => {
        console.log('Email verification response:', response);
        settoken(response.data.token),
        setStage('otp');
        setVerifying(false);

      })
      .catch((error) => {
        console.error('Error during signup', error);
        setVerifying(false);
      });
  };

  const handleOtpSubmit = () => {
    setVerifying(true);
    
    axiosConfig.post('/auth/signup',
      {token: token,verificationCode: otp }
    )
    .then((response) => {
      console.log('OTP Verified', response);
      localStorage.setItem("authToken", response.data.token);
      
      setVerifying(false);
      onClose();
    })
    .catch((error) => {
      console.error('OTP Verification Error', error);
      setVerifying(false);
    });
  };


  const renderSignupForm = () => (
    <>
      <TextField 
        label="Nom" 
        name="name" 
        value={formData.name} 
        onChange={handleInputChange} 
        fullWidth 
        margin="dense" 
        required 
      />
      <TextField 
        label="Prénom" 
        name="surname" 
        value={formData.surname} 
        onChange={handleInputChange} 
        fullWidth 
        margin="dense" 
        required 
      />
      <TextField 
        label="Email" 
        name="email" 
        type="email"
        value={formData.email} 
        onChange={handleInputChange} 
        fullWidth 
        margin="dense" 
        required 
      />
      <TextField 
        label="Téléphone" 
        name="phone" 
        type="tel"
        value={formData.phone} 
        onChange={handleInputChange} 
        fullWidth 
        margin="dense" 
        required 
      />
      <TextField 
        label="Mot de passe" 
        name="password" 
        type="password" 
        value={formData.password} 
        onChange={handleInputChange} 
        fullWidth 
        margin="dense" 
        required 
      />
      <TextField 
        label="Adresse" 
        name="location" 
        value={formData.location} 
        onChange={handleInputChange} 
        fullWidth 
        margin="dense" 
      />
      
      <Button
        sx={{ mt: 1, mb: 1}}
        fullWidth
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Télécharger une photo
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
      </Button>
      
      {photoName && (
        <Typography variant="body2" color="text.secondary" align="center">
          Fichier sélectionné: {photoName}
        </Typography>
      )}
      
      <FormControlLabel
        control={
          <Checkbox 
            checked={role === 'user'} 
            onChange={handleRoleChange} 
          />
        }
        label="Êtes-vous un prestataire?"
      />
      
      <Collapse in={role === 'user'} timeout="auto">
        <TextField 
          label="Profession" 
          name="profession" 
          value={formData.profession} 
          onChange={handleInputChange} 
          fullWidth 
          margin="dense" 
        />
        <TextField 
          label="Expérience" 
          name="experience" 
          value={formData.experience} 
          onChange={handleInputChange} 
          fullWidth 
          margin="dense" 
        />
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={skills}
          onChange={handleSkillsChange}
          renderTags={(value, getTagProps) => 
            value.map((option, index) => (
              <Chip 
                key={`skill-${index}`}
                variant="outlined" 
                label={option} 
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Compétences spécifiques"
              margin="dense"
            />
          )}
        />
        <TextField 
          label="Description" 
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          multiline
          rows={3}
        />
        <Autocomplete
          multiple
          freeSolo
          options={[]}
          value={qualities}  
          onChange={handleQualitiesChange}
          renderTags={(value, getTagProps) => 
            value.map((option, index) => (
              <Chip 
                key={`quality-${index}`}
                variant="outlined" 
                label={option} 
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Qualités"
              margin="dense"
            />
          )}
        />
        <TextField 
          label="Certification" 
          name="certification"
          value={formData.certification}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <Autocomplete
          options={services}
          groupBy={(option) => option.category.name}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            setFormData(prevData => ({
              ...prevData,
              service: newValue ? newValue.id : ''
            }));
          }}
          fullWidth
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="Catégorie de service" 
              margin="dense" 
            />
          )}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
        />
      </Collapse>
    </>
  );

  // Render OTP verification form
  const renderOtpForm = () => (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Vérification OTP
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Un code de vérification a été envoyé à {formData.email}
      </Typography>
      <TextField 
        label="Code OTP" 
        value={otp} 
        onChange={(e) => setOtp(e.target.value)}
        fullWidth 
        margin="dense"
        placeholder="Entrez le code à 6 chiffres"
        inputProps={{ 
          maxLength: 6,
          pattern: "\\d{6}"
        }}
      />
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="img" 
            src={logo} 
            alt="logo" 
            sx={{ height: 60, mr: 2 }} 
          />
          <Typography variant="h5" fontFamily="cursive">
            {stage === 'signup' ? "S'inscrire" : "Vérification"}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        {stage === 'signup' ? renderSignupForm() : renderOtpForm()}
      </DialogContent>
      
      <DialogActions>
        <LoadingButton 
          variant="contained" 
          fullWidth 
          onClick={stage === 'signup' ? handleSubmit : handleOtpSubmit} 
          loading={verifying}
          disabled={
            stage === 'signup' 
              ? !formData.name || !formData.email || !formData.password 
              : otp.length !== 6
          }
        >
          {stage === 'signup' ? 'Valider' : 'Confirmer'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}