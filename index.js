let express=require('express');
const app= express();
const cors=require('cors')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.use(express.json({limit:'50mb'}))
app.use(cors({origin:'*'}))
require('dotenv').config()
const patientRouter= require('./routes/patient.route')
app.use('/patient',patientRouter)
let PORT= process.env.PORT||4000
const URL=process.env.URI;

const cloudinary = require('cloudinary')



cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});




app.get('/',(req,res)=>{
res.send('hello world backend is working')
})

// app.get('/patient',(req,res)=>{
//     res.send('HELLO WORLD, Backend is running')
//     })


mongoose.connect(URL,(err)=>{
if(err){
	console.log('Error in Connection')
}else{
	console.log('succesful connected to databse')
}
})






app.listen(PORT,()=>{
	console.log('running on port 4000');
})