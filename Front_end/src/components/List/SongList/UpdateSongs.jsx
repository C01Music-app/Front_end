import { Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebaseConfig";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { findByID, updateSongs } from "../../../service/SongsService";
import { artistsService } from "../../../service/ArtistsService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UpdateSongs = ({ closeModal, id, showUpdate }) => {
  const [songs, setSongs] = useState();
  const [artists, setArtists] = useState([]);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [songUrl, setSongUrl] = useState(undefined);
  const navigate = useNavigate();

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

  const getSong = async () => {
    try {
      const res = await findByID(id);
      setSongs(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSongs = async (value) => {
    try {
      const newV = { ...value, artist: [JSON.parse(value.artist)] };
      await updateSongs(newV, id);
      toast.success("Cập nhật thành công");
      navigate(`/songs/detail/${id}`);
      closeModal();
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  useEffect(() => {
    getSong();
  }, [showUpdate, id]);

  const getAllArtists = async () => {
    const response = await artistsService();
    setArtists(response);
  };

  useEffect(() => {
    getAllArtists();
  }, []);

  return (
    <div>
      <Modal show={showUpdate}>
        <ModalHeader className="khanh">Cập nhật bài hát</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={songs}
            enableReinitialize={true}
            onSubmit={(values) => {
              handleUpdateSongs(values);
            }}
          >
            <Form>
              <div className="card khanh">
                <div className="row align-items-center no-gutters">
                  <div className="col-md-5">
                    {/* <img
                      name="imgSongs"
                      src={
                        songs.imgSongs == null
                          ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                          : songs.imgSongs
                      }
                      className="img-fluid"
                      alt=""
                    /> */}
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

                      {/* <div className="form-group mb-2">
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
                      </div> */}
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
                        <button
                          type="button"
                          className="btn btn-default"
                          onClick={closeModal}
                        >
                          Quay lại
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Cập nhật bài hát
                        </button>
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
