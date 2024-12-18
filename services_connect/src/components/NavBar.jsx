import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import Avatar from '@mui/material/Avatar';
import Login from './Login';
import Signin from './Signin';
import logo from '../assets/service-connect.svg';
import { HashLink } from 'react-router-hash-link';
import axiosConfig from '../config/axiosConfig';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
  // States for both menus
  const [anchorElAccueil, setAnchorElAccueil] = useState(null);
  const [openAccueil, setOpenAccueil] = useState(false);
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);
  const [openAvatar, setOpenAvatar] = useState(false);

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);

  const [user, setUser] = useState({});

  // Handle Accueil menu
  const handleMenuClickAccueil = (event) => {
    setAnchorElAccueil(event.currentTarget);
    setOpenAccueil(!openAccueil);
  };

  const handleCloseMenuAccueil = () => {
    setAnchorElAccueil(null);
    setOpenAccueil(false);
  };

  // Handle Avatar menu
  const handleMenuClickAvatar = (event) => {
    setAnchorElAvatar(event.currentTarget);
    setOpenAvatar(!openAvatar);
  };

  const handleCloseMenuAvatar = () => {
    setAnchorElAvatar(null);
    setOpenAvatar(false);
  };

  const handleLogout = () => {
    // Remove token from localStorage and reload page
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axiosConfig
      .get('/user/me')
      .then((response) => {
        setUser(response.data);
        console.log('User fetched:', response.data); // Logs the user data after it's fetched
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const navigate = useNavigate();

  // Check if the user is authenticated (i.e., if the authToken exists in localStorage)
  const isAuthenticated = localStorage.getItem('authToken');

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar position="fixed" sx={{ bgcolor: 'white' }}>
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ height: 50 }} component={'img'} src={logo} alt="Logo" />
          <Button
            startIcon={openAccueil ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            color="inherit"
            onClick={handleMenuClickAccueil}
          >
            Accueil
          </Button>
          <Menu
            anchorEl={anchorElAccueil}
            open={openAccueil}
            onClose={handleCloseMenuAccueil}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {/*<HashLink smooth to="/#welcome">*/}
              <MenuItem onClick={() => navigate('/')}>Profil</MenuItem>
            {/*</HashLink>*/}
            {/*<HashLink smooth to="/#search_trend">*/}
              <MenuItem onClick={handleCloseMenuAccueil}>Tendances</MenuItem>
            {/*</HashLink>*/}
            {/*<HashLink smooth to="/#about">*/}
              <MenuItem onClick={handleCloseMenuAccueil}>À propos</MenuItem>
            {/*</HashLink>*/}
          </Menu>
          <Button onClick={ () => navigate('/provider_Dashboard')} color="inherit">Tableau de bord</Button>

          {!isAuthenticated ? (
            <>
              <Button color="inherit" sx={{ ml: 'auto' }} onClick={() => setOpenSignInDialog(true)}>
                Inscription
              </Button>
              <Button color="inherit" onClick={() => setOpenLoginDialog(true)}>
                Connexion
              </Button>
            </>
          ) : (
            // Show Avatar with Dropdown if authenticated
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{ cursor: 'pointer' }}
                onClick={handleMenuClickAvatar}
                src={`http://localhost:3000/uploads/${user.photo}`} // Default fallback image
              />
              <Menu
                anchorEl={anchorElAvatar}
                open={openAvatar}
                onClose={handleCloseMenuAvatar}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Dialogs */}
      <Login open={openLoginDialog} onClose={() => setOpenLoginDialog(false)} />
      <Signin open={openSignInDialog} onClose={() => setOpenSignInDialog(false)} />
    </Box>
  );
}
