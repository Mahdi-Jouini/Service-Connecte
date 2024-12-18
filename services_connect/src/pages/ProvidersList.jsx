import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Card, CardContent, Typography, Grid, Avatar, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axiosConfig from '../config/axiosConfig';

export default function ProvidersList() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosConfig.get(`/providers/service/${params.id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [params.id]);

  if (!data) {
    return <Typography variant="h6" color="textSecondary">Loading providers...</Typography>;
  }

  return (
    <Grid container spacing={5} sx={{ p: 5 }}>
      {data.map((provider) => (
        <Grid item xs={12} sm={6} md={4} key={provider.id}>
          <Card elevation={5} sx={{ borderRadius: 2, width: 350, cursor: 'pointer' }} onClick={() => navigate(`/providers/${provider.id}`)}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <Avatar src={`http://localhost:3000/uploads/${provider.user?.photo}`} alt={provider.user?.name} sx={{ width: 56, height: 56, marginRight: 2 }} />
                <div>
                  <Typography variant="h6">{provider.user?.name} {provider.user?.surname}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {provider.profession}
                  </Typography>
                </div>
              </Box>
              <Box display="flex" alignItems="center">
                <StarRoundedIcon color="action" sx={{ marginRight: 1 }} />
                <Typography variant="body2">{provider.rating}/5</Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={1}>
                <CheckCircleIcon
                  color={provider.disponibilites ? 'success' : 'disabled'}
                  sx={{ marginRight: 1 }}
                />
                <Typography variant="body2">
                  {provider.disponibilites ? 'Disponible' : 'Occupé'}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <LocationOnIcon color="action" sx={{ marginRight: 1 }} />
                <Typography variant="body2">{provider.user.location}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
