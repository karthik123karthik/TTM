import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import style from "../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {motion as m} from "framer-motion";

export default function display() {
  const [data, setData] = useState();
  const [form, setForm] = useState({
    class_id: 201,
    sem: 1,
  });
  const [schedule, setSchedule] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });


  async function handledata(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3030/timetable/${form.class_id}/${form.sem}`
      );
      const result = await response.json();

      if(result.length == 0){
           toast.error("Data not Found !!!!")
           return;
      }

      for (let data of result) {
        schedule[data.class_Day] = [];
        };
      
      for (let data of result) {
        const curr = data.class_time;
        const subject = data.subject_name;
        schedule[data.class_Day].push({
         class_time:curr,
         subject:subject
        });
      }
      for ( let day of Object.keys(schedule)){
        let arr = schedule[day];
        let obj = arr[0];
        for(let i=1;i<=2;i++){
          arr[i-1] = arr[i];
        }
        arr[2]= obj;
        schedule[day] = arr;
      }

      setSchedule(prev => {
        return { ...prev, ...schedule}}
        );
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleChange(e) {
    form[e.target.name] = e.target.value;
    setForm((prev) => {
      return {
        ...prev,
        ...form,
      };
    });
  
  }

  return (
    <Layout>
      <m.div  initial={{ opacity: 0, scale: 0.7}}
            animate={{ opacity: 1, scale: 1}}
            transition={{ duration: 0.5 }} className={style.poster}>
      <h1 className="p-3 text-xl font-extrabold border-b-solid border-b-2">VIEW YOUR CLASSES</h1>
        <form
          onSubmit={handledata}
          className="mt-5 border-2 flex justify-between w-[40%] items-center border-solid b-2 p-4"
        >
          <div>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              className="w-[100px] h-[30px]"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.class_id}
              label="Age"
              name="class_id"
              onChange={handleChange}
            >
              <MenuItem value={201}>computer science-1</MenuItem>
              <MenuItem value={203}>computer science-3</MenuItem>
              <MenuItem value={204}>computer science-5</MenuItem>
              <MenuItem value={205}>computer science-7</MenuItem>
            </Select>
          </div>
          <div>
            <InputLabel id="demo-simple-select-label">sem</InputLabel>
            <Select
              className="w-[100px] h-[30px]"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.sem}
              label="Age"
              name="sem"
              onChange={handleChange}
            >
              <MenuItem value={1}>First</MenuItem>
              <MenuItem value={2}>Second</MenuItem>
              <MenuItem value={3}>Third</MenuItem>
              <MenuItem value={4}>Fourth</MenuItem>
              <MenuItem value={5}>Fifth</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
            </Select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 h-[30px] text-white font-bold py-1 px-3 rounded-full"
          >
            search
          </button>
        </form>
        <div className="flex flex-col p-2">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                        Day
                      </td>
                      <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                        10:00 to 11:30
                      </td>
                      <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                        11:30 to 1:00
                      </td>
                      <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                        1:00 to 2:00
                      </td>
                      <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                        2:00 to 2:30
                      </td>
                      <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                        2:30 to 4:00
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                        <tr className="bg-gray-100 border-b hover:cursor-pointer">
                          <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">Monday</td>
                          {schedule['Monday'].length>1 && schedule['Monday'].map((ele,idx)=>{
                            return(
                             <td key={idx} className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                              {ele.subject}
                           </td>
                            )
                          })}
                        </tr>
                        <tr className="bg-gray-100 border-b hover:cursor-pointer">
                          <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">Tuesday</td>
                          {schedule['Tuesday'].length>1 && schedule['Tuesday'].map((ele,idx)=>{
                            return(
                             <td key={idx} className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                              {ele.subject}
                           </td>
                            )
                          })}
                        </tr>
                        <tr className="bg-gray-100 border-b hover:cursor-pointer">
                          <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">Wednesday</td>
                          {schedule['Wednesday'].length>1 && schedule['Wednesday'].map((ele,idx)=>{
                            return(
                             <td key={idx} className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                              {ele.subject}
                           </td>
                            )
                          })}
                        </tr>
                        <tr className="bg-gray-100 border-b hover:cursor-pointer">
                          <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">Thursday</td>
                          {schedule['Thursday'].length>1 && schedule['Thursday'].map((ele,idx)=>{
                            return(
                             <td key={idx} className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                              {ele.subject}
                           </td>
                            )
                          })}
                        </tr>
                        <tr className="bg-gray-100 border-b hover:cursor-pointer">
                          <td className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">Friday</td>
                          {schedule['Friday'].length>1 && schedule['Friday'].map((ele,idx)=>{
                            return(
                             <td key={idx} className="text-sm  text-gray-900 font-bold px-6 py-4px-6 py-4 whitespace-nowrap">
                              {ele.subject}
                           </td>
                            )
                          })}
                        </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </m.div>
      <ToastContainer/>
    </Layout>
  );
}
