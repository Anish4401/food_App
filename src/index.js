const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app = express()
const mongoose=require('mongoose')

//Connecting MongoDB with node
const Db='mongodb://anishku1686:SXIlaSWGGipJY8z9@cluster0-shard-00-00.salw8.mongodb.net:27017,cluster0-shard-00-01.salw8.mongodb.net:27017,cluster0-shard-00-02.salw8.mongodb.net:27017/?ssl=true&replicaSet=atlas-6z18ot-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(Db,{
}).then(()=>{
    console.log("Connected to MongoDB")
}).
catch((err)=>{
console.log("not connectedd",err);

})

//middleware
const homeRoutes=require('./Router/homeRoutes')
app.use(cors())
app.use(bodyParser.json())
app.use('/',homeRoutes)

//import auth routes
const authRoute=require('../src/Router/authRouter')
app.use('/auth',authRoute)
//import user routes
const userRoute=require('../src/Router/userRoutes')
app.use('/user',userRoute)

module.exports={app}
function StartServer() {
  
    app.listen(3000,()=>{
   
        console.log('server is running on port 3000 Anish')}
        )}

StartServer()
// module.exports={app};


