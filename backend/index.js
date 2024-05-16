
const express = require('express');
const dbConnect = require('./config/dbConnect');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/authRoute')
const instructorRoutes = require('./routes/instructorRoute')
const courseRoutes = require('./routes/courseRoute')
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();


app.use(cors())

const PORT = process.env.PORT || 4000;
dbConnect()
app.use(bodyParser.json());


app.use('/api/user',authRouter)
app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);


app.listen(PORT,()=>{
    console.log(`server is ronning on Port ${PORT}`)
})