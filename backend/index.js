const express = require('express');
const app =  express();
const sql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const connection = sql.createConnection({
    host:'localhost',
    port:3306,
    database:'timetable',
    user:'root',
    password:'Karthik@123'
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("connection successfull");
    }
})

/* getting all the lecturers*/
const que = 'SELECT * FROM Lecturer';
app.get('/',(req,res)=>{
    if (connection){
        connection.query(que,(err,result)=>{
            if(err)console.log(err)
           res.json(result);
        })
    }
})


/*adding a lecturer*/
app.post('/register/teacher',(req,res)=>{
    let data = req.body;
    console.log(data);
    const {id,lectName,address,phone} = data;
    console.log(typeof(Number(id)),typeof(lectName),typeof(address),typeof(phone))
    if(connection){
        connection.query(`INSERT INTO LECTURER VALUES(${Number(id)},'${lectName}','${phone}','${address}')`,(err,result)=>{
            if(err){
                console.log(err);
                res.send("error")
            }
            else res.status(200).send("success");
        })
    } 
})



app.listen(3030,()=>{
    console.log("server is listening")
})