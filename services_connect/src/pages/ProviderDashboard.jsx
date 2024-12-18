import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import axiosConfig from '../config/axiosConfig';

const ProviderDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, [statusFilter]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.get('/reservations', {
        params: { status: statusFilter },
      });
      // Transform data to include senderName and senderPhoto
      const transformedData = response.data.map((reservation) => ({
        ...reservation,
        senderName: reservation.senderUser?.name + ' ' + reservation.senderUser?.surname,
        senderPhoto: reservation.senderUser?.photo,
      }));
      setReservations(transformedData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axiosConfig.put(`/reservations/${id}`, { status: newStatus });
      fetchReservations();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const columns = [
    {
      field: 'sender',
      headerName: 'Sender',
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            src={`http://localhost:3000/uploads/${params.row.senderPhoto}`}
            alt={params.row.senderName}
          />
          <Typography>{params.row.senderName}</Typography>
        </Box>
      ),
    },
    { field: 'receiver', headerName: 'Receiver', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => updateStatus(params.row.id, 'approuvé')}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => updateStatus(params.row.id, 'rejeté')}
            style={{ marginLeft: '8px' }}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Provider Reservation Dashboard
      </Typography>

      <FormControl style={{ marginBottom: '16px', minWidth: '200px' }}>
        <InputLabel>Status Filter</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="en attente">En attente</MenuItem>
          <MenuItem value="rejeté">Rejeté</MenuItem>
          <MenuItem value="approuvé">Approuvé</MenuItem>
        </Select>
      </FormControl>

      <Box style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={reservations}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
          getRowId={(row) => row.id}
          getRowClassName={(params) =>
            params.row.status === 'en attente'
              ? 'row-pending'
              : params.row.status === 'rejeté'
              ? 'row-rejected'
              : 'row-approved'
          }
        />
      </Box>
    </Box>
  );
};

export default ProviderDashboard;
