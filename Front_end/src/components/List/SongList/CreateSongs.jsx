import React, { useEffect, useState } from "react";
import "./SongList.css";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Button } from "reactstrap";
import { artistsService } from "../../../service/ArtistsService";
import { Field, Formik, Form } from "formik";
import { db, storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as SongsService from "../../../service/SongsService";

export const CreateSongs = ({ show, closeModal, makeReload }) => {
  const [imageUrl, setImageUrl] = useState(undefined);
  const [songUrl, setSongUrl] = useState(undefined);
  const [songs, setSongs] = useState({});
  const [artists, setArtists] = useState([]);

  const uploadFileImg = (image) => {
    if (image === null) return;
    const imageRef = ref(storage, `IMG/${image.name}`);

    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        setSongs((prevSongs) => ({
          ...prevSongs,
          img_url: url,
        }));
        localStorage.setItem("imgSongs", url);
      });
    });
  };

  const uploadFileSong = (music) => {
    if (music === null) return;

    const urlRef = ref(storage, `Music/${music.name}`);
    console.log(urlRef);

    uploadBytes(urlRef, music).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setSongUrl(url);
        setSongs((prevSongs) => ({
          ...prevSongs,
          song_url: url,
        }));
        localStorage.setItem("lyrics", url);
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

  const handleCreateSongs = async (value) => {
    try {
      if (value && typeof value === "object") {
        const imgSongs = localStorage.getItem("imgSongs");
        const lyrics = localStorage.getItem("lyrics");

        const parsedArtist = value.artist ? JSON.parse(value.artist) : null;

        const values = {
          ...value,
          artist: parsedArtist ? [parsedArtist] : [],
          imgSongs,
          lyrics,
        };
        console.log(values, "khanh");

        const res = await SongsService.createSongs(values);

        closeModal();
        toast.success("Thêm mới thành công");
      } else {
        throw new Error("Values object is undefined, null, or not an object");
      }
    } catch (error) {
      console.error("Error creating songs:", error);
      toast.error("Thêm mới thất bại");
    }
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
              title: "",
              description: "",
              imgSongs: "",
              lyrics: "",
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
                          Ca sĩ
                        </label>
                        <Field
                          className="form-control form-control-sm"
                          placeholder="Chọn ca sĩ"
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
