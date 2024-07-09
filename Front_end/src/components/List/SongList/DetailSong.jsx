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
      <Figure>
        <div>
          <Figure.Image
            width={190}
            height={200}
            alt="171x180"
            src="https://th.bing.com/th/id/R.78ae726a1bc19dc056b3bb5d3439f298?rik=Au1PZhb1kRIDOQ&pid=ImgRaw&r=0"
          />
          <Figure.Caption>
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </Figure.Caption>
        </div>
      </Figure>
      <div className="media-body">
        <h5 className="mt-0">Don't</h5>
        <p className="mb-1">
          <a href="/nghe-si/Lee-Chae-Yeon" className="text-secondary">
            LEE CHAE YEON
          </a>
        </p>
        <p className="text-muted">
          <small>Hôm qua</small>
        </p>
      </div>
      <div className="media-right">
        <button className="btn btn-outline-primary btn-sm">
          <i className="icon ic-like"></i> Like
        </button>
        <button className="btn btn-outline-secondary btn-sm">
          <i className="icon ic-more"></i> More
        </button>
        <span className="duration">02:51</span>
      </div>
    </div>
  );
};
