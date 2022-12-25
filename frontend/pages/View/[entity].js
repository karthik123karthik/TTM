import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import style from "../../styles/Home.module.css";

/*
 <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          PHONE
                        </th>
*/

/*
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
*/

export default function display() {
  const router = useRouter();
  const { entity } = router.query;
  const [data, setData] = useState();
  const [heading, setHeading] = useState([]);

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
      setHeading(Object.keys(result[0]));
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <Layout>
      <div className={style.poster}>
        <h1 className="text-black font-bold font-2xl block mt-5">
          {entity && entity.toUpperCase()} Details{" "}
        </h1>
        {data && heading && (
          <div className="flex flex-col p-2">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        {heading.map((ele,idx) => {
                          return (
                            <th key={idx}
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
                      {data.map((ele, idx) => {
                        return (
                          <tr key={idx} className="bg-gray-100 border-b">
                             {heading.map((name,index)=>{
                                 return (
                                  <td key={index} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {ele[name]}
                                </td>
                                 )
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
      </div>
    </Layout>
  );
}
