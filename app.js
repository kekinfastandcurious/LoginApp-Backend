const express = require('express');
const dotenv = require('dotenv');
const users = require('./models/users');
const jwt = require('jsonwebtoken');
const lib = require('./lib');

dotenv.config();

const app = express();
app.use(express.json(), (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});


const port  = process.env.PORT || 8080;
const secretKey = process.env.SECRET_KEY;

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const isUserPresent = users.findIndex(u => u.email===email && u.password === password);

    if(isUserPresent > -1) {
        const accessToken = jwt.sign({email,password}, secretKey, {expiresIn: '1h'});
         const encryptedPassword = await lib.encryptPasswords(password);
        res.send({email: email, password: encryptedPassword, accessToken});
    }
    else{
        res.status(400).send("Invalid credentials!");
    }
});

app.listen(port);