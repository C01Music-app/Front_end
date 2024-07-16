import React, { useEffect, useState } from "react";
import "./SongList.css";
import { toast } from "react-toastify";
import { Col, Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { artistsService } from "../../../service/ArtistsService";
import { Field, Formik, Form } from "formik";
import { db, storage } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createSongs } from "../../../service/SongsService";
import { Await } from "react-router-dom";
import * as SongsService from "../../../service/SongsService";

// import { useDispatch } from "react-redux";

export const CreateSongs = ({ show, closeModal, makeReload }) => {
  // const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(undefined);
  const [songUrl, setSongUrl] = useState(undefined);
  const [songs, setSongs] = useState({});
  const [artists, setArtists] = useState([]);

  // const uploadFileImg = (image) => {
  //   if (image === null) return;
  //   const imageRef = ref(storage, `IMG/${image.name}`);
  //   console.log(imageRef);
  //   uploadBytes(imageRef, image).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrl(url);
  //       console.log(setImageUrl(url));
  //       console.log("image uploaded successfully", url);
  //       console.log("image uploaded successfully", imageUrl);
  //       songs.img_url = url;
  //       localStorage.setItem("imgSongs", url);
  //     });
  //   });
  // };
  const uploadFileImg = (image) => {
    if (image === null) return;
    const imageRef = ref(storage, `IMG/${image.name}`);

    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url); // Cập nhật state với đường dẫn ảnh mới
        console.log("image uploaded successfully", url);

        // Cập nhật songs.img_url trong state songs
        setSongs((prevSongs) => ({
          ...prevSongs,
          img_url: url,
        }));

        // Lưu đường dẫn ảnh vào localStorage
        localStorage.setItem("imgSongs", url);
      });
    });
  };
  // const uploadFileSong = (music) => {
  //   if (music === null) return;
  //   const urlRef = ref(storage, `Music/${music.name}`);
  //   console.log(urlRef, "vi");
  //   uploadBytes(urlRef, music).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setSongUrl(url);
  //       console.log("song uploaded successfully", url);
  //       console.log("song uploaded successfully", songUrl);
  //       songs.song_url = url;
  //       localStorage.setItem("lyrics", url);
  //     });
  //   });
  // };
  const uploadFileSong = (music) => {
    if (music === null) return;

    const urlRef = ref(storage, `Music/${music.name}`);
    console.log(urlRef);

    uploadBytes(urlRef, music).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setSongUrl(url); // Cập nhật state với đường dẫn bài hát mới
        console.log("song uploaded successfully", url);

        // Cập nhật songs.song_url trong state songs
        setSongs((prevSongs) => ({
          ...prevSongs,
          song_url: url,
        }));

        // Lưu đường dẫn bài hát vào localStorage
        localStorage.setItem("lyrics", url);

        // Đoạn này in ra giá trị songUrl sẽ hiển thị giá trị mới
        console.log("song uploaded successfully", url);
      });
    });
  };

  const getAllArtists = async () => {
    const response = await artistsService();
    setArtists(response);
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  // const handleCreateSongs = async (values) => {
  //   console.log("ok");
  //   console.log(values);
  //   try {
  //     values.imgSongs = localStorage.getItem("imgSongs");
  //     values.lyrics = localStorage.getItem("lyrics");
  //     SongsService.createSongs(values).then((res) => {
  //       closeModal();
  //       toast.success("thêm mới thành công");
  //     });
  //   } catch (error) {
  //     toast.error("thất bại");
  //   }
  // };
  const handleCreateSongs = async (value) => {
    const values = { ...value, artist: [JSON.parse(value.artist)] };

    try {
      // Kiểm tra values có tồn tại và không phải là null
      if (values && typeof values === "object") {
        const imgSongs = localStorage.getItem("imgSongs");
        const lyrics = localStorage.getItem("lyrics");

        // Gán giá trị vào `values`
        values.imgSongs = imgSongs;
        values.lyrics = lyrics;
        console.log(values, "khanh");

        // Gọi API để tạo bài hát và đợi cho đến khi hoàn thành
        const res = await SongsService.createSongs(values);

        // Đóng modal và hiển thị thông báo thành công
        closeModal();
        toast.success("Thêm mới thành công");
      } else {
        throw new Error("Values object is undefined, null, or not an object");
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error creating songs:", error);
      toast.error("Thêm mới thất bại");
    }
  };

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    <div>
      <Modal show={show}>
        <ModalHeader className="custom-modal-header">
          Tạo mới bài hát
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              // id: "",
              // like: "",
              title: "",
              // artist: "",
              description: "",
              imgSongs: "",
              // time: "",
              // dateStart: "",
              lyrics: "",
              // listens: "",
              // playlists: "",
              // lableSong: "",
            }}
            onSubmit={handleCreateSongs}
          >
            <Form>
              <div className="card vi-w100 khanh">
                <div className="row align-items-center no-gutters">
                  <div className="col-md-5">
                    <img
                      name="imgSongs"
                      src={
                        songs.imgSongs == null
                          ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                          : songs.imgSongs
                      }
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body">
                      <div className="form-group mb-2">
                        <label className="form-label" htmlFor="title">
                          Tên bài hát (<span className="text-danger">*</span>)
                        </label>
                        <Field
                          name="title"
                          type="text"
                          id="title"
                          placeholder="Nhập tên bài hát"
                          className="form-control"
                        />
                      </div>

                      <div className="form-group mb-2">
                        <label className="form-label" htmlFor="description">
                          Mô tả
                        </label>
                        <Field
                          name="description"
                          component="textarea"
                          id="description"
                          placeholder="Nhập mô tả"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="form-label" htmlFor="artist">
                          ca sĩ
                        </label>
                        <Field
                          className="form-control form-control-sm"
                          placeholder="Chọn thể loại"
                          as="select"
                          name="artist"
                          id="artist"
                        >
                          {artists.map((i, index) => (
                            <option key={i.id} value={JSON.stringify(i)}>
                              {i.name}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <div className="form-group mb-2">
                        <label className="form-label" htmlFor="imgSongs">
                          Ảnh
                        </label>
                        <input
                          type="file"
                          id="imgSongs"
                          className="form-control"
                          onChange={(event) => {
                            uploadFileImg(event.target.files[0]);
                          }}
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="form-label" htmlFor="lyrics">
                          File nhạc
                        </label>
                        <input
                          type="file"
                          id="lyrics"
                          className="form-control"
                          onChange={(event) => {
                            uploadFileSong(event.target.files[0]);
                          }}
                        />
                      </div>
                      <div className="my-4 text-center">
                        <Button type="submit" color="primary">
                          Tạo bài hát
                        </Button>
                        <Button
                          onClick={closeModal}
                          className="btn btn-closeeee"
                        >
                          Hủy bỏ
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};
