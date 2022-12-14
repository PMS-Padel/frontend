/** @format */

import React from 'react';
import {Alert, AlertTitle, Dialog} from "@mui/material";

function AlertPopup({errorAlert, handleErrorAlert}) {
    return (
        <Dialog
            open={errorAlert.open}
            onClose={handleErrorAlert}>
            <Alert severity={errorAlert.severity}>
                <AlertTitle>{errorAlert.errorStatus}</AlertTitle>
                {errorAlert.description}
            </Alert>
        </Dialog>
    );
}

export default AlertPopup;
