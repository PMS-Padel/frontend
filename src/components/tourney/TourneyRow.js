import React, {Component} from "react";
import Row from "../general/Row";
import axiosConfig from "../../axiosConfig";
import AlertPopup from "../general/AlertPopup";
import MediaCard from "../general/Card";
import {Grid} from "@mui/material";

export default class TourneyRow extends Component {
    state = {
        tourneys: false,
        errorAlertTourney: {open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro na busca de torneios. Verifique e tente novamente.'}
    };
    componentDidMount() {
        this.getAllTourneys();
    }
    getAllTourneys = async () => {
        const res = await axiosConfig.post('/gettournaments',{})
            .then((res) => res)
            .catch((error) => false);

        if(res !== false) {
            this.setState({tourneys: res.data});
        }
        else
        {
            this.setState(prevState => ({
                errorAlertTourney: {
                    ...prevState.errorAlertTourney,
                    open: true
                }
            }))
        }
    };
    handleErrorAlertCloseTourney = () => {
        this.setState(prevState => ({
            errorAlertTourney: {
                ...prevState.errorAlertTourney,
                open: false
            }
        }))
    }

    handleTourneyCards = () => {
        if(this.state.tourneys.length > 0)
        {
            return (
                <Grid container rowSpacing={1} columnSpacing={0}
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center">
                    {
                        this.state.tourneys.slice(0, (this.props.maxLength)).map(function(tourney, index){
                            return <Grid item xs={3} key={index}>
                                <MediaCard tourney={tourney}/>
                            </Grid>
                        })
                    }
                </Grid>
            )
        }
        else if(this.state.tourneys.length === 0)
        {
            return (
                <h1 style={{fontSize: "20px", color: "#052F53"}}>Não existe nenhum torneio de momento...</h1>
            )
        }
        else
        {
            return (
                <h1 style={{fontSize: "20px", color: "#052F53"}}>Carregando...</h1>
            )
        }
    }
    render() {
        return this.handleTourneyCards()
    }
}