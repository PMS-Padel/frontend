import React, {useState, useEffect, useRef,} from "react";
import {Button} from "@mui/material";
import ScheduleTable from "../ScheduleTable";
import axiosConfig from "../../axiosConfig";

export default function TourneyResultados({tourney, storedAuth}) {

    const hours = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                        
                        <ScheduleTable hours={hours} days={days} />
                
                    </div>
        </>
    )
}