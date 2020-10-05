import React, { cloneElement } from 'react';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select } from '@material-ui/core';

const SendSmsButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('sms');

    const handleClickOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {

    }

    return (
        <div>
            <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                Send SMS/MMS
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Send SMS/MMS</DialogTitle>

                <DialogContent dividers>
                    <form noValidate autoComplete="off">
                        <Select native label="Type" onChange={e => setType(e.target.value as any)} value={type} style={{display: 'block', width: '100%'}}>
                            <option value="sms">SMS</option>
                            <option value="mms">MMS</option>
                        </Select>

                        <TextField multiline label="Message" value={message} onChange={e => setMessage(e.target.value)} style={{display: 'block', width: '100%'}} />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleSave} color="primary" disabled={!message}>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SendSmsButton;