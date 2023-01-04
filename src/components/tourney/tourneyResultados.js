import React, {useState, useEffect, useRef,} from "react";
import {Button} from "@mui/material";
import ScheduleTable from "../ScheduleTable";
import axiosConfig from "../../axiosConfig";

export default function TourneyResultados({tourney, storedAuth}) {

    

    return(
        <>
         <div style={{
                        width: "80%",
                        height:"50rem",
                        borderRadius: "1%",
                        position: 'absolute',
                        zIndex: 0,
                        objectFit: "cover",
                        top: 700,
                        left: 150,
                        backgroundColor: "#FFFFFF",
                        paddingLeft:'2rem',
                        color: "#052F53"}}>
                        
                        
                
                    </div>
        </>
    )
}