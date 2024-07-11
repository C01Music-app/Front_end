import React, { useEffect } from "react";
import "./SongList.css";
// import { SongsService } from "../../../service";
import { toast } from "react-toastify";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";

export const CreateSongs = ({ show, closeModal }) => {
  const handleCreateSongs = async (value) => {
    try {
      const res = await CreateSongs(value);
      toast.success("thêm mới thành công");
    } catch (error) {
      toast.success("thêm mới that bai");
    }
  };

  return (
    <div>
      <Modal show={show}>
        <ModalHeader className="custom-modal-header">CreateSongs</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              closeModal();
            }}
            className="btn btn-closeeee"
          >
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
