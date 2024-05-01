const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { checkSchema } = require('express-validator');
const employeeCltr = require('../Backend/Employee-controller/EmpCltr');
const { employeeCreateSchema } = require('./Employee-validation/employee-validation');

const app = express();
app.use(express.json());
const port = 3786;
mongoose.connect('mongodb+srv://shaikrahid2001:shaikrahid@cluster0.1btcp3s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log('err connercted to db', err);
    });


const user = {
    userName: 'Shaik Rahid',
    password: 'Shaik@12',
};


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};


app.post('/api/login', async (req, res) => {
    const { userName, password } = req.body;

    if (userName === user.userName && password === user.password) {
        const token = jwt.sign({ userName: user.userName }, 'secret_key', { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});


app.post('/api/create', verifyToken, checkSchema(employeeCreateSchema), employeeCltr.create);
app.get('/api/get', verifyToken, employeeCltr.getAll);
app.put('/api/edit/:id', verifyToken, checkSchema(employeeCreateSchema), employeeCltr.edit);
app.delete('/api/delete/:id', verifyToken, employeeCltr.delete);

app.listen(port, () => {
    console.log('server running on port', port);
});
