const mongoose=require('mongoose')
const {Schema,model}=mongoose

const empSchema=new Schema({
    name:String,
    email:String,
    mobileNo:String,
    designation:String,
    gender:String,
    course:String,
    image:String
   


},{timestamps:true})
const Employee=model('Employee',empSchema)
module.exports=Employee