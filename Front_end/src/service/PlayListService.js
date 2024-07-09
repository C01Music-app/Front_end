import axios from "axios";
import {URL_API} from "../config/backend.config";

export const playListSearch = async (searchValue) => {
    try {
        const res = await axios.get(`${URL_API}/playlists/search`, {
            params: { name: searchValue }
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
