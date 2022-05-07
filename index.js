const connecttoMongo = require('./db');
const express = require('express')
var cors = require('cors')
const path = require('path');


connecttoMongo();

const app = express();
app.use(cors());


app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/notes', require('./routes/notes'));


//-------------------------DEPLOYMENT CODE------------------------------------


if(process.env.NODE_ENV === 'production')
{
   app.use(express.static("client/build"))
   app.get("*",(req,res)=>{
     res.sendFile(path.resolve(__dirname,'client','build','index.html'));
   })
}
else{
  app.get('/',(req, res)=>{
    res.send("Api running successfully");
  })
}

//-------------------------------------------------------------


app.listen(process.env.PORT || 5000, () => {
  console.log(`My app listening at https://cloudnotes123.herokuapp.com${process.env.PORT || 5000}`)
}) 