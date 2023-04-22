const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
require('dotenv').config();

app.use(cors({
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-type',
    ]
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/config/mongoose.config');
console.log(process.env.SECRET_KEY);

require('./server/routes/academias.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));