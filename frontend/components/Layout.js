import style from "../styles/Home.module.css";
import Topnavbar from "./topnavbar"
import Navbar from "./Navbar"
import React from "react";


export default function Layout(props){

    return (
    <div className={style.container}>
      <Topnavbar/>
      <div className={style.wrapper}>
           <Navbar/>
           {props.children}
      </div>
    </div>
    )
}