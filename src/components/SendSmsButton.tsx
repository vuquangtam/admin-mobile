import React, { cloneElement } from 'react';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, Divider } from '@material-ui/core';
import { CustomerService } from '../api-services';
import { useListContext } from 'react-admin';

const SendSmsButton = (props) => {
    const [open, setOpen] = React.useState(true);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('sms');
    const [file, setFile] = React.useState(null);

    console.log(file);

    const { data } = useListContext();

    const selected = props.selectedIds.map(id => data[id]);

    const handleClickOpen = () => {
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (type === 'sms') {
            CustomerService.sendSms(props.selectedIds, message)
                           .catch(() => alert('Cannot send message'))
                           .finally(() => setOpen(!open));
        } else {
            CustomerService.uploadFile('mms', file).then(res => {
                const url = res.data;

                CustomerService.sendMms(props.selectedIds, message, url);
            }).catch(() => alert('Cannot send message')).finally(() => setOpen(!open));
        }
    }

    return (
        <div>
            <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
                Send SMS/MMS
            </Button>

            <Dialog open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth = {'md'}>
                <DialogTitle>Send SMS/MMS</DialogTitle>

                <DialogContent dividers>
                    <form noValidate autoComplete="off">
                        Send Message to: {selected.map((row: any) => row.name).join(', ')}

                        <Divider style={{marginTop: 25, marginBottom: 25}} />

                        <Select native label="Type" onChange={e => setType(e.target.value as any)} value={type} style={{display: 'block', width: '100%'}}>
                            <option value="sms">SMS</option>
                            <option value="mms">MMS</option>
                        </Select>

                        {type === 'mms' && (
                            <Button
                                variant="contained"
                                component="label"
                                style={{marginTop: 10}}
                            >
                                Upload File
                                <input
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={e => setFile(e.target.files[0])}
                                />
                            </Button>
                        )}

                        <TextField multiline fullWidth={true}
                                   label="Message (Maximum 160 characters)"
                                   value={message}
                                   onChange={e => setMessage(e.target.value)}
                                   style={{display: 'block', width: '100%'}}
                                   inputProps={{ maxLength: 160 }}/>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleSave} color="primary" disabled={!message || (type === 'mms' && !file)}>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SendSmsButton;