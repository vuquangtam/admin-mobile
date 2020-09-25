import React from 'react';
import { Resource, ListGuesser, SimpleForm, TextInput, Create, Edit, DateInput, NumberInput } from 'react-admin';

const ListView = ListGuesser;

const CreateView = props => (
    <Create {...props}>
        <SimpleForm>
            <DateInput source="birthday" />
            <DateInput source="card_exp_date" />
            <DateInput source="card_issue" />
            <NumberInput source="card_number" />
            <TextInput source="email" />
            <TextInput source="name" />
            <TextInput source="phone_number" />
            <NumberInput source="visit_count" />
        </SimpleForm>
    </Create>
);

const EditView = props => (
    <Edit {...props}>
        <SimpleForm>
            <DateInput source="birthday" />
            <DateInput source="card_exp_date" />
            <DateInput source="card_issue" />
            <NumberInput source="card_number" />
            <TextInput source="email" />
            <TextInput source="name" />
            <TextInput source="phone_number" />
            <NumberInput source="visit_count" />
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