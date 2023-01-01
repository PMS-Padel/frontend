import axiosConfig from "../../axiosConfig";
import React, {useState, useEffect, useRef,} from "react";
import {DownloadTableExcel} from "react-export-table-to-excel";
import {Button} from "@mui/material";

export default function TourneyInscritos({tourney, storedAuth}) {
    const [dataTeams, setDataTeams] = useState(undefined);
    const tableRef = useRef(null);

    useEffect(() => {
        if(tourney !== undefined)
        {
            axiosConfig.get(`getteams/${tourney.id}`, {
                headers: {
                    Authorization: 'Bearer ' + storedAuth
                }
            })
                .then((res) => {
                    let {data} = res;
                    setDataTeams(data)
                })
                .catch((error) => false);
        }
    },[tourney])

    function mostraTabela(dataTeams){
        if (tourney !== undefined && dataTeams !== undefined){
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
                        color: "#052F53",
                        textAlign: "center",
                        justifyContent: "center",
                    }}>
                        <div>
                            <DownloadTableExcel
                                filename="users table"
                                sheet="users"
                                currentTableRef={tableRef.current}>
                                <Button variant="contained" style={{textTransform: 'none', backgroundColor: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53",
                                    marginTop: "20px"}}>Exportar em Excel</Button>
                            </DownloadTableExcel>
                        </div>
                        <table ref={tableRef} style={{padding:'2rem', justifyContent:'center', textAlign: 'center'}}>
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
                                    <tr key={res.id}>
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