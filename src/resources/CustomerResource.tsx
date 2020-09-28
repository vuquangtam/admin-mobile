import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { Resource, ListGuesser, SimpleForm, TextInput, Create, Edit, DateInput, NumberInput, List, Datagrid, TextField, EmailField, DateField, Filter } from 'react-admin';

import { CountField, ScannerField } from '../components';

const FilterView = (props) => (
    <Filter {...props}>
        <DateInput label="Expiration" source="card_exp_date" />
        <DateInput label="Last Visit" source="last_visit" />
    </Filter>
);

const ListView = props => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    return (
        <List filters={<FilterView />} {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="phone_number" />
                <EmailField source="email" />
                <DateField source="birthday" />
                <DateField source="card_issue" />
                <DateField source="card_exp_date" />
                <DateField source="last_visit" />
                <TextField source="card_type" />
                <CountField source="visit_count" />
                <ScannerField source="card_number" />
            </Datagrid>
        </List>
    );
};

const CreateView = props => (
    <Create {...props}>
        <SimpleForm>
            <DateInput source="birthday" />
            <DateInput source="card_exp_date" />
            <DateInput source="card_issue" />
            <TextInput source="card_type" />
            <TextInput source="email" />
            <TextInput source="name" />
            <TextInput source="phone_number" />
        </SimpleForm>
    </Create>
);

const EditView = props => (
    <Edit {...props}>
        <SimpleForm>
            <DateInput source="birthday" />
            <DateInput source="card_exp_date" />
            <DateInput source="card_issue" />
            <TextInput source="card_type" />
            <TextInput source="email" />
            <TextInput source="name" />
            <TextInput source="phone_number" />
        </SimpleForm>
    </Edit>
);

/* birthday: "1990-09-09"
 * card_exp_date: "2020-08-30"
 * card_issue: null
 * card_number: "900893"
 * email: "sadadas2@dasd.nn"
 * name: "test io2"
 * phone_number: "4422324244"
 * visit_count: null */

const CustomerResource = (
    <Resource
        name="cus"
        options={{ label: 'Customers' }}
        list={ListView}
        edit={EditView}
        create={CreateView}
    />
);

export default CustomerResource;