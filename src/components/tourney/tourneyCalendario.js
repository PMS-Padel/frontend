import React, {useState, useEffect, useRef,} from "react";
import {Button} from "@mui/material";
import axiosConfig from "../../axiosConfig";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import DatePicker, { DateObject } from "react-multi-date-picker"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import multiColors from "react-multi-date-picker/plugins/colors"

import { Calendar } from "react-multi-date-picker"


export default function TourneyCalendario({tourney, storedAuth}) {
    const [dataTeams, setDataTeams] = useState({});
    const [dataTeamsLength, setDataTeamsLength] = useState(0);
    const [update, setUpdate] = useState(false);
    
    const [campoID, setCampoId] = useState('');
    const [start, setStart] = useState('');
    const [day, setDay] = useState(new Date());
    const [teamId1, setTeamId1] = useState('');
    const [teamId2, setTeamId2] = useState('');


    /*------------------------- React Multi Date Picker*/ 
    const dateObject = new DateObject()

    const toDateObject = day => new DateObject(dateObject).setDay(day)

    const colors = {
        green: [2, 10, 17].map(toDateObject),
        blue: [5, 6, 14].map(toDateObject),
        red: [13, 19, 25].map(toDateObject),
        yellow: [15, 22, 28].map(toDateObject)
      }

      Object.keys(colors).forEach(color => {
        colors[color].forEach((date, index) => {
            colors[color][index].color = color
        })
      })
      const initialProps = {
        value: [
          ...colors.green,
          ...colors.blue,
          ...colors.red,
          ...colors.yellow
        ], 
        multiple: true
      }


    const [props1, setProps] = useState(initialProps)
   
    const [value, setValue] = React.useState(moment(new Date()));
    const handleChange = (newValue) => {
        setValue(newValue);
      };

      const [value1, setValue1] = useState(
        [
          5, 
          10,
          15,
          20,
          25,
          30
        ].map(day => new DateObject().setDay(day))
      )



      /*-------------------------*/ 

    useEffect(() => {
        axiosConfig.get(`getteams/${tourney.id}`,{
            headers: {
                Authorization: 'Bearer ' + storedAuth
            }
        })
            .then((res) => {
                let {data} = res;
                setDataTeams(data)
                setUpdate(true)
                setDataTeamsLength(dataTeams.length)
            })
            .catch((error) => false);
        },[tourney])

     /*   
    useEffect(() =>{

        axiosConfig.post(`creategame`,{
            Campo_id: undefined,
            start_at: undefined,
            day: undefined,
            team_id1: undefined,
            team_id2: undefined,


        },{
            headers: {
                Authorization: 'Bearer ' + storedAuth
            }
        })
            .then(undefined)
            .catch((error) => false);
    },[])
    */

    function mostraTournamentCalendario(dataTeams, props1){

        if(update){
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
                        
                        <Calendar 
                        {...props1}
                        numberOfMonths={3}
                        multiple
                        value={value1}
                        onChange={setValue1}
                        plugins={[
                            <DatePanel position="right" />,multiColors({position:'left'})
                          ]}
                        /> 
                        <div style={{paddingTop:'1rem'}}>
                        <FormControl sx={{width:'10rem', paddingRight:'2rem'}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Team1
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                        >
                            {dataTeams.map((res)=>
                            <option value={res.name}>{res.name}</option>
                            )}
                            
                        </NativeSelect>
                        </FormControl>

                        <FormControl sx={{width:'10rem', paddingRight:'2rem'}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Team2
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}

                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                        >
                            {dataTeams.map((res)=>
                            <option value={res.name}>{res.name}</option>
                            )}
                        </NativeSelect>
                        </FormControl>

                        <FormControl sx={{width:'10rem', paddingRight:'2rem'}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Campo
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                            }}
                        >
                           
                            <option value='1'> Campo 1</option>
                            <option value='2'> Campo 2</option>
                            <option value='3'> Campo 3</option>
                            <option value='4'> Campo 4</option>
                            <option value='5'> Campo 5</option>
                            <option value='6'> Campo 6</option>
                            <option value='7'> Campo 7</option>
           
                        </NativeSelect>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                        label="Date&Time picker"
                        inputFormat="YYYY/MM/DD"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>

                        


                        <Button 
                        onClick={undefined}
                        style={{position:'relative', backgroundColor:'#052F53',
                        color:'white', width:'6%', borderRadius: '5px', textTransform: 'none'}}>Confirmar</Button>

                        </div>
                    
                    </div>
                </>
            )
        }
    }

    return(
        <>
            {mostraTournamentCalendario(dataTeams,props1)}
        </>
    )
}