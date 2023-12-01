import mongoose from "mongoose";


// connect to database using mongodb
mongoose.connect('mongodb://0.0.0.0:27017/authApp_data');

export const db = mongoose.connection;

db.on('on',console.error.bind(console,'error while connecting to database'));

// on successfull connection
db.once('open',()=>{
    console.log('successfully connected to database')
});
