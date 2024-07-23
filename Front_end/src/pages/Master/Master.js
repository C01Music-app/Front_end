import { Outlet } from "react-router-dom";
import { Topbar } from "../../layout/Topbar/Topbar";
import { Footer } from "../../layout/Footer/Footer";
import { Sidebar } from "../../layout/Sidebar/Sidebar";
import AudioPlayer from "../../components/audioPlayer/AudioPlayer";

export function Master({ change, loginStatus }) {
  return (
    <div id="wrapper">
      <Sidebar />
      <div
        id="content-wrapper"
        className="d-flex flex-column"
        style={{ background: "#170F23" }}
      >
        <div id="content" style={{ background: "#170F23" }}>
          <Topbar changeModal={change} loginStatus={loginStatus} />
          <Outlet />
        </div>
        <AudioPlayer />
        <Footer />
      </div>
    </div>
  );
}
