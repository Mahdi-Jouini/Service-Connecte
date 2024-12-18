import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Alert, Snackbar } from '@mui/material';

export default function AuthController() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const isNew = Cookies.get('isNew')
        console.log(isNew);
        if (isNew === 'true'){
            setOpen(true)
            setMessage('aaaaaaaaaaaaaaaa')
            Cookies.set('isNew', 'false');
        }
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={2000} 
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity= 'success'
                variant="filled"
                sx={{ 
                    width: '100%', 
                    maxWidth: 400,
                    margin: 'auto'
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}