import axiosConfig from "../../axiosConfig";
import React, { useState, useEffect } from "react";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import { DataGrid } from '@mui/x-data-grid';

export default function TourneyInscritos() {

    return(
        <>
        <h1>inscrições</h1>
        <DataGrid/>

        </>
    )
}