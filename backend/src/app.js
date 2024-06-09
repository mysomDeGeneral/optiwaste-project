const express = require('express');
let app = express();
const PORT = 9000;

app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.send('hello');
})




app.listen(PORT,()=>{
    console.log('go');
})


