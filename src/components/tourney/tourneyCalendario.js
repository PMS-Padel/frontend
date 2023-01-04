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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export default function TourneyCalendario({tourney, storedAuth}) {
    const [dataTeams, setDataTeams] = useState({});
    const [dataTeamsLength, setDataTeamsLength] = useState(0);
    const [update, setUpdate] = useState(false);
    
    const [campoID, setCampoId] = useState('');
    const [start, setStart] = useState('');
    const [day, setDay] = useState(new Date());
    const [teamId1, setTeamId1] = useState('');
    const [teamId2, setTeamId2] = useState('');

    const [value, setValue] = React.useState(moment(new Date()));
    const handleChange = (newValue) => {
        setValue(newValue);
      };


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

    function mostraTournamentCalendario(dataTeams,dataTeamsLength){

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
            {mostraTournamentCalendario(dataTeams,dataTeamsLength)}
        </>
    )
}