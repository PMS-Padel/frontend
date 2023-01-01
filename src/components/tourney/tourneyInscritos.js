import axiosConfig from "../../axiosConfig";
import React, { useState, useEffect,} from "react";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import { Typography, Box } from "@mui/material";


export default function TourneyInscritos({tourney, user, storedAuth}) {

    const [dataTeams, setDataTeams] = useState({});
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axiosConfig.get(`getteams/2`,{
            headers: {
                Authorization: 'Bearer ' + storedAuth
            }
        })
            .then((res) => {
                console.log(res)
                console.log('divider')
                console.log(res.data)
                let {data} = res;
                setDataTeams(data)
                setUpdate(!update)

            })
            .catch((error) => false);
        },[])

    useEffect(() => {
        console.log('2 divider')
        console.log(dataTeams)
    },[dataTeams])

    function mostraTabela(dataTeams){

        if (update){
            return(
                <>
                    <div style={{position:'relative', backgroundColor:'green', top:'5rem', left:'20%', width:'40rem'}}>
                    <table style={{padding:'2rem'}}>
                        <thead>
                            <tr>
                                <th>Nome da equipa</th>
                                <th>Jogadores</th>
                                <th>Data de inscrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTeams.map((res)=>(
                                <tr>
                                <td>{res.name}</td>
                                <td>{res.player1_id} | {res.player2_id} </td>
                                <td>{res.subscription_date}</td>
                                </tr>
                            ))}
            


                        </tbody>

                    </table>
                    </div>
                </>
            )
        }
        else {
            return (
                <h1> Carregando tabel.</h1>
            )
        }
    }


    return(
        <>
        <h1>inscrições</h1>
        {mostraTabela(dataTeams)}
 

        </>
    )
}