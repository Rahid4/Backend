const express=require('express')
const mongoose=require('mongoose')
const {checkSchema}=require('express-validator')
const employeeCltr=require('../Backend/Employee-controller/EmpCltr')
const {employeeCreateSchema}=require('./Employee-validation/employee-validation')




const app=express()
app.use(express.json());
const port=3786
mongoose.connect('mongodb+srv://shaikrahid2001:shaikrahid@cluster0.1btcp3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log('err connercted to db',err)
    })

// apis
app.post('/api/create',checkSchema(employeeCreateSchema),employeeCltr.create)
app.get('/api/get',employeeCltr.getAll)
app.put('/api/edit/:id',checkSchema(employeeCreateSchema),employeeCltr.edit)
app.delete('/api/delete/:id',employeeCltr.delete)

app.listen(port,()=>{
    console.log('server running on port',port)
})