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
            if(err) res.status(400).send(err);
            else res.json(result);
        })
    }
})

/* getting all subjects */
app.get("/subject",(req,res)=>{
    if(connection){
        connection.query("select subject_id, subject_name from subject",(err, result)=>{
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
                res.status(400).send({err})
            }
            else res.status(200).send("success");
        })
    } 
})


/*adding a subject */
app.post('/register/subject',(req,res)=>{
    let data = req.body;
    const {Subject_id,Subject_name,Lecturer_id} = data;
    if(connection){
        connection.query(`INSERT INTO SUBJECT VALUES('${(Subject_id)}','${Subject_name}',${Number(Lecturer_id)})`,(err,result)=>{
            if(err){
                res.status(400).send({err})
            }
            else res.status(200).send("success");
        })
    } 
})

/*adding a classRoom */
app.post('/register/classroom',(req,res)=>{
    let data = req.body;
    const {Class_room_id, Floor_no, capacity} = data;
    if(connection){
        connection.query(`INSERT INTO class_room VALUES(${Number(Class_room_id)},${Number(Floor_no)},${Number(capacity)})`,(err,result)=>{
            if(err){
                res.status(400).send({err})
            }
            else res.status(200).send("success");
        })
    } 
})
/*adding a Schedule*/
app.post('/register/schedule',(req,res)=>{
    let data = req.body;
    const {Time, Day, Lecturer_id, Class_id, Subject_id, class_room_id} = data;
    if(connection){
        connection.query(`INSERT INTO schedule(class_time, class_day, Lecturer_id, Class_id, Subject_id, class_room_id) VALUES('${Time}','${(Day)}',${Number(Lecturer_id)},${Number(Class_id)},'${Subject_id}',${Number(class_room_id)})`,(err,result)=>{
            if(err){
                res.status(400).send({err})
            }
            else res.status(200).send("success");
        })
    } 
})

/*deleting a teacher*/
app.delete('/:entity/:id',(req, res)=>{
    const {entity,id} = req.params;
    if(connection){
        connection.query(`delete from Lecturer where Lecturer_id = ${Number(id)}`,(err, result) => {
            if(err){
                res.status(400).send(err);
            }
            res.status(200).send(result);
        })
    }
})



app.listen(3030,()=>{
    console.log("server is listening")
})