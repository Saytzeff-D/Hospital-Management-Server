let express=require('express');
const app= express();
const cors=require('cors')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.use(bodyParser.json({limit:'50mb'}));
// app.use(express.json({limit:'50mb'}))
app.use(cors({origin:'*'}))
require('dotenv').config()
const patientRouter= require('./routes/patient.route')
const staffRouter = require('./routes/staff.route');
app.use('/patient',patientRouter);
app.use("/staff", staffRouter);
let PORT= process.env.PORT
const URI = process.env.URI;

const cloudinary = require('cloudinary');



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});




app.get('/',(req,res)=>{
    res.send('Hospital Management Server Initialized')
})

// app.get('/patient',(req,res)=>{
//     res.send('HELLO WORLD, Backend is running')
//     })


mongoose.connect(URI,(err)=>{
if(err){
	console.log('Error in Connection to MongoDB')
}else{
	console.log('Connection to Mongoose Database Initialized')
}
})

app.listen(PORT,()=>{
	console.log('Hospital Management Server listening on Port 4000');
})
