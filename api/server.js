import express from 'express'
import pool from './database/db.js'
import cors from 'cors'
import bodyParser from "body-parser";
import http from "http";

const app = express();

const PORT = 3000
const apiURL = `http://localhost:${PORT}`

const server = http.createServer(app);

import userRoute from './routes/user.router.js';
import providerRoute from './routes/provider.router.js';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/users',userRoute);
app.use('/providers',providerRoute);



server.listen( PORT,() => {
    console.log(`API lancé sur ${apiURL}`);
    pool.connect((err) => {
        if (err) {
            console.error('Erreur de connexion à la base de données :', err);
        } else {
            console.log('Connexion à la base de données réussie 😏😏  ');
        }
    });
});

export default app