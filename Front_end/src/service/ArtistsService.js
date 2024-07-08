import axios from "axios";
import {URL_API} from "../config/backend.config";

export const artistsService = async () => {
    try {
        const res = await axios.get(URL_API + '/artists');
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const getByIdArtistsService = async (id) => {
    try {
        const res = await axios.get(URL_API + '/artists/' + id);
        return res.data;
    }catch(err) {
        console.log(err);
    }
}
export const artistsSearch = async (searchValue) => {
    try {
        const res = await axios.get(`${URL_API}/artists/search`, {
            params: { name: searchValue }
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
