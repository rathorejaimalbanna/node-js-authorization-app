// import mongoose
import mongoose from "mongoose";


// define schema
const userSchema = new mongoose.Schema({
    name:{type:String},userName:{type:String},password:{type:String}
});

export const userData = mongoose.model('userData',userSchema);