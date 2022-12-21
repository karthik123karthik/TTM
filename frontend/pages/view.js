import React, { useEffect, useState } from "react";
import Topnavbar from "../components/topnavbar";
import style from "../styles/Home.module.css";
import Navbar from "../components/Navbar";

export default function view() {
  const [data, setData] = useState();

  useEffect(() => {
    const run = async () => {
      await handledata();
    };
    run();
  }, []);

  async function handledata() {
    try {
      const response = await fetch("http://localhost:3030/");
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={style.container}>
      <Topnavbar />
      <div className={style.wrapper}>
        <Navbar />
        <div className={style.poster}>
          {data && (
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-white border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 "
                          >
                            LECTURER_ID
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            NAME
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            ADDRESS
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            PHONE
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((ele, idx) => {
                          return (
                            <tr key={idx} className="bg-gray-100 border-b">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {ele.Lecturer_id}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {ele.Lecturer_name}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {ele.Address}
                              </td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {ele.Phonenumber}
                              </td>
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
        </div>
      </div>
    </div>
  );
}
