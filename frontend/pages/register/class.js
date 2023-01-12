import style from "../../styles/Home.module.css";
import { useState } from "react";
import axios from "../../node_modules/axios";
import Layout from "../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function register() {
  const [form, setForm] = useState({
    Classroom_id: -1,
    Floor_no: -1,
    capacity: -1,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:3030/register/classroom",
        form
      );
      if (resp) {
        e.target.reset();
      }
      toast("successfully added");
    } catch (err) {
      toast.error(err.response.data.err.sqlMessage);
    }
  }

  function handleChange(e) {
    e.preventDefault();
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
      <div className={style.poster}>
        <h1 className="text-2xl font-bold p-3 border-b-2">Add Class Room</h1>
        <form className="p-10" onSubmit={handleSubmit}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="Classroom_id"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              htmlFor="id"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Class Room NO
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="Floor_no"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              htmlFor="id"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Floor No
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="capacity"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              htmlFor="id"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Capacity
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
}
