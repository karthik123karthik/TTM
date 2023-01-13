import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import style from "../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { motion as m } from "framer-motion";

export default function display() {
  const [data, setData] = useState([]);
  const [head, setHead] = useState([]);
  const [form, setForm] = useState({
    lecturer_id: 1,
    day: "",
  });

  async function handledata(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3030/newtimetable/${form.lecturer_id}/${form.day}`
      );
      const result = await response.json();
      if (result.length == 0) {
        toast.success(`You Have No classes On ${form.day}`);
        return;
      }
      setHead(Object.keys(result[0]));
      console.log(result);
      setData(result);
    } catch (err) {
      console.log(err);
      toast.error(err);
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
      <m.div
        initial={{ opacity: 0, scale: 0.7}}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={style.poster}
      >
        <h1 className="p-3 text-xl font-extrabold border-b-solid border-b-2">
          VIEW YOUR SCHEDULE
        </h1>
        <form
          onSubmit={handledata}
          className="mt-5 border-2 flex justify-between w-[40%] items-center border-solid b-2 p-4"
        >
          <div>
            <InputLabel id="demo-simple-select-label">Lecturer ID</InputLabel>
            <Select
              className="w-[100px] h-[30px]"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.lecturer_id}
              label="Age"
              name="lecturer_id"
              onChange={handleChange}
            >
              <MenuItem value={1}>Lecturer ID-1</MenuItem>
              <MenuItem value={2}>Lecturer ID-2</MenuItem>
              <MenuItem value={3}>Lecturer ID-3</MenuItem>
              <MenuItem value={4}>Lecturer ID-4</MenuItem>
              <MenuItem value={5}>Lecturer ID-5</MenuItem>
              <MenuItem value={6}>Lecturer ID-6</MenuItem>
            </Select>
          </div>
          <div>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
              className="w-[100px] h-[30px]"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.day}
              label="Age"
              name="day"
              onChange={handleChange}
            >
              <MenuItem value={"Monday"}>Monday</MenuItem>
              <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
              <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
              <MenuItem value={"Thursday"}>Thursday</MenuItem>
              <MenuItem value={"Friday"}>Friday</MenuItem>
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
                      {head.map((ele, idx) => {
                        return (
                          <th
                            key={idx}
                            scope="col"
                            className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left"
                          >
                            {ele.toUpperCase()}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((ele, idx) => {
                        return (
                          <tr
                            key={idx}
                            className="bg-gray-100 border-b hover:cursor-pointer"
                          >
                            {head.map((name, index) => {
                              return (
                                <td
                                  key={index}
                                  className="text-sm text-gray-900 font-light px-6 py-4px-6 py-4 whitespace-nowrap"
                                >
                                  {ele[name]}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </m.div>
      <ToastContainer />
    </Layout>
  );
}
