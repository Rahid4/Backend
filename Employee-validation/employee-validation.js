const Employee = require('../Employee-model/employee.model')

const nameSchemaValidation = {
    notEmpty:{
        errorMessage:'This field is required'
    },
    

}
const emailSchemaValidation = {
    notEmpty:{
        errorMessage:'This field is required'
    },
    isEmail:{
        errorMessage:'invalid email format'
    },
    custom:{
        options: async(value)=>{
            const email = await Employee.findOne({email:value})
            if(email){
                throw new Error('This email is already Used')
            }else{
                return true
            }

        }
    }
}
const mobileSchemaValidation = {
    notEmpty:{
        errorMessage:'mobile number should not be empty'
    },
    isLength:{
        options:{
            min:10,max:10
        },
        errorMessage:'mobile number should consist of 10 numbers'
    },
    isNumeric:{
        errorMessage:'mobile number should contain only numbers'
    },
    custom:{
        options: async(value)=>{
            const mobile = await Employee.findOne({mobileNo:value})
            if(mobile){
                throw new Error('mobile number is already used')
            }else{
                return true
            }


        }
    }
}
const designationSchemaValidation = {
    notEmpty:{
        errorMessage:'This field is required'
    },
    

}
const genderSchemaValidation = {
    notEmpty:{
        errorMessage:'This field is required'
    },
    
}
const courseSchemaValidation = {
    notEmpty:{
        errorMessage:'This field is required'
    },
    
}
const imageSchemaValidation = {
    notEmpty:{
        errorMessage:'This field is required'
    },
    
}
const employeeCreateValidationSchema = {
    name:nameSchemaValidation,
    email:emailSchemaValidation,
    mobileNo:mobileSchemaValidation,
    designation:designationSchemaValidation,
    gender:genderSchemaValidation,
    course:courseSchemaValidation,
    image:imageSchemaValidation


}

module.exports = {
    employeeCreateSchema : employeeCreateValidationSchema
    

}