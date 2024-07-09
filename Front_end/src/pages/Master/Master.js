import { Outlet } from "react-router-dom";
import { Topbar } from "../../layout/Topbar/Topbar";
import { Footer } from "../../layout/Footer/Footer";
import { Sidebar } from "../../layout/Sidebar/Sidebar";
import { AllList } from "../../components/List/AllList";

function Master() {
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Topbar />
            <Outlet />
            {/* <AllList /> */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Master;
