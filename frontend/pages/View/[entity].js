import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import style from "../../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "../../node_modules/axios";
import { BsFillArchiveFill } from "react-icons/bs";
import { motion as m } from "framer-motion";

export default function display() {
  const router = useRouter();
  const { entity } = router.query;
  console.log(entity);
  const [data, setData] = useState();
  const [tempdata, setTempData] = useState();
  const [heading, setHeading] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [curr, setCurr] = useState({});

  const handleClickOpen = (entity) => {
    setCurr(entity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const run = async () => {
      await handledata();
    };
    if (entity) {
      run();
    }
  }, [router]);

  async function handledata() {
    try {
      const response = await fetch(`http://localhost:3030/${entity}`);
      const result = await response.json();
      setData(result);
      const head = Object.keys(result[0]);
      head.push("delete");
      setHeading(head);
      console.log(head);
      setTempData(result);
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleInput(e) {
    e.preventDefault();
    setInput(e.target.value);
  }

  function search(e) {
    e.preventDefault();
    const requiredData = data.filter((ent) => ent[heading[0]] == input);
    if (requiredData.length > 0) setTempData([...requiredData]);
    else {
      toast.error(`${entity} not found`);
      return;
    }
  }

  async function handledelete() {
    try {
      const resp = await axios.delete(
        `http://localhost:3030/${entity}/${curr[heading[0]]}`
      );
      setOpen(false);
      await handledata();
      toast("success deleted the entry");
    } catch (err) {
      toast.error(err);
    }
    return;
  }

  return (
    <Layout>
      <m.div
        initial={{ opacity: 0, scale: 0.7}}
        animate={{ opacity: 1, scale: 1}}
        transition={{ duration: 0.5 }}
        className={style.poster}
      >
        <h1 className="text-black font-bold font-2xl block mt-5">
          {entity && entity.toUpperCase()} Details{" "}
        </h1>
        <div className="mt-5 p-4">
          <input
            type="text"
            className="mr-3"
            placeholder={`Enter ${entity} id`}
            onChange={handleInput}
            required
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full"
            onClick={search}
          >
            search
          </button>
        </div>
        {tempdata && heading && (
          <div className="flex flex-col p-2">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        {heading.map((ele, idx) => {
                          return (
                            <th
                              key={idx}
                              scope="col"
                              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                              {ele.toUpperCase()}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tempdata.map((ele, idx) => {
                        return (
                          <tr
                            key={idx}
                            onClick={() => handleClickOpen(ele)}
                            className="bg-gray-100 border-b hover:cursor-pointer"
                          >
                            {heading.map((name, index) => {
                              return (
                                <td
                                  key={index}
                                  className="text-sm text-gray-900 font-light px-6 py-4px-6 py-4 whitespace-nowrap"
                                >
                                  {name === "delete" ? (
                                    <BsFillArchiveFill
                                      onClick={() => handleClickOpen(ele)}
                                    />
                                  ) : (
                                    ele[name]
                                  )}
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
        )}
      </m.div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do You Want to Delete ${curr[heading[1]]}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            "Press Yes to proceed"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handledelete} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Layout>
  );
}
