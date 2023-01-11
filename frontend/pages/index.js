import style from "../styles/welcome.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Home() {
  const { user, error, isLoading } = useUser();

  function render() {
  
    if (isLoading) {
      return (
        <Box className="h-[100vh] w-[100vw] flex justify-center items-center" sx={{ display: "flex"}}>
          <CircularProgress color="success" />
        </Box>
      );
    }

    if (error) {
      toast.error(error);
      return;
    }

    return (
      <div className={style.body}>
        <div id={style.stars}></div>
        <div id={style.stars2}></div>
        <div id={style.stars3}></div>

        <div id={style.parallax}>
          <div className={style.layer} datadepth="0.6">
            <div className={style.somespace}>
              <h1 className={style.h1}>WELCOME To DBMS MINI PROJECT</h1>
            </div>
          </div>
          <div className={style.layer} datadepth="0.4">
            <div id={style.particlesjs}></div>
          </div>
          <div className={style.layer} datadepth="0.3">
            <div className={style.somemorespace1}>
              {user ? (
                <a className={style.a} href="/welcome">
                  welcome
                </a>
              ) : (
                <a className={style.a} href="/api/auth/login">
                  click me
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {render()}
      <ToastContainer />
    </>
  );
}
