/** @format */

import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function LoadingPopup({loading, borderRadius}) {
    let verifyBorderRadiusValue = (borderRadius ?? '0px');

    return (
        <Backdrop
            sx={{borderRadius: verifyBorderRadiusValue, color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={loading}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}

export default LoadingPopup;