import {  FcAssistant} from "react-icons/fc";

export default function Topnavbar(){
    return (
        <div className="w-[100%] flex flex-row items-center h-[30px] bg-[#e2e8f0]">
            <FcAssistant className="font-bold m-2 h-[25px]"/>
            <h1 className="font-bold">Admin</h1>
        </div>
    )
}