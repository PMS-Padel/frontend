import axiosConfig from "../../axiosConfig";
import React, { useState, useEffect,} from "react";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import { Typography, Box } from "@mui/material";


export default function TourneyInscritos({tourney, user, storedAuth}) {
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

    function mostraTabela(dataTeams){
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
                    <table style={{padding:'2rem', justifyContent:'center', textAlign: 'center'}}>
                        <thead>
                            <tr>
                                <th>Nome da equipa</th>
                                <th>Jogadores</th>
                                <th>Níveis</th>
                                <th>Data de inscrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTeams.map((res)=>(
                                <tr>
                                <td style={{ padding: "0 15px" }}>{res.name}</td>
                                <td style={{ padding: "0 15px" }}>{res.player1_id.name} | {res.player2_id.name} </td>
                                <td style={{ padding: "0 15px" }}>{res.player1_id.level} | {res.player2_id.level} </td>
                                <td style={{ padding: "0 15px" }}>{res.subscription_date}</td>
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
                    <h1>Carregando tabela...</h1>
                </div>
            )
        }
    }


    return(
        <>
            {mostraTabela(dataTeams)}
        </>
    )
}