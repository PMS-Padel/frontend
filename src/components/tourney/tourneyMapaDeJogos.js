
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
                setUpdate(!update)
            })
            .catch((error) => false);
        },[tourney])

    function mostraTournamentBracket(dataTeams){
        if (update){
            return(
                <>
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
                        <div className='Container'>

                            <div className='Branch_1'>

                                <div className='Object_1'>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Team</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={undefined}
                                        label="Age"
                                        onChange={undefined}
                                    >
                                        {dataTeams.map((res)=>(
                                        <MenuItem value={res.id}> {res.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </div>

                            </div>

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