import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import dataProvider from './services/dataProvider';
import authProvider from './services/authProvider';
import customRoutes from './customRoutes';

import ScannerPage from './pages/ScannerPage/ScannerPage';

import { CustomerResource } from './resources';

const AdminApp: React.FC = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        customRoutes={customRoutes}>
        {CustomerResource}
        <Resource
            name="scanner"
            options={{ label: 'Scanner' }}
            list={ScannerPage as any} />
    </Admin>
);

export default AdminApp;