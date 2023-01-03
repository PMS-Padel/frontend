import React, {useState, useEffect, useRef,} from "react";
import {Button} from "@mui/material";
import DatePicker from "react-multi-date-picker";
import axiosConfig from "../../axiosConfig";

export default function TourneyCalendario({tourney, storedAuth}) {

    const [value, setValue] = useState(new Date());

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

                        <DatePicker value={value}
                         onChange={setValue} 
                         
                         />
                    </div>
        </>
    )
}