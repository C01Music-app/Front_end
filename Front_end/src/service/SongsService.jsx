import axios from "axios";

export const showSongs = async (page, name) => {
  const res = await axios.get(
    `http://localhost:8080/songs?page=${page}&name=${name}`
  );
  console.log("kk");
  console.log(res.data);
  return res.data;
};

export const detailSongs = async (Songs) => {
  const res = await axios.get(
    `http://localhost:8080/songs/detail/${Songs.id}`,
    Songs
  );
  return res.data;
};

export const findByID = async (id) => {
  const res = await axios.get(`http://localhost:8080/songs/detail/${id}`);
  return res.data;
};

export const songSearch = async (searchValue) => {
  try {
    const res = await axios.get(`http://localhost:8080/songs/search`, {
      params: { name: searchValue },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};