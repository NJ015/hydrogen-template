import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dbConfig from './app/config/dbconfig.js';
import UserRoute from './app/routes/User.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ "message": "Hello Robots" });
});

app.use('/user', UserRoute);

mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Database Connected Successfully!!");
    })
    .catch(err => {
        console.error('Could not connect to the database', err);
        process.exit();
    });

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
