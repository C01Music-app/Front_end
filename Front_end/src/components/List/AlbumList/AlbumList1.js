import React, { useEffect, useState } from "react";
import "./AlbumList.css";
import { showAlbum } from "../../../service/AlbumService";
// import { Link } from "react-router-dom";

const playlists = [
  // {
  //     id: 1,
  //     title: "Nhạc Nhẹ Nghe Là Ghiền",
  //     description: "Những ca khúc V-Pop nghe một lần là mê",
  //     image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/5/e/2/c/5e2cbd9b93d41fcf8a35a074715d4a12.jpg",
  //     link: "/album/Nhac-Nhe-Nghe-La-Ghien-Dieu-Kien-Phat-Ho-TLong-Tue-Ny-NB3-Hoai-Bao/6BD0OU9A.html"
  // },
  // {
  //     id: 2,
  //     title: "V-Pop Gây Bão",
  //     description: "Những ca khúc V-Pop đã \"gây bão\" ngay khi vừa ra...",
  //     image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/9/4/5/c9459724773dd87cf98cb0a4086de9be.jpg",
  //     link: "/album/V-Pop-Gay-Bao-Quang-Dang-Tran-Ho-Quang-Hieu-Du-Thien-Khang-Viet/6ZU6CD88.html"
  // },
  // {
  //     id: 3,
  //     title: "Nhạc Trẻ Kết Hợp",
  //     description: "Những màn kết hợp chấn động V-Pop",
  //     image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/3/d/5/4/3d54424475a5cc699007dac8f46ddd86.jpg",
  //     link: "/album/Nhac-Tre-Ket-Hop-Chau-Khai-Phong-Truc-Anh-Babe-Thanh-Dat-Kevin-Toan/6I0DCFZ8.html"
  // },
  // {
  //     id: 4,
  //     title: "Nhạc Hoa Lời Việt Gây Nghiện",
  //     description: "Nhạc Hoa lời Việt đang được chia sẻ nhiều nhất",
  //     image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/3/7/2/c/372c0b483173709fe995c9d9d4a78f60.jpg",
  //     link: "/album/Nhac-Hoa-Loi-Viet-Gay-Nghien-Duong-Edward-Pham-Lich-DICKSON-Dee-Tran/Z867Z8FC.html"
  // },
  // {
  //     id: 5,
  //     title: "Cover Việt Gây Bão",
  //     description: "Những bản cover gây bão ngay từ khi ra mắt",
  //     image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/1/5/2/6/1526e5ac52ce9f0c22721a536192deb9.jpg",
  //     link: "/album/Cover-Viet-Gay-Bao-Ngan-Ngan-Oanh-Ta-Kieu-Chi-Quang-Dang-Tran/SBD67CAC.html"
  // }
];

const AlbumList1 = () => {
  const [Album, setAlbum] = useState([]);

  const getAll = () => {
    showAlbum("", "").then((res) => {
      setAlbum(res.content);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  if (!Album) {
    <div>loading...</div>;
  }
  return (
    <div className="app">
      <h3 className="zm-section-title title is-2" >Album Hot Gây Bão</h3>
      {/* <Link to="/son">vi du</Link> */}
      <div className="zm-carousel-wrapper">
        <div className="zm-carousel">
          <div className="zm-carousel__container">
            {Album.map((album, index) => (
              <div className="zm-carousel-item" key={album.id}>
                <div className="playlist-wrapper is-description">
                  <div className="zm-card">
                    <a href="/" title={album.title}>
                      <div className="zm-card-image">
                        <figure className="image is-48x48">
                          <img src={album.impAlbum} alt={album.title} />
                        </figure>
                      </div>
                    </a>
                    <div className="zm-card-content">
                      <h3 className=" subtitle">{album.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumList1;
