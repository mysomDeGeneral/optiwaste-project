const express = require('express');
let app = express();
const PORT = 9000;
const ejs = require('ejs');
app.set('view-engine','ejs');
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.send('hello');
})




app.listen(PORT,()=>{
    console.log('go');
})


