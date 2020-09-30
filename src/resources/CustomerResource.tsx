import React, { cloneElement, useState, useEffect } from 'react';
import { useMediaQuery, Button, Select, FormControl, InputLabel, Divider } from '@material-ui/core';
import { Resource, ListGuesser, SimpleForm, TextInput, Create, Edit, DateInput, NumberInput, List, Datagrid, TextField, EmailField, DateField, Filter, ReferenceField, email, TopToolbar, sanitizeListRestProps, CreateButton, ExportButton, useListContext } from 'react-admin';

import { CountField, ScannerField } from '../components';

function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}


const FilterView = (props) => (
    <Filter {...props}>
        <TextInput label="Name" source="name" />
        <TextInput label="Phone" source="phone_number" />
        <DateInput label="Expiration" source="card_exp_date" />
        <DateInput label="Last Visit" source="last_visit" />
    </Filter>
);

const AlertButton = (props) => {
    const [time, setTime] = useLocalStorage('alert-customer', 7);

    return (
        <FormControl variant="outlined" size="small" color="primary" style={{ marginRight: 10 }}>
            <InputLabel htmlFor="outlined-age-native-simple">Time to alert</InputLabel>
            <Select native label="Time to alert" onChange={e => setTime(e.target.value)} value={time}>
                <option value={7}>1 week</option>
                <option value={14}>2 weeks</option>
                <option value={30}>1 month</option>
            </Select>
        </FormControl>
    )
}

const ActionView = (props) => {
    const {
        className,
        exporter,
        filters,
        maxResults,
        ...rest
    } = props;

    const {
        currentSort,
        resource,
        displayedFilters,
        filterValues,
        hasCreate,
        basePath,
        selectedIds,
        showFilter,
        total
    } = useListContext();

    return (
        <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
            <AlertButton />

            <Divider orientation="vertical" flexItem />

            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
            <CreateButton basePath={basePath} />
            <ExportButton
                disabled={total === 0}
                resource={resource}
                sort={currentSort}
                filterValues={filterValues}
                maxResults={maxResults}
            />
        </TopToolbar>
    );
};

const ListView = props => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    return (
        <List filters={<FilterView />} actions={<ActionView />} {...props}>
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
                <ReferenceField label="Edit" source="id" reference="cus" sortable={false}>
                    <Button variant="outlined" color="primary" size="small">
                        Edit
                    </Button>
                </ReferenceField>
            </Datagrid>
        </List>
    );
};

const validateEmail = email();

const CreateView = props => (
    <Create {...props}>
        <SimpleForm>
            <DateInput source="birthday" />
            <DateInput source="card_exp_date" />
            <DateInput source="card_issue" />
            <TextInput source="card_type" />
            <NumberInput source="card_number" />
            <TextInput source="email" type="email" validate={validateEmail} />
            <TextInput source="name" />
            <NumberInput source="phone_number" />
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
            <NumberInput source="card_number" />
            <TextInput source="email" type="email" validate={validateEmail} />
            <TextInput source="name" />
            <NumberInput source="phone_number" />
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