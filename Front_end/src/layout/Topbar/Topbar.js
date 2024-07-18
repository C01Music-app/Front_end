import { useEffect, useState } from "react";
import "./Topbar.css";
import { artistsSearch } from "../../service/ArtistsService";
import { playListSearch } from "../../service/PlayListService";
import { albumSearch } from "../../service/AlbumService";
import { songSearch } from "../../service/SongsService";
import { Link } from "react-router-dom";
import SettingsButton from "../SettingsButton/SettingsButton";
import "./../SettingsButton/SettingsButton.css";

export function Topbar({ children, changeModal, loginStatus }) {
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const name = localStorage.getItem("userName");

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(!reload);
  }, [loginStatus]);

  const filteredSearch = async (searchValue) => {
    try {
      const [artistsRes, songsRes, albumsRes] = await Promise.all([
        artistsSearch(searchValue),
        albumSearch(searchValue),
        songSearch(searchValue),
      ]);

      console.log("Artists Response:", artistsRes);
      console.log("Songs Response:", songsRes);
      console.log("Albums Response:", albumsRes);

      const combinedResults = [
        ...(artistsRes || []).map((res) => ({ ...res, type: "Artist" })),
        ...(songsRes || []).map((res) => ({ ...res, type: "Song" })),
        ...(albumsRes || []).map((res) => ({ ...res, type: "Album" }))
      ];
      setFilteredResults(combinedResults);
    } catch (e) {
      console.log(e);
      setFilteredResults([]);
    }
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue) {
      filteredSearch(searchValue);
    } else {
      setFilteredResults([]);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand navbar-light topbar mb-4 static-top shadow topbar" >
        <Link to="/">
          {" "}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars"></i>
          </button>{" "}
        </Link>
        <div className="search-bar-container">
          <form className="search-form">
            <div className="search-input-group">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                aria-label="Search"
                value={search}
                onChange={handleChange}
              />
            </div>
          </form>
          {filteredResults.length > 0 && (
            <div className="results-list">
              {filteredResults.map((result, index) => (
                <div key={index}>
                  <Link to={"/"}>
                    {result.title || result.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <ul className="navbar-nav ml-auto">
          <SettingsButton />
          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
            <div
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {name && (
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {name}
                </span>
              )}
              <img
                className="img-profile rounded-circle"
                src="img/images.png"
                alt="profile"
                onClick={() => {
                  changeModal();
                }}
              />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
