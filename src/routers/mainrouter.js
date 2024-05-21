const express = require('express');
let app = express();
const Router = express.Router();
app.use(express.static('public'));
app.set('view-engine','ejs');
app.use(express.json);



Router.get('/',(req,res)=>{
    res.send('signup');
});























module.exports =Router;