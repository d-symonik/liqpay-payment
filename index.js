require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require("./routes");

const {errorHandler} = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 5000;
const DB_CON = process.env.DB_CON;

const app = express();

app.use(cors());

app.use('/test', router);

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(DB_CON);

        app.listen(PORT, () => console.log(`Start on ${PORT}`));
    } catch (err) {
        console.log(err.message);
    }

};
start();


