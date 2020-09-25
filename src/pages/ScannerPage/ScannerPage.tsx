import React from 'react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import './ScannerPage.css';
import { IonContent, IonButton, IonItem, IonInput } from '@ionic/react';

const ScannerPage: React.FC = () => {
    const openScanner = async () => {
        const data = await BarcodeScanner.scan();
        alert('Scanner: ' + data.text);
        console.log(`Barcode data: ${data.text}`);
    };

    return (
        <IonContent>
            <IonItem>
                <IonInput></IonInput>
                <IonButton onClick={openScanner}>Scan barcode</IonButton>
            </IonItem>
        </IonContent>
    );
};

export default ScannerPage;
