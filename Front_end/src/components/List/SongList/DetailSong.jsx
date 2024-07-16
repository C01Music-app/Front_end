import React, { useEffect, useState } from "react";
import Figure from "react-bootstrap/Figure";

import * as SongsService from "../../../service/SongsService";
export const DetailSong = () => {
  const [songs, setSongs] = useState([]);

  const getSongs = async (id) => {
    try {
      console.log(`current id: ${id}`);
      const res = await SongsService.findByID(id);
      setSongs(res);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDetail = async (value, id) => {
    const res = await SongsService.detailSongs(value, id);
  };
  //   useEffect(() => {

  //     console.log(`staff: ${songs}`);
  //     console.log(id);
  //   },[id, staff]);
  if (!songs) {
    return <div>loanding...</div>;
  }
  return (
    <div>
      <div className="d-flex align-items-center">
        <Figure className="mr-3">
          <Figure.Image
            width={200}
            height={200}
            alt="171x180"
            src="https://th.bing.com/th/id/R.78ae726a1bc19dc056b3bb5d3439f298?rik=Au1PZhb1kRIDOQ&pid=ImgRaw&r=0"
          />
          <Figure.Caption>
            <h4 className="white-text">ok</h4>
            Nulla vitae elit libero.Nulla vitae elit libero.
          </Figure.Caption>
        </Figure>
        <div className="media-body ">
          <h5 className="mt-0">Don't</h5>
          <p className="mb-1">
            <a href="/" className="text-secondary">
              LEE CHAE YEON
            </a>
          </p>
          <p className="text-muted">
            <small>Hôm qua</small>
          </p>
        </div>

        <div className="media-right ">
          <audio controls>
            <source src="horse.ogg" type="audio/ogg" />
            <source src="horse.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <span className="duration white-text ">02:51</span>
          <button className="btn btn-outline-primary btn-sm mr-2">
            <i className="icon ic-like"></i> Like
          </button>
          <button className="btn btn-outline-secondary btn-sm mr-2">
            <i className="icon ic-more"></i> More
          </button>
        </div>
      </div>
    </div>
  );
};
