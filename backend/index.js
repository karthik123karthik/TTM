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
app.get('/teacher',(req,res)=>{
    if (connection){
        connection.query(que,(err,result)=>{
            if(err)console.log(err)
           res.json(result);
        })
    }
})

/* getting all the class rooms*/
app.get("/classroom",(req,res)=>{
    if(connection){
        connection.query("select * from class_room",(err, result)=>{
            if(err)res.status(400).send(err.message)
            else res.json(result);
        })
    }
})

/* getting all subjects */
app.get("/subject",(req,res)=>{
    if(connection){
        connection.query("select * from subject",(err, result)=>{
            if(err)res.status(err.code).send(err.message)
            else res.json(result)
        })
    }
})


/*adding a lecturer*/
app.post('/register/teacher',(req,res)=>{
    let data = req.body;
    const {id,lectName,address,phone} = data;
    if(connection){
        connection.query(`INSERT INTO LECTURER VALUES(${Number(id)},'${lectName}','${phone}','${address}')`,(err,result)=>{
            if(err){
                res.status(400).send(err.message)
            }
            else res.status(200).send("success");
        })
    } 
})



app.listen(3030,()=>{
    console.log("server is listening")
})