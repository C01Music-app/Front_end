import axios from "axios";

export const showAlbum = async (page, name) => {
  const res = await axios.get(
    `http://localhost:8080/album?page=${page}&name=${name}`
  );
  // console.log("kk");
  // console.log(res.data);
  return res.data;
};

export const albumSearch = async (searchValue) => {
  const res = await axios.get(`http://localhost:8080/songs/search`, {
    params: { name: searchValue },
  });
  return res.data;
};
