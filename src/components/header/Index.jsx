import { Outlet } from "react-router-dom";
import Header from "./Header";
function Index() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Index;
