import axios from "axios";

export const showSongs = async (page, name) => {
  const res = await axios.get(
    `http://localhost:8080/songs?page=${page}&name=${name}`
  );
  console.log("kk");
  console.log(res.data);
  return res.data;
};

export const descSongs = async () => {
  const res = await axios.get(`http://localhost:8080/songs`);
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
export const createSongs = async (Songs) => {
  console.log("kkklllK");
  console.log(Songs);
  const res = await axios.post(`http://localhost:8080/songs/create`, Songs);
  console.log(res.data, "lp");

  return res.data;
};

export const removeSongs = async (id) => {
  const res = await axios.delete(`http://localhost:8080/songs/remove/${id}`);
  return res.data;
};

export const updateSongs = async (Songs) => {
  console.log(Songs);
  const res = await axios.put(
    `http://localhost:8080/songs/update/${Songs.id}`,
    Songs
  );
  console.log(res);

  return res.data;
};

