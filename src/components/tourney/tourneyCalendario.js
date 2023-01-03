import React, {useState, useEffect, useRef,} from "react";
import {Button} from "@mui/material";
import axiosConfig from "../../axiosConfig";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
export default function TourneyCalendario({tourney, storedAuth}) {



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
                        
                        <FormControl sx={{width:'10rem'}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Team
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                        >
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                        </FormControl>

                        <TextField id="time" type="date" format="yyyy-mm-dd" inputProps={undefined} />;
                    </div>
        </>
    )
}