const express = require('express');
const sequelize = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const stockLevelRoutes = require('./routes/stockLevelRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(productRoutes);
app.use(stockLevelRoutes);

const startServer = async () => {
    try{
        await sequelize.authenticate();
        console.log("DB connected");
        await sequelize.sync();
        console.log("DB synchronized");
        
        app.listen(PORT, (err) => {
              err? console.log(err) : console.log(`Listening on ${PORT} port`)
        });
    
    } catch (err) {
        console.log("DB connection error: ", err) 
    }
}

startServer();
