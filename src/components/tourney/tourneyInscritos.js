import axiosConfig from "../../axiosConfig";
import React, { useState, useEffect,} from "react";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import { Typography, Box } from "@mui/material";


export default function TourneyInscritos({tourney, user, storedAuth}) {

    const [dataTeams, setDataTeams] = useState({});
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        mostraTabela(dataTeams)
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
                setUpdate(true)

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
                    <div style={{position:'relative', top:'10rem', backgroundColor:'white', paddingTop:'1rem', marginLeft:'15rem', marginRight:'15rem', paddingBottom:'1rem', borderRadius: '5px' }}>
                    <table style={{paddingLeft:'2rem', borderCollapse:' collapse', position:'relative', left:'13%'}}>
                        <thead style={{paddingLeft:'2rem', position:'relative', marginLeft:'2rem'}}>
                            <tr style={{paddingLeft:'2rem', border:'1px solid #052F53'}}>
                                <th style={{ border:'1px solid #052F53', width:'33%', padding:'1rem'}}>Nome da equipa</th>
                                <th style={{ border:'1px solid #052F53', width:'33%', padding:'1rem'}}>Jogadores</th>
                                <th style={{ border:'1px solid #052F53', width:'33%', padding:'1rem'}}>Data de inscrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTeams.map((res)=>(
                                <tr>
                                <td style={{ border:'1px solid #052F53', width:'33%', padding:'1rem'}}>{res.name}</td>
                                <td style={{ border:'1px solid #052F53', width:'33%', padding:'1rem'}}>{res.player1_id} <br></br> {res.player2_id} </td>
                                <td style={{ border:'1px solid #052F53', width:'33%', padding:'1rem'}}>{res.subscription_date}</td>
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
        {mostraTabela(dataTeams)}
 

        </>
    )
}