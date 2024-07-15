import { Outlet } from "react-router-dom";
import { Topbar } from "../../layout/Topbar/Topbar";
import { Footer } from "../../layout/Footer/Footer";
import { Sidebar } from "../../layout/Sidebar/Sidebar";

export function Master({ change, loginStatus }) {
    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar changeModal={change} loginStatus={loginStatus} />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
}
