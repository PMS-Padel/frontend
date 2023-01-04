import React, {useState, useEffect, useRef,} from "react";

import axiosConfig from "../../axiosConfig";
import ScheduleTable from "../ScheduleTable";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";






import { Calendar, momentLocalizer } from 'react-big-calendar'



export default function TourneyCalendario({tourney, storedAuth}) {
  
    const [date, setDate] = useState(new Date());
    const hours = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                            
                                <ScheduleTable hours={hours} days={days} date={date} />
                            
                        </div>
        </DndProvider>
        </>
    )
}