import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import style from "../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import  axios  from "../node_modules/axios";

export default function display() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    "email":"",
    "type":""
  });

  const router = useRouter();

  useEffect(() => {
    handleClickOpen();
  }, []);


async function handleSubmit(e){
 e.preventDefault();
 try{
    const res = await axios.post('http://localhost:3030/register/user/now',form,{
        'Content-Type':"application/json"
    });
    console.log(res);
    router.push("/welcome");
 }
 catch(err){
     toast.error(err.response.data.err.sqlMessage);
 }
}



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/welcome");
  };

  function handleInput(e) {
    e.preventDefault();
    form[e.target.name] = e.target.value;
    setForm(prev => {
        return {
            ...prev,
            ...form
        }
    });
  }

  return (
    <Layout>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1 className="text-black font-extrabold font-2xl block mt-5">
            ADD USER
          </h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <form className="mt-5 flex flex-col justify-around items-center h-[200px] border-solid border-2 p-4">
            <input
              type="email"
              name="email"
              className="mr-3 border-outlined"
              placeholder={`Enter Email`}
              onChange={handleInput}
              autoComplete= "off"
              required
            />
            <select name="type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleInput}>
              <option value="admin">admin</option>
              <option value="teacher">teacher</option>
            </select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} autoFocus>
            ADD
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Layout>
  );
}
