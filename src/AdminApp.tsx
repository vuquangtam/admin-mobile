import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import dataProvider from './services/dataProvider';
import authProvider from './services/authProvider';

import { CustomerResource } from './resources';

const AdminApp: React.FC = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
        {CustomerResource}
    </Admin>
);

export default AdminApp;