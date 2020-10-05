import React from 'react';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { useUpdate } from 'react-admin';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const ScannerField = ({ source, record = {} }: any) => {
    const [approve, { loading }] = useUpdate('cus', record.id, record);

    const [open, setOpen] = React.useState(false);
    const [code, setCode] = React.useState('');

    const handleClickOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        record[source] = code;

        approve();

        handleClose();
    }

    const openScanner = async () => {
        const data = await BarcodeScanner.scan();
        alert('Scanner: ' + data.text);
        console.log(`Barcode data: ${data.text}`);
        setCode(data.text);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" size="small" style={{ marginTop: 5, display: 'block' }} onClick={handleClickOpen}>
                Scan: {record[source] || 'None'}
            </Button>


            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
                <DialogTitle id="simple-dialog-title">Scanner</DialogTitle>

                <DialogContent dividers>
                    <TextField size="small" label="Card Number" variant="outlined" value={code} onChange={e => setCode(e.target.value)} />

                    <IconButton color="primary" component="span" size="small"
                                style={{ marginLeft: 10, marginTop: 5 }} onClick={openScanner}>
                        <PhotoCamera />
                    </IconButton>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ScannerField;