import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { findByID, removeSongs } from "../../../service/SongsService";
import { toast } from "react-toastify";

const DeleteSongs = ({ showDelete, closeModal, id }) => {
  const [song, setSongs] = useState();

  const getSong = async () => {
    try {
      const res = await findByID(id);
      setSongs(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    removeSongs(song.id).then((res) => {
      toast.success("xóa thành công");
      closeModal();
    });
  };

  useEffect(() => {
    getSong();
  }, [showDelete, id]);

  return (
    <Modal show={showDelete} onHide={closeModal}>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title>Xóa Bài Hát</Modal.Title>
      </Modal.Header>
      <Modal.Body className="khanh">
        Bạn có chắc chắn muốn xóa bài hát này?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Xóa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSongs;
