import React, { cloneElement } from 'react';
import { useMediaQuery, Button, Select, FormControl, InputLabel, Divider } from '@material-ui/core';
import { Resource, ListGuesser, SimpleForm, TextInput, Create, Edit, DateInput, NumberInput, List, Datagrid, TextField, EmailField, DateField, Filter, ReferenceField, email, required, TopToolbar, sanitizeListRestProps, CreateButton, ExportButton, useListContext, Responsive, SimpleList, AutocompleteArrayInput, BooleanInput, FormDataConsumer } from 'react-admin';

import { useLocalStorage } from '../hooks';
import { CountField, ScannerField } from '../components';

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
            <CreateButton label="Register" basePath={basePath} />
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
    return (
        <List filters={<FilterView />} actions={<ActionView />} {...props}>
            <Responsive
                small={
                    <Datagrid>
                        <TextField source="name" />
                        <CountField source="visit_count" />
                        <ScannerField source="card_number" />
                        <ReferenceField label="Edit" source="id" reference="cus" sortable={false}>
                            <Button variant="outlined" color="primary" size="small">
                                Edit
                            </Button>
                        </ReferenceField>
                    </Datagrid>
                }
                medium={
                    <Datagrid>
                        <TextField source="name" />
                        <TextField source="phone_number" />
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
                }
                large={
                    <Datagrid>
                        <TextField source="name" />
                        <TextField source="phone_number" />
                        <EmailField source="email" />
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
                }
            />
        </List>
    );
};

const CreateView = props => {
    return (
        <Create {...props}>
            <SimpleForm validateOnBlur={true}>
                <BooleanInput source="isRegister" />
                <DateInput source="birthday" validate={[required()]} />
                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.isRegister && (
                        <DateInput source="card_exp_date" validate={[required()]} />
                    )}
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.isRegister && (
                        <DateInput source="card_issue" validate={[required()]} />
                    )}
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.isRegister && (
                        <TextInput source="card_type" validate={[required()]} />
                    )}
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) => formData.isRegister && (
                        <NumberInput source="card_number" validate={[required()]} />
                    )}
                </FormDataConsumer>
                <TextInput source="email" type="email" validate={[email(), required()]} />
                <TextInput source="name" validate={[required()]} />
                <NumberInput source="phone_number" validate={[required()]} />
            </SimpleForm>
        </Create>
    );
};

const EditView = props => (
    <Edit {...props}>
        <SimpleForm>
            <DateInput source="birthday" />
            <DateInput source="card_exp_date" />
            <DateInput source="card_issue" />
            <TextInput source="card_type" />
            <NumberInput source="card_number" />
            <TextInput source="email" type="email" validate={[email(), required()]} />
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