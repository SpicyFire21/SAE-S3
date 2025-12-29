import express from 'express'
import pool from './database/db.js'
import cors from 'cors'
import bodyParser from "body-parser";
import http from "http";

import swaggerUi from "swagger-ui-express"
import swaggerConfig from './config/swaggerConfig.js'
const app = express();

const PORT = 3000
const apiURL = `http://localhost:${PORT}`

const server = http.createServer(app);

import userRoute from './routes/user.router.js';
import providerRoute from './routes/provider.router.js';
import goodieRoute from './routes/goodie.router.js';
import colorRoute from './routes/color.router.js';
import sizeRoute from './routes/size.router.js';
import basketRoute from './routes/basket.router.js'
import autographRoute from './routes/autographs.router.js'
import filmRoute from './routes/film.router.js'
import projectionRoute from './routes/projection.router.js'
import standRoute from './routes/stand.router.js'
import ticketRoute from './routes/ticket.router.js'
import GenreRoute from './routes/genres.router.js'




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig.swaggerDocs));

app.use('/users',userRoute);
app.use('/providers',providerRoute);
app.use('/goodies',goodieRoute);
app.use('/colors',colorRoute);
app.use('/sizes',sizeRoute);
app.use('/baskets',basketRoute);
app.use('/autographs',autographRoute);
app.use('/films',filmRoute);
app.use('/projections',projectionRoute);
app.use('/stands',standRoute);
app.use('/tickets',ticketRoute);
app.use('/genres',GenreRoute);




server.listen( PORT,() => {
    console.log(`API lancé sur ${apiURL}`);
    pool.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
        } else {
            console.log('Connexion à la base de données réussie  ');
        }
    });
});

export default app