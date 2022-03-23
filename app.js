const express = require('express');
// const bodyParser = require('body-parser');
// const formidable = require('formidable');
const dotenv = require('dotenv');
const users = require('./models/users');
const jwt = require('jsonwebtoken');
const lib = require('./lib');
// const cors = require('./cors');

// const form  = formidable({multiples: true});
dotenv.config();

const app = express();
app.use(express.json(), (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});

// app.use(formidable());


const port  = process.env.PORT || 8080;
const secretKey = process.env.SECRET_KEY;

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    // console.log(req.fields);
    // const {} = req.fields;

    // console.log('req.params', req);
    // form.parse(req, (err, fields, files) => {
    //     console.log('fields',  Object.keys(fields));
    // });

    console.log('Email', email);
    console.log('Password', password);

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