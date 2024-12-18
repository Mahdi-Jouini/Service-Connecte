import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import CallIcon from '@mui/icons-material/Call';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ProviderAvailability from '../components/ProviderAvailability';
import MessageBox from '../components/MessageBox';
import axiosConfig from '../config/axiosConfig';
import Reservation from '../components/Reservation';

export default function Provider() {
  const [open, setOpen] = useState(true);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationOpen, setReservationOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    axiosConfig
      .get(`/providers/${params.id}`)
      .then((response) => {
        setProvider(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching provider data:', err);
        setError('Failed to fetch provider details.');
        setLoading(false);
      });
  }, [params.id]);

  const handleContactToggle = () => {
    setOpen(!open);
  };

  const handleReservationToggle = () => {
    setReservationOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading provider details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  const {
    photo,
    profession,
    experience,
    description,
    specific_skills,
    qualities,
    certification,
    rating,
    user,
  } = provider;

  return (
    <Box sx={{ p: 3 }}>
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper
              elevation={8}
              sx={{
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                p: 2,
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Avatar
                sx={{ width: 150, height: 150, mb: { xs: 2, md: 0 }, mr: { xs: 0, md: 2 } }}
                src={`http://localhost:3000/uploads/${user?.photo}`}
              />
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'start' } }}>
                <Typography variant="h5">{`${user?.name} ${user?.surname}`}</Typography>
                <Typography variant="subtitle1">{profession}</Typography>
              </Box>
              <Box sx={{ mt: { xs: 2, md: 0 }, ml: { md: 'auto' } }}>
                <Button 
                sx={{ mr: 1 }} size="small" variant="contained"
                onClick={handleReservationToggle}
                >
                  Réserver
                </Button>
                <Button onClick={handleContactToggle} size="small" variant="contained">
                  Contacter
                </Button>
              </Box>
            </Paper>
            <Box>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessCenterRoundedIcon /> {experience} Ans d'expérience
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FmdGoodRoundedIcon /> {user?.location}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CallIcon /> {user?.phone}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarRoundedIcon /> {rating}/5
              </Typography>
            </Box>
            <Typography variant="body1">{description}</Typography>
            <Box>
              <Typography variant="h6">Compétences</Typography>
              {specific_skills?.split(',').map((skill, index) => (
                <Chip sx={{ m: 0.5 }} key={index} label={skill.trim()} />
              ))}
            </Box>
            <Box>
              <Typography variant="h6">Qualités</Typography>
              {qualities?.split(',').map((qualitie, index) => (
                <Chip sx={{ m: 0.5 }} key={index} label={qualitie.trim()} />
              ))}
            </Box>
            <Box>
              <Typography variant="h6">Certifications</Typography>
              <Chip label={certification} sx={{ m: 0.5 }} />
            </Box>
          </Box>
        </Grid>

      <MessageBox open={open} onClose={handleContactToggle} />
      <Reservation open={reservationOpen} onClose={handleReservationToggle} />
    </Box>
  );
}
