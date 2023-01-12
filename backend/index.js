const express = require("express");
const app = express();
const sql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = sql.createConnection({
  host: "localhost",
  port: 3306,
  database: "timetable",
  user: "root",
  password: "Karthik@123",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection successfull");
  }
});

/* getting all the lecturers*/
const que = "SELECT * FROM Lecturer";
app.get("/Lecturer", (req, res) => {
  if (connection) {
    connection.query(que, (err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
  }
});

/* getting all the class rooms*/
app.get("/classroom", (req, res) => {
  if (connection) {
    connection.query("select * from classroom", (err, result) => {
      if (err) res.status(400).send(err);
      else res.json(result);
    });
  }
});

/* getting all subjects */
app.get("/subject", (req, res) => {
  if (connection) {
    connection.query(
      "select subject_id, subject_name from subject",
      (err, result) => {
        if (err) res.status(err.code).send(err.message);
        else res.json(result);
      }
    );
  }
});

/*adding a lecturer*/
app.post("/register/Lecturer", (req, res) => {
  let data = req.body;
  const { id, lectName, address, phone } = data;
  if (connection) {
    connection.query(
      `INSERT INTO LECTURER VALUES(${Number(
        id
      )},'${lectName}','${phone}','${address}')`,
      (err, result) => {
        if (err) {
          res.status(400).send({ err });
        } else res.status(200).send("success");
      }
    );
  }
});

/*adding a subject */
app.post("/register/subject", (req, res) => {
  let data = req.body;
  const { Subject_id, Subject_name, Lecturer_id } = data;
  if (connection) {
    connection.query(
      `INSERT INTO SUBJECT VALUES('${Subject_id}','${Subject_name}',${Number(
        Lecturer_id
      )})`,
      (err, result) => {
        if (err) {
          res.status(400).send({ err });
        } else res.status(200).send("success");
      }
    );
  }
});

/*adding a classRoom */
app.post("/register/classroom", (req, res) => {
  let data = req.body;
  const { Classroom_id, Floor_no, capacity } = data;
  if (connection) {
    connection.query(
      `INSERT INTO classroom VALUES(${Number(Classroom_id)},${Number(
        Floor_no
      )},${Number(capacity)})`,
      (err, result) => {
        if (err) {
          res.status(400).send({ err });
        } else res.status(200).send("success");
      }
    );
  }
});
/*adding a Schedule*/
app.post("/register/schedule", (req, res) => {
  let data = req.body;
  const { Time, Day, Lecturer_id, Class_id, Subject_id, class_room_id } = data;
  if (connection) {
    connection.query(
      `INSERT INTO schedule(class_time, class_day, Lecturer_id,Class_id, Subject_id, classroom_id) VALUES('${Time}','${Day}',${Number(
        Lecturer_id
      )},${Number(Class_id)},'${Subject_id}',${Number(class_room_id)})`,
      (err, result) => {
        if (err) {
          res.status(400).send({ err });
        } else res.status(200).send("success");
      }
    );
  }
});

/*deleting a teacher*/
app.delete("/:entity/:id", (req, res) => {
  let { entity, id } = req.params;
  if (isNaN(Number(id))) {
    id = `'${id}'`;
  } else {
    id = Number(id);
  }
  if (connection) {
    connection.query(
      `delete from ${entity} where ${entity}_id = ${id}`,
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result);
      }
    );
  }
});


/* getting all the classes on a perticular day*/
app.get("/timetable/:classId/:sem",(req,res)=>{
   const {classId,sem} = req.params;
   if(connection){
    connection.query(`select sc.class_Day, sc.class_time,s.subject_name from schedule sc join subject s on s.subject_id = sc.subject_id join class c on c.class_id = sc.class_id where c.semester = ${Number(sem)} and c.Class_id=${Number(classId)} order by class_Day,class_time`, (err, result)=>{
      if(err){
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result);
    })
   }
})

/* get user details */
app.get('/user/:email',(req,res)=>{
  const {email} = req.params;
  if(connection){
    connection.query(`SELECT * FROM USER WHERE USEREMAIL = '${email}'`, (err,result)=>{
      if(err){
        res.status(400).send(err);
      }

      res.status(200).send(result)
    })
  }
})

/*add user*/
app.post('/register/user/now',(req,res)=>{
  let data = req.body;
  const { email,type } = data;
  if (connection) {
    connection.query(
      `INSERT INTO user VALUES('${email}','${(type)}')`,
      (err, result) => {
        if (err) {
          res.status(400).send({ err });
        } else res.status(200).send("success");
      }
    );
  }
})

/* get schedule of a particular lecturer*/
app.get('/newtimetable/:lecturerID/:time',(req, res)=>{
  const{lecturerID, time} = req.params;
  if(connection){
    connection.query(`select sc.classroom_id as room_no,  c.course_name as course, c.semester as semester, sc.class_time as timings, s.Subject_name as Subject from schedule sc
    join class c on c.class_id = sc.class_id
    join Subject s on S.subject_id = sc.subject_id
    where sc.Lecturer_id = ${lecturerID} and sc.class_Day = '${time}'`,(err,result)=>{
      if(err){
        res.status(400).send(err);
      }
      res.status(200).send(result);
    })
  }
})


app.listen(3030, () => {
  console.log("server is listening");
});
