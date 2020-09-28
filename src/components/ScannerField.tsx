import React from 'react';
import { ButtonGroup, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { useUpdate } from 'react-admin';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const ScannerField = ({ source, record = {} }: any) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    }

    const handleClose = (value) => {
        setOpen(false);
    };

    const openScanner = async () => {
        const data = await BarcodeScanner.scan();
        alert('Scanner: ' + data.text);
        console.log(`Barcode data: ${data.text}`);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                Scanner
            </Button>
            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
                <DialogTitle id="simple-dialog-title">Scanner</DialogTitle>

                <DialogContent dividers>
                    <TextField size="small" label="Card Number" variant="outlined" />

                    <IconButton color="primary" component="span" size="small"
                                style={{ marginLeft: 10, marginTop: 5 }} onClick={openScanner}>
                        <PhotoCamera />
                    </IconButton>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ScannerField;