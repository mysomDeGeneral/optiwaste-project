const mongoose = require('mongosose');


const USERmodel = new mongoose.Schema({
    name:{
        type:string
    },
    password:{
    type :string
},
email:{
    type:email,
    required:true
    
}

})

const myModel =new mongoose.model('user',mySchema,'custom_collection_name');

module.exports=myModel;