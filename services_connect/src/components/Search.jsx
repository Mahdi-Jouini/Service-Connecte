import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../config/axiosConfig';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axiosConfig
      .get('/services')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const groupedServices = services.reduce((acc, service) => {
    const categoryName = service.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(service);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        width: 800,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          p: 0,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          minWidth: 400,
          height: 45,
          borderRadius: 1,
          bgcolor: 'white',
        }}
      >
        <Button
          style={{ borderRadius: '3px 0px 0px 3px', height: 45 }}
          variant="contained"
          disableElevation
          size="large"
          onClick={handleMenuOpen}
          startIcon={<MenuIcon />}
        >
          Catégories
        </Button>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search services"
          inputProps={{ 'aria-label': 'search services' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>

      <Menu
        sx={{}}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose} 
        PaperProps={{
          style: {
            maxHeight: 300,
            width: 800,
            minWidth: 400,
            transform: 'translateY(10px)'
          },
        }}
      >
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {Object.keys(groupedServices).map((categoryName, index) => (
        <React.Fragment key={index}>
          <Box
            sx={{
              p: 3,
              minWidth: 100,
              width: 200,
              flex: '1 1 auto',
            }}
          >
            <Typography variant="h6" component="h2">
              {categoryName}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {groupedServices[categoryName].length > 0 ? (
                groupedServices[categoryName].map((service) => (
                  <Box key={service.id}>
                    <Button onClick={() => navigate(`/providers/service/${service.id}`)} size="small" variant="text">
                      {service.name}
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary" textAlign="center">
                  Aucun service disponible
                </Typography>
              )}
            </Box>
          </Box>
          {index < Object.keys(groupedServices).length - 1 && (
            <Divider orientation="vertical" flexItem />
          )}
        </React.Fragment>
      ))}
      </Box>
      </Menu>
    </Box>
  );
}
