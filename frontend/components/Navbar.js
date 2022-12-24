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

export default function Navbar() {
  return (
    <div className="w-[20%] bg-[#e2e8f0]">
      <ul className={style.menu}>
        <li className={style.link}>
          <BsBook className="mr-3" />
          <Link datadropdowntoggle ="dropdown" href="/welcome">SUBJECT</Link>
        </li>
        <li className={style.link}>
          <AiFillHome className="mr-3" />
          <Link href="/welcome">Home</Link>{" "}
          <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
        </li>
        <li className={style.link}>
          <BsBook className="mr-3" />
          <Link href="/subject">SUBJECT</Link>
          <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
        </li>
        <li className={style.link}>
          <BsBank className="mr-3" />
          <Link href="/className">CLASS</Link>{" "}
          <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
        </li>
        <li className={style.link}>
          <BsFillCalendarCheckFill className="mr-3" />
          <Link href="/timetable">SET TIMETABLE</Link>{" "}
          <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
        </li>
        <li className={style.link}>
          <BsFillPersonPlusFill className="mr-3" />
          <Link href="/view">VIEW DETAILS</Link>{" "}
          <BsFillCaretLeftFill className="absolute right-0 text-[#1e293b]" />
        </li>
      </ul>
    </div>
  );
}
