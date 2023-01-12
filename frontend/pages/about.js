import Layout from "../components/Layout";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function about() {
  return (
    <Layout>
      <div className="flex w-[100%] bg-black text-white flex-col hover:bg-white hover:text-black items-center h-[550px] justify-around">
        <h1 className="text-xl border-b-2 p-3 border-solid font-extrabold p-3">OUR TEAM</h1>
       
          <div className="text-xl font-extrabold w-[50%] border-green-200 bg-black text-white hover:bg-white hover:text-black rounded border-2 p-3">
            <h2>Karthik G K</h2>
            <h3>20GACSE031</h3>
            <h3>5th SEM,COMPUTER SCIENCE AND ENGINEERING</h3>
          </div>
          <div className="text-xl font-extrabold w-[50%] border-green-200 bg-black text-white hover:bg-white hover:text-black rounded border-2 p-3">
            <h2>KP HEMRAJ</h2>
            <h3>20GACSE030</h3>
            <h3>5th SEM,COMPUTER SCIENCE AND ENGINEERING</h3>
          </div>
      </div>
    </Layout>
  );
}
