
import React, { useState, useEffect, useRef, } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosConfig from "../../axiosConfig";
import moment from "moment/moment";

export default function TourneyMapaDeJogos({ tourney, storedAuth }) {
    const [dataTeams, setDataTeams] = useState([]);
    const [update, setUpdate] = useState(false);
    const [games, setGames] = useState([])

    useEffect(() => {
        //console.log(tourney)
        axiosConfig.get(`getteams/${tourney.id}`)
            .then((res) => {
                let { data } = res;
                setDataTeams(data)
                //console.log(data)
            })
            .catch((error) => false);
        axiosConfig.get(`get-tournament-games/${tourney.id}`)
            .then((res) => {
                let { data } = res;
                setGames(data)
                setUpdate(true)
            })
            .catch((error) => false);
    }, [tourney])

    useEffect(() => {
        games.sort((a, b) => {
            if (moment(a.start_at).isBefore(moment(b.start_at))) {
                return -1
            }
            return 1
        })
    }, [games])

    function newGame() {

        const submit = (e) => {
            e.preventDefault();

            let data = {}
            data.day = e.target[0].value
            data.hour = e.target[1].value
            data.team_id1 = e.target[2].value
            data.team_id2 = e.target[3].value
            data.tourney_id = tourney.id

            axiosConfig.post(`creategame`, data)
                .then((res) => {
                    window.location.reload()
                })
                .catch((error) => false);
        }


        return (<>
            {games?.map((game, index) => {
                //console.log(game)
                return (
                    <div>
                        {(index === 0 || !moment(games[index - 1].start_at).isSame(moment(game.start_at), 'date')) && <h3>{moment(game.start_at).format("DD/MM/YYYY")}</h3>}
                        <span>{moment(game.start_at).format("HH:mm")} - {game.team1.player1.name} | {game.team1.player2.name}</span>
                        <span> vs </span>
                        <span>{game.team2.player1.name} | {game.team2.player2.name}</span>
                        {(index === 0 || !moment(games[index - 1].start_at).isSame(moment(game.start_at), 'date')) && <form onSubmit={submit} >
                            <label>Começa a</label>
                            <input hidden type="date" name="day" value={moment(game.start_at).format("YYYY-MM-DD")} />
                            <select name="hour">
                                {Array(24).fill().map((_, index) => {
                                    return <option value={index + ':00'}>{index + ':00'}</option>
                                })}
                            </select>
                            <label>Equipa 1</label>
                            <select name="team_id1">
                                {dataTeams?.map((res) => {
                                    return <option value={res.id}>{res.player1_id.name} | {res.player2_id.name}</option>
                                })}
                            </select>
                            <label>Equipa 2</label>
                            <select name="team_id2">
                                {dataTeams?.map((res) => {
                                    return <option value={res.id}>{res.player1_id.name} | {res.player2_id.name}</option>
                                })}
                            </select>
                            <input type="submit" value="Adicionar" />
                        </form>}
                    </div>
                )
            })}
        </>)
    }

    function mostraTournamentBracket(dataTeams) {
        if (update) {
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
                    paddingLeft: '2rem',
                    color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"
                }}>
                    {newGame()}
                </div>
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
                    paddingLeft: '2rem',
                    color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"
                }}>
                    <h1>Carregando mapa de jogos...</h1>
                </div>
            )
        }
    }


    return (
        <>
            {mostraTournamentBracket(dataTeams)}
        </>
    )
}