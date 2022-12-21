import Topnavbar from "../components/topnavbar";
import dynamic from "next/dynamic";
import style from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Image from "next/image";

function welcome() {
  return (
    <div className={style.container}>
      <Topnavbar/>
      <div className={style.wrapper}>
           <Navbar/>
          <div className={style.poster}>
              <h1 className="text-3xl underline font-bold">TIME TABLE MANAGEMENT SYSTEM</h1>
              <Image src="/Timetable.png" width={400} height={400}/>
          </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(welcome), { ssr: false });
