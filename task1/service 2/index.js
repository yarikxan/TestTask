const express = require('express');
const sequelize = require('./config/db');

const logRoutes = require('./routes/logRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(logRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected');
        await sequelize.sync();
        console.log('DB synchronized');

        app.listen(PORT, (err) => {
            err? console.log(err) : console.log(`Listening on ${PORT} port`);
        });
    } catch (err) {
        console.log("DB connection error: ", err);
    }
}

startServer();
