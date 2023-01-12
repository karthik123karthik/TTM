import {  FcAssistant} from "react-icons/fc";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Topnavbar(){
    const { user, error, isLoading } = useUser();
    return (
    <div className="w-[100%] flex flex-row items-center h-[30px] bg-[#e2e8f0]">
        <div className="w-[90%] flex flex-row items-center h-[30px] bg-[#e2e8f0]">
            <FcAssistant className="font-bold m-2 h-[25px]"/>
            <h1 className="font-extrabold">{user && (user.email)}</h1>
        </div>
            <a  className="text-m font-bold bg-white p-1 rounded hover:text-white hover:bg-black" href="/api/auth/logout">log out</a>
    </div>
    )
}