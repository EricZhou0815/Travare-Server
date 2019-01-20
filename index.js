require('dotenv').config();

const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const routes=require('./routes');

const db=require('./models');
const handle=require('./handlers');
const app=express();
const port=process.env.PORT;

app.use(cors());
app.use(bodyParser.json());


app.get('/test',(req,res)=>{res.json({hello:"world"});});
app.use('/api/auth',routes.auth);
app.use('/api/journeys',routes.journey);

//error handler
app.use(handle.notFound);
app.use(handle.errors);

app.listen(port,console.log(`Server started on port ${port}`));