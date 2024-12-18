import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProviderAvailability from './ProviderAvailability';
import axiosConfig from '../config/axiosConfig';
import { useParams } from 'react-router-dom';

export default function Reservation({ open, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const { id } = useParams();

  const handleDateSelect = (event) => {
    const start = new Date(event.start); // Ensure proper date objects
    const end = new Date(event.end);
    console.log("Selected Start Date:", start);
    console.log("Selected End Date:", end);
    setSelectedDate({ start, end });
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      console.error("No date selected.");
      return;
    }
    axiosConfig
      .post('/reservations', {
        date: selectedDate.start,
        receiver: id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Réservation</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <ProviderAvailability onDateSelect={handleDateSelect} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
          <TextField
            size="small"
            label="Date sélectionnée"
            value={
              selectedDate
                ? `Début: ${selectedDate.start.toLocaleString()} - Fin: ${selectedDate.end.toLocaleString()}`
                : 'Aucune date sélectionnée'
            }
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
          />
          <Box>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!selectedDate}
            >
              Réserver
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
