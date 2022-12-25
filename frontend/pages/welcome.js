import dynamic from "next/dynamic";
import style from "../styles/Home.module.css";
import Image from "next/image";
import Layout from "../components/Layout";

function welcome() {
  return (
    <Layout>
          <div className={style.poster}>
              <h1 className="text-3xl underline font-bold">TIME TABLE MANAGEMENT SYSTEM</h1>
              <Image src="/Timetable.png" width={400} height={400} alt="it is a image"/>
          </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(welcome), { ssr: false });
