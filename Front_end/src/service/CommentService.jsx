import axios from "axios";

export const getAllCommentSongId = async (id) => {
  const res = await axios.get(`http://localhost:8080/songs/${id}/comments`);
  return res.data;
};

export const createComment = async (id, comment) => {
  const res = await axios.post(
    `http://localhost:8080/songs/${id}/create/comments`,
    comment
  );
  return res.data;
};

export const removeComment = async (id, commentId) => {
  const res = await axios.delete(
    `http://localhost:8080/songs/${id}/delete/comments/${commentId}`
  );
  return res.data;
};

export const updateComment = async (comments) => {
  const res = await axios.put(
    `http://localhost:8080/comment/${comments.id}`,
    comments
  );
  return res.data;
};
export const findByIdComment = async (id) => {
  const res = await axios.get(`http://localhost:8080/comment/${id}`);
  return res.data;
};
