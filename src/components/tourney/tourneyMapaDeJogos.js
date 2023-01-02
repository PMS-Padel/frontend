
import React, {useState, useEffect, useRef,} from "react";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Button} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosConfig from "../../axiosConfig";

export default function TourneyMapaDeJogos({tourney, storedAuth}) {
    const [dataTeams, setDataTeams] = useState({});
    const [update, setUpdate] = useState(false);

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
            })
            .catch((error) => false);
        },[tourney])

    function mostraTournamentBracket(dataTeams){
        if (update){
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

                        <div style={{position:'relative', width:'8rem', paddingTop:'1rem', paddingBottom:'1rem', paddingLeft:'5rem'}}>
                            <h1>Eliminatórias</h1>
                        {dataTeams.map((ress)=>(
                            <FormControl fullWidth style={{paddingTop:'2rem'}}>
                                <InputLabel id={ress.id}>Team</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id= {ress.id}
                                    value={undefined}
                                    label="Age"
                                    onChange={undefined}
                                >
                                    {dataTeams.map((res)=>(
                                    <MenuItem value={res.id}> {res.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                        </div>
                        <div style={{position:'absolute', width:'8rem', paddingTop:'1rem', paddingBottom:'1rem', left:'25rem', top:'0%'}}>
                            <h1>Semi-finais</h1>
                        {dataTeams.map((ress)=>(
                            <FormControl fullWidth style={{paddingTop:'2rem'}}>
                                <InputLabel id={ress.id}>Team</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id= {ress.id}
                                    value={undefined}
                                    label="Age"
                                    onChange={undefined}
                                >
                                    {dataTeams.map((res)=>(
                                    <MenuItem value={res.id}> {res.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                        </div>
                        <div style={{position:'absolute', width:'8rem', paddingTop:'1rem', paddingBottom:'1rem', top:'0%', left:'43rem'}}>
                            <h1>Final</h1>
                        {dataTeams.map((ress)=>(
                            <FormControl fullWidth style={{paddingTop:'2rem'}}>
                                <InputLabel id={ress.id}>Team</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id= {ress.id}
                                    value={undefined}
                                    label="Age"
                                    onChange={undefined}
                                >
                                    {dataTeams.map((res)=>(
                                    <MenuItem value={res.id}> {res.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                        </div>
                    </div>

                </>
            )
        }
        else {
            return (
                <div style={{
                    width: "80%",
                    borderRadius: "1%",
                    position: 'absolute',
                    zIndex: 0,
                    objectFit: "cover",
                    top: 700,
                    left: 150,
                    backgroundColor: "#FFFFFF",
                    paddingLeft:'2rem',
                    color: "#052F53"
                }}>
                    <h1>Carregando TournamentBracket...</h1>
                </div>
            )
        }
    }


    return(
        <>
        {mostraTournamentBracket(dataTeams)}
        </>
    )
}