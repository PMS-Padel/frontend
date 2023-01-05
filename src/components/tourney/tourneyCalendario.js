import React, {useState, useEffect, useRef,} from "react";
import axiosConfig from "../../axiosConfig";
import ScheduleTable from "../ScheduleTable";
//import { DndProvider } from "react-dnd";
//import { HTML5Backend } from "react-dnd-html5-backend";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import 'moment/locale/pt'; // add this line

moment.locale('pt'); // set the locale
const localizer = momentLocalizer(moment);


export default function TourneyCalendario({tourney, storedAuth}) {
    const [dataTeams, setDataTeams] = useState([]);
    const [update, setUpdate] = useState(false);
    const [games, setGames] = useState([]);
    const [eventss, setEvents] = useState([]);

    useEffect(() => {
        //console.log(tourney)
        axiosConfig.get(`getteams/${tourney.id}`, {
            headers: {
                Authorization: 'Bearer ' + storedAuth
            }
        })
            .then((res) => {
                let { data } = res;
                setDataTeams(data)
                //console.log(data)
            })
            .catch((error) => false);
        axiosConfig.get(`get-tournament-games/${tourney.id}`, {
            headers: {
                Authorization: 'Bearer ' + storedAuth
            }
        })
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

    useEffect(() => {
        let resultGames = [];
        games?.map((game, index) => {
            resultGames.push({
                start: moment(new Date(game.start_at).toISOString().substring(0, 10) + ' ' + new Date(game.start_at).toISOString().substring(11, 16)).toDate(),
                end: moment(new Date(moment(game.start_at).add('1', "hours")).toISOString().substring(0, 10) + ' ' +
                    new Date(moment(game.start_at).add('1', "hours")).toISOString().substring(11, 16)).toDate(),
                title: game.team1.player1.name + ' | ' + game.team1.player2.name + ' vs ' + game.team2.player1.name + ' | ' + game.team2.player2.name + '\n'
                    + ' -- Campo: ' + (game.campo_id === 1 ? 'Grupo São Roque' : 'Alberto Oculista'),
            });
        })
        setEvents(resultGames);
        //console.log(eventss);
    }, [games, dataTeams]);

    return(
        <>
            {update &&
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
                    <Calendar
                        selectable={false}
                        localizer={localizer}
                        defaultDate={new Date(tourney.init_date).toISOString().substring(0, 10)}
                        defaultView="agenda"
                        events={eventss}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
            }
            {!update &&
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
                    <h1>Carregando calendário...</h1>
                </div>
            }
        </>
    )
}