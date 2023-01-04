import React, {useState, useEffect, useRef,} from "react";

import axiosConfig from "../../axiosConfig";
import ScheduleTable from "../ScheduleTable";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";






import { Calendar, momentLocalizer } from 'react-big-calendar'



export default function TourneyCalendario({tourney, storedAuth}) {
  
    

    return(
        <>
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
        </>
    )
}