import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function MediaCard({tourney}) {
    function verifyStatus() {
        let initDate = new Date(tourney.init_date);
        let endDate = new Date(tourney.end_date);
        let now = new Date();

        if (now.getTime() < initDate.getTime() ) {
            return (
                <Button variant="outlined" color="success" style={{ borderRadius: 15, borderWidth: 2 }}>Inscrições Abertas</Button>
            )
        }
        else if (initDate.getTime() < now.getTime() && now.getTime() < endDate.getTime() ) {
            return (
                <Button variant="outlined" color="primary" style={{ borderRadius: 15, borderWidth: 2 }}>A Decorrer</Button>
            )
        }
        else if (endDate.getTime() < now.getTime()) {
            return (
                <Button variant="outlined" color="error" style={{ borderRadius: 15, borderWidth: 2 }}>Terminado</Button>
            )
        }
        else
        {
            return (
                <Button variant="outlined" color="primary" style={{ borderRadius: 15, borderWidth: 2 }}>Mais detalhes</Button>
            )
        }
    }

    //console.log(new Date(tourney.init_date).toLocaleDateString())

    let altText = "Imagem acerca de " + tourney.name;
    return (
        <Card sx={{ width: 350, minHeight: 350, borderRadius: 10, backgroundColor: "rgba(111, 155, 195, 0.49)", textAlign: "center", verticalAlign: "middle" }} >
            <CardMedia
                component="img"
                height="200"
                image={tourney.file_url}
                alt={altText}
            />
            <CardContent>
                <div>
                    <h1 style={{fontSize: "35px", color: "#052F53", margin: 0}}>{tourney.name}</h1>
                </div>
                <div>
                    <h3 style={{fontSize: "20px", color: "#052F53", margin: 0}}>
                        <LocationOnIcon sx={{ marginRight: "5px", position: 'relative', top: '8px' }}/>
                        {tourney.location}
                    </h3>
                </div>
            </CardContent>
            <CardActions sx={{ justifyContent: "center", marginBottom: "15px" }}>
                {verifyStatus()}
            </CardActions>
        </Card>
    );
}
