import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, IconButton, Typography } from '@mui/material';
import logo from '../assets/service-connect.svg';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axiosConfig from '../config/axiosConfig';

export default function Login({ open, onClose }) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    axiosConfig
    .post('/auth/login', formData)
    .then((response) => {
      localStorage.setItem("authToken",response.data.token )
      window.location.reload();
    })
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} width="400">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{height:60 }} component={'img'} src={logo} alt="logo" />
        <Typography variant="h5" fontFamily={'cursive'}>Se connecter</Typography>
        </Box>
        <IconButton onClick={onClose}><CloseRoundedIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button variant='contained' fullWidth onClick={handleSubmit}>Valider</Button>
      </DialogActions>
    </Dialog>
  );
}
