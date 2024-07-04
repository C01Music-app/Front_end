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