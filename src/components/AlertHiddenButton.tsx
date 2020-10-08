import moment from 'moment';

import React, { cloneElement, useEffect } from 'react';
import { Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, Divider } from '@material-ui/core';
import { CustomerService } from '../api-services';
import { useListContext } from 'react-admin';
import { useLocalStorage } from '../hooks';

declare const window: any;

const AlertHiddenButton = (props) => {
    const { data } = useListContext();

    const [time, setTime] = useLocalStorage('alert-customer', 7);

    useEffect(() => {
        if (Object.keys(data.fetchedAt).length > 0 && !window.alerted) {
            const expDate = moment().add(time, 'day');
            let count = 0;

            Object.keys(data).forEach(id => {
                const row = data[id];

                const cardExp = moment(row.card_exp_date);

                if (cardExp < expDate) {
                    count++;
                }
            })

            if (count > 0) {
                window.alerted = true;
                alert(`You have ${count} card will be expired in ${time} day`);
            }
        }
    }, [data]);

    return <React.Fragment />;
};

export default AlertHiddenButton;