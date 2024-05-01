const _ = require('lodash');
const { validationResult } = require('express-validator');
const Employee = require('../Employee-model/employee.model');

const employeeCtrl = {}; 


employeeCtrl.create = async (req, res) => {
  
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  
  const body = _.pick(req.body, ['name', 'email', 'mobileNo', 'designation', 'gender', 'course', 'image']);
  console.log(body,'body')
  
  try {
    
    const emp = new Employee(body);
    
    const savedEmployee = await emp.save();
    
    return res.json(savedEmployee);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};


  employeeCtrl.getAll = async (req, res) => {
    try {
      
      const employees = await Employee.find();
      
      return res.json(employees);
    } catch (e) {
      
      return res.status(500).json({ error: e.message });
    }
  };


module.exports = employeeCtrl; 
