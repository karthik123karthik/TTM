import Link from "next/link";
import style from "../styles/navbar.module.css";
import { AiFillHome } from "react-icons/ai";
import {
  BsFillCalendarCheckFill,
  BsFillPersonPlusFill,
  BsBook,
  BsBank,
  BsFillCaretLeftFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const [type, setType] = useState();

  useEffect(() => {
    async function run() {
      const resp = await fetch(`http://localhost:3030/user/${user.email}`);
      const data = await resp.json();
      if(data.length == 0){
        setType("student");
        return;
      }
      setType(data[0].type);
    }
    if (user && !type) run();
  }, [user]);

  function render() {
    if (isLoading) {
      return (
        <Box
          className="h-[100vh] w-[100vw] flex justify-center items-center"
          sx={{ display: "flex" }}
        >
          <CircularProgress color="success" />
        </Box>
      );
    } else {
      if (type && type === "admin") {
        return (
          <div className="min-w-[20%] bg-[#e2e8f0]">
            <ul className={style.menu}>
              <li className={style.link}>
                <AiFillHome className="mr-3" />
                <Link href="/welcome">HOME</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsFillCalendarCheckFill className="mr-3" />
                <Link href="/timetable">TIME TABLE</Link>
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsFillCalendarCheckFill className="mr-3" />
                <Link href="/teachertimetable">TEACHER TIME TABLE</Link>
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsBook className="mr-3" />
                <Link href="/register">REGISTER</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsFillPersonPlusFill className="mr-3" />
                <Link href="/view">VIEW DETAILS</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsFillPersonPlusFill className="mr-3" />
                <Link href="/adduser">ADD USER</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsFillPersonPlusFill className="mr-3" />
                <Link href="/about">ABOUT US</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
            </ul>
          </div>
        );
      }

      if (type && type === "teacher") {
        return (
          <div className="min-w-[20%] bg-[#e2e8f0]">
            <ul className={style.menu}>
              <li className={style.link}>
                <AiFillHome className="mr-3" />
                <Link href="/welcome">HOME</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsBook className="mr-3" />
                <Link href="/teachertimetable">TIME TABLE</Link>
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsFillPersonPlusFill className="mr-3" />
                <Link href="/about">ABOUT US</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
            </ul>
          </div>
        );
      }

      if(type && type === "student"){
        return(
          <div className="min-w-[20%] bg-[#e2e8f0]">
            <ul className={style.menu}>
              <li className={style.link}>
                <AiFillHome className="mr-3" />
                <Link href="/welcome">HOME</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsBook className="mr-3" />
                <Link href="/timetable">TIME TABLE</Link>
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
              <li className={style.link}>
                <BsFillPersonPlusFill className="mr-3" />
                <Link href="/about">ABOUT US</Link>{" "}
                <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
              </li>
            </ul>
          </div>
        )
      }

    }
  }

  return <>{render()}</>;
}
